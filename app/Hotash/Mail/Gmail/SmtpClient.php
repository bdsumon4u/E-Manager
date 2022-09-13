<?php
/**
 * Concord CRM - https://www.concordcrm.com
 *
 * @version   1.0.6
 *
 * @link      Releases - https://www.concordcrm.com/releases
 * @link      Terms Of Service - https://www.concordcrm.com/terms
 *
 * @copyright Copyright (c) 2022-2022 KONKORD DIGITAL
 */

namespace App\Hotash\Mail\Gmail;

use App\Hotash\Facades\Google as Client;
use App\Hotash\Mail\AbstractSmtpClient;
use App\Hotash\Mail\Compose\PreparesSymfonyMessage;
use App\Hotash\Mail\FolderIdentifier;
use App\Hotash\Mail\MasksMessages;
use App\Hotash\OAuth\AccessTokenProvider;

class SmtpClient extends AbstractSmtpClient
{
    use MasksMessages,
        PreparesSymfonyMessage;

    /**
     * Create new SmtpClient instance.
     *
     * @param  \App\Hotash\OAuth\AccessTokenProvider  $token
     */
    public function __construct(protected AccessTokenProvider $token)
    {
        Client::connectUsing($token);
    }

    /**
     * Send mail message
     *
     * @return \App\Hotash\Contracts\MailClient\MessageInterface
     */
    public function send()
    {
        $message = $this->prepareSymfonyMessage(
            Client::message()->sendMail(),
            $this->token->getEmail()
        );

        return $this->maskMessage($message->send()->load(), Message::class);
    }

    /**
     * Reply to a given mail message
     *
     * @param  string  $remoteId
     * @param  null|\App\Hotash\Mail\FolderIdentifier  $folder
     * @return \App\Hotash\Contracts\MailClient\MessageInterface
     */
    public function reply($remoteId, ?FolderIdentifier $folder = null)
    {
        /** @var \App\Hotash\Mail\Gmail\Message * */
        $remoteMessage = $this->imap->getMessage($remoteId);

        $message = $this->prepareSymfonyMessage($remoteMessage->reply(), $this->token->getEmail());

        /*
        $quote = $this->createQuoteOfPreviousMessage(
            $remoteMessage,
            $this->createInlineImagesProcessingFunction($message)
        );

        $message->setBody($message->getBody() . $quote, $this->getContentType());
        */

        // When there is no subject set, we will just
        // create a reply subject from the original message
        if (! $this->subject) {
            $message->subject($this->createReplySubject($remoteMessage->getSubject()));
        }

        return $this->maskMessage($message->send()->load(), Message::class);
    }

    /**
     * Forward the given message
     *
     * @param  int  $remoteId
     * @param  null|\App\Hotash\Mail\FolderIdentifier  $folder
     * @return \App\Hotash\Contracts\MailClient\MessageInterface
     */
    public function forward($remoteId, ?FolderIdentifier $folder = null)
    {
        /** @var \App\Hotash\Mail\Gmail\Message * */
        $remoteMessage = $this->imap->getMessage($remoteId);

        $message = $this->prepareSymfonyMessage($remoteMessage->reply(), $this->token->getEmail());

        /*
        $inlineMessage = $this->inlineMessage(
            $remoteMessage,
            $this->createInlineImagesProcessingFunction($message)
        );

        $message->setBody($message->getBody() . $inlineMessage, $this->getContentType());
        */

        // When there is no subject set, we will just
        // create a reply subject from the original message
        if (! $this->subject) {
            $message->subject($this->createForwardSubject($remoteMessage->getSubject()));
        }

        return $this->maskMessage($message->send()->load(), Message::class);
    }
}
