<?php

namespace App\Hotash\Mail;

use App\Hotash\Mail\Contracts\SupportSaveToSentFolderParameter;
use App\Hotash\Mail\Exceptions\ConnectionErrorException;
use App\Hotash\OAuth\AccessTokenProvider;
use Illuminate\Container\Container;
use Illuminate\Mail\Mailable as Mail;
use Illuminate\Support\Facades\Auth;

class Mailable extends Mail
{
    /**
     * Send the message using the given mailer.
     *
     * @param  \Illuminate\Contracts\Mail\Factory|\Illuminate\Contracts\Mail\Mailer  $mailer
     * @return \Illuminate\Mail\SentMessage|null
     */
    public function send($mailer)
    {
        // Call the build method in case some mailable template is overriding the method
        // to actually build the template e.q. add attachments etc..
        Container::getInstance()->call([$this, 'build']);

        $client = ClientManager::createClient(ConnectionType::Gmail, new AccessTokenProvider(Auth::user()->google_access_token, Auth::user()->email))
        ->setFromName(
            config('app.name')
        );

        // The mailables that are sent via email account are not supposed
        // to be saved in the sent folder to takes up space, however
        // email provider like Gmail does not allow to not save the mail
        // in the sent folder, in this case, we will check if the client
        // support to avoid saving the email in the sent folder
        // otherwise we will set custom header so these emails can be excluded from syncing
        if ($client->getSmtp() instanceof SupportSaveToSentFolderParameter) {
            $client->getSmtp()->saveToSentFolder(false);
        } else {
            $client->addHeader('X-Hotash-Mailable', true);
        }

        try {
            tap($client, function ($instance) {
                $instance->htmlBody($this->buildView())
                    ->textBody($this->buildView())
                    ->subject($this->subject)
                    ->to($this->to)
                    ->cc($this->cc)
                    ->bcc($this->bcc)
                    ->replyTo($this->replyTo);
                // $this->buildAttachmentsViaEmailClient($instance);
            })->send();
        } catch (ConnectionErrorException $e) {
            // Set Requires Authentication
        }
    }
}
