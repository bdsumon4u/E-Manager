<?php

namespace App\Hotash\Mail;

use Illuminate\Support\Collection;

trait MasksMessages
{
    /**
     * Mask given messages into a given class
     *
     * @param  array|\Illuminate\Support\Collection  $messages
     * @param  string  $maskIntoClass
     * @return \Illuminate\Support\Collection
     */
    protected function maskMessages($messages, $maskIntoClass)
    {
        if (! $messages) {
            $messages = [];
        }

        if (! $messages instanceof Collection) {
            $messages = collect($messages);
        }

        return $messages->map(function ($message) use ($maskIntoClass) {
            return $this->maskMessage($message, $maskIntoClass);
        });
    }

    /**
     * Mask a given message
     *
     * @param  mixed  $message
     * @param  string  $maskIntoClass
     * @return \App\Innoclapps\Contracts\MailClient\MessageInterface
     */
    protected function maskMessage($message, $maskIntoClass)
    {
        return new $maskIntoClass($message);
    }
}