<?php

namespace App\Hotash\Google\Services\Message;

use App\Hotash\Mail\InteractsWithSymfonyMessage;
use Google_Client;
use Google_Service_Gmail;
use Google_Service_Gmail_Message;
use Illuminate\Mail\Message;
use Symfony\Component\Mime\Email;

class Compose extends Message
{
    use InteractsWithSymfonyMessage;

    /**
     * @var \Google_Service_Gmail
     */
    protected $service;

    /**
     * Create a new message instance.
     *
     * @param  \Google_Client  $client
     * @return void
     */
    public function __construct(protected Google_Client $client)
    {
        parent::__construct(new Email);
        $this->service = new Google_Service_Gmail($client);
    }

    /**
     * Send the created mail
     *
     * @return \App\Hotash\Google\Services\Messages\Mail
     */
    public function send(): Mail
    {
        $body = $this->getMessageService();

        $body->setRaw($this->createRawMessage());

        $message = $this->sendMessage($body);

        return new Mail($this->client, $message);
    }

    /**
     * Make a send message request
     *
     * @param  \Google_Service_Gmail_Message  $body
     * @return \Google_Service_Gmail_Message
     */
    protected function sendMessage($body)
    {
        return $this->service->users_messages->send('me', $body);
    }

    /**
     * Get the message body for the Gmail request
     *
     * @return \Google_Service_Gmail_Message
     */
    protected function getMessageService()
    {
        return new Google_Service_Gmail_Message();
    }

    /**
     * Create the RAW message which is intended for the Gmail body
     *
     * @return string
     */
    protected function createRawMessage()
    {
        return $this->base64Encode($this->message->toString());
    }

    /**
     * Prepare the Gmail message body
     *
     * @param  string  $data
     * @return string
     */
    protected function base64Encode($data)
    {
        return rtrim(strtr(base64_encode($data), ['+' => '-', '/' => '_']), '=');
    }
}
