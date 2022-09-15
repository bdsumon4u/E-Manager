<?php

namespace App\Hotash\Mail;

use Illuminate\Mail\Mailable as BaseMailable;
use Illuminate\Support\Facades\Mail;

class Mailable extends BaseMailable
{
    /**
     * Send the message using the given mailer.
     *
     * @param  \Illuminate\Contracts\Mail\Factory|\Illuminate\Contracts\Mail\Mailer  $mailer
     * @return \Illuminate\Mail\SentMessage|null
     */
    public function send($mailer)
    {
        // // Check if there is no system email account selected to send
        // // mail from, in this case, use the Laravel default configuration
        // if (! $systemAccountId = settings('system_email_account_id')) {
        //     return parent::send($mailer);
        // }

        // $repository = resolve(EmailAccountRepository::class);
        // $account    = $repository->find($systemAccountId);

        // // We will check if the email account requires authentication, as we
        // // are not able to send emails if the account required authentication, in this case
        // // we will return to the laravel default mailer behavior
        // if (! $account->canSendMails()) {
        //     return parent::send($mailer);
        // }

        parent::send(Mail::mailer('hotash'));
    }
}
