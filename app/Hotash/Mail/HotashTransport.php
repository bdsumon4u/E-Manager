<?php

namespace App\Hotash\Mail;

use App\Hotash\Mail\Exceptions\ConnectionErrorException;
use App\Hotash\Mail\Gmail\SmtpClient;
use App\Hotash\OAuth\AccessTokenProvider;
use App\Models\User;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\SentMessage;
use Symfony\Component\Mailer\Transport\AbstractTransport;

class HotashTransport extends AbstractTransport
{
    public function __toString(): string
    {
        return 'hotash';
    }

    protected function doSend(SentMessage $message): void
    {
        try {
            $user = User::findOrFail(2);
            $client = new Client(new SmtpClient(new AccessTokenProvider($user->google_access_token, $user->email)));
            $client->setFromName(config('app.name'));

            // dd($message, $message->getMessage(), $message->getOriginalMessage());
            $envelope = $message->getEnvelope();
            $original = $message->getOriginalMessage();
            // dd($envelope->getRecipients());

            $addresses = fn ($addresses) => collect($addresses)->map(fn ($address) => ['address' => $address->getAddress(), 'name' => $address->getName()])->toArray();
            try {
                tap($client, function ($mailer) use ($original, $addresses) {
                    $mailer->htmlBody($original->getHtmlBody())
                        ->textBody($original->getTextBody())
                        ->subject($original->getSubject())
                        ->to($addresses($original->getTo()))
                        ->cc($addresses($original->getCc()))
                        ->bcc($addresses($original->getBcc()))
                        ->replyTo($addresses($original->getReplyTo()));
                    // $this->buildAttachmentsViaEmailClient($instance);
                })->send();
            } catch (ConnectionErrorException $e) {
                // Set Requires Authentication
            } catch (TransportExceptionInterface $e) {
                throw $e;
            } catch (\Exception $e) {
                $this->getLogger()->debug(sprintf('Email transport "%s" stopped', __CLASS__));
                throw $e;
            }
        } catch (TransportExceptionInterface $e) {
            throw $e;
        }
    }
}
