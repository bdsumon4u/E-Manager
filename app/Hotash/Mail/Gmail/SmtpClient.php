<?php

namespace App\Hotash\Mail\Gmail;

use App\Hotash\Google\Client;
use App\Hotash\Google\Services\Message;
use App\Hotash\Mail\AbstractSmtpClient;
use App\Hotash\Mail\Compose\PreparesSymfonyMessage;
use App\Hotash\Mail\MasksMessages;
use App\Hotash\OAuth\AccessTokenProvider;

class SmtpClient extends AbstractSmtpClient
{
    use MasksMessages;
    use PreparesSymfonyMessage;

    protected Client $client;

    /**
     * Create new SmtpClient instance.
     *
     * @param  \App\Hotash\OAuth\AccessTokenProvider  $token
     */
    public function __construct(protected AccessTokenProvider $token)
    {
        $this->client = (new Client)->connectUsing($token);
    }

    /**
     * Send mail message
     *
     * @see \App\Hotash\Google\Services\Message\Compose
     *
     * @return \App\Hotash\Contracts\MailClient\MessageInterface
     */
    public function send()
    {
        $message = $this->prepareSymfonyMessage(
            $this->client->message()->compose(),
            $this->token->getEmail()
        );
        
        return $this->maskMessage($message->send()->load(), Message::class);
    }
}
