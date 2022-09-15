<?php

namespace App\Hotash\Mail;

use App\Hotash\Mail\Contracts\SmtpInterface;
use Illuminate\Support\Facades\Storage;

class Client implements SmtpInterface
{
    /**
     * The attachments from a storage disk.
     *
     * @var array
     */
    public array $diskAttachments = [];

    /**
     * Create new Client instance.
     *
     * @param  \App\Hotash\Contracts\Mail\SmtpInterface&\App\Hotash\Mail\AbstractSmtpClient  $smtp
     */
    public function __construct(protected SmtpInterface $smtp)
    {
        //
    }

    /**
     * Set the from header email
     *
     * @param  string  $email
     */
    public function setFromAddress($email)
    {
        $this->smtp->setFromAddress($email);

        return $this;
    }

    /**
     * Get the from header email
     *
     * @return string|null
     */
    public function getFromAddress()
    {
        return $this->smtp->getFromAddress();
    }

    /**
     * Set the from header name
     *
     * @param  string  $name
     */
    public function setFromName($name)
    {
        $this->smtp->setFromName($name);

        return $this;
    }

    /**
     * Get the from header name
     *
     * @return string|null
     */
    public function getFromName()
    {
        return $this->smtp->getFromName();
    }

    /**
     * Set mail message subject
     *
     * @param  string  $subject
     * @return static
     */
    public function subject($subject)
    {
        $this->smtp->subject($subject);

        return $this;
    }

    /**
     * Set mail message HTML body
     *
     * @param  string  $body
     * @return static
     */
    public function htmlBody($body)
    {
        $this->smtp->htmlBody($body);

        return $this;
    }

    /**
     * Set mail message TEXT body
     *
     * @param  string  $body
     * @return static
     */
    public function textBody($body)
    {
        $this->smtp->textBody($body);

        return $this;
    }

    /**
     * Set the recipients
     *
     * @param  mixed  $recipients
     * @return static
     */
    public function to($recipients)
    {
        $this->smtp->to($recipients);

        return $this;
    }

    /**
     * Set the cc address for the mail message.
     *
     * @param  array|string  $address
     * @param  string|null  $name
     * @return static
     */
    public function cc($address, $name = null)
    {
        $this->smtp->cc($address, $name);

        return $this;
    }

    /**
     * Set the bcc address for the mail message.
     *
     * @param  array|string  $address
     * @param  string|null  $name
     * @return static
     */
    public function bcc($address, $name = null)
    {
        $this->smtp->bcc($address, $name);

        return $this;
    }

    /**
     * Set the replyTo address for the mail message.
     *
     * @param  array|string  $address
     * @param  string|null  $name
     * @return static
     */
    public function replyTo($address, $name = null)
    {
        $this->smtp->replyTo($address, $name);

        return $this;
    }

    /**
     * Attach a file to the message.
     *
     * @param  string  $file
     * @param  array  $options
     * @return static
     */
    public function attach($file, array $options = [])
    {
        $this->smtp->attach($file, $options);

        return $this;
    }

    /**
     * Attach in-memory data as an attachment.
     *
     * @param  string  $data
     * @param  string  $name
     * @param  array  $options
     * @return static
     */
    public function attachData($data, $name, array $options = [])
    {
        $this->smtp->attachData($data, $name, $options);

        return $this;
    }

    /**
     * Attach a file to the message from storage.
     *
     * @param  string  $path
     * @param  string|null  $name
     * @param  array  $options
     * @return static
     */
    public function attachFromStorage($path, $name = null, array $options = [])
    {
        return $this->attachFromStorageDisk(null, $path, $name, $options);
    }

    /**
     * Attach a file to the message from storage.
     *
     * @param  string  $disk
     * @param  string  $path
     * @param  string|null  $name
     * @param  array  $options
     * @return static
     */
    public function attachFromStorageDisk($disk, $path, $name = null, array $options = [])
    {
        $this->diskAttachments = collect($this->diskAttachments)->push([
            'disk' => $disk,
            'path' => $path,
            'name' => $name ?? basename($path),
            'options' => $options,
        ])->unique(function ($file) {
            return $file['name'].$file['disk'].$file['path'];
        })->all();

        return $this;
    }

    /**
     * Send mail message
     *
     * @return \App\Hotash\Contracts\Mail\MessageInterface|null
     */
    public function send()
    {
        // Send mail message flag
        $this->buildDiskAttachments();

        return $this->smtp->send();
    }

    /**
     * Reply to a given mail message
     *
     * @param  string  $remoteId
     * @param  null|\App\Hotash\Mail\FolderIdentifier  $folder
     * @return \App\Hotash\Contracts\Mail\MessageInterface|null
     */
    public function reply($remoteId, ?FolderIdentifier $folder = null)
    {
        // Reply to mail message flag
        $this->buildDiskAttachments();

        return $this->smtp->reply($remoteId, $folder);
    }

    /**
     * Forward the given mail message
     *
     * @param  string  $remoteId
     * @param  null|\App\Hotash\Mail\FolderIdentifier  $folder
     * @return \App\Hotash\Contracts\Mail\MessageInterface|null
     */
    public function forward($remoteId, ?FolderIdentifier $folder = null)
    {
        // Forward mail message flag
        $this->buildDiskAttachments();

        return $this->smtp->forward($remoteId, $folder);
    }

    /**
     * Add custom headers to the message
     *
     * @param  string  $name
     * @param  string  $value
     * @return static
     */
    public function addHeader(string $name, string $value)
    {
        $this->smtp->addHeader($name, $value);

        return $this;
    }

    /**
     * Get the SMTP client
     *
     * @return \App\Innoclapp\Contracts\Mail\SmtpInterface
     */
    public function getSmtp()
    {
        return $this->smtp;
    }

    /**
     * Add all of the disk attachments to the smtp client.
     *
     * @return void
     */
    protected function buildDiskAttachments()
    {
        foreach ($this->diskAttachments as $attachment) {
            $storage = Storage::disk($attachment['disk']);

            $this->attachData(
                $storage->get($attachment['path']),
                $attachment['name'] ?? basename($attachment['path']),
                array_merge(['mime' => $storage->mimeType($attachment['path'])], $attachment['options'])
            );
        }
    }
}
