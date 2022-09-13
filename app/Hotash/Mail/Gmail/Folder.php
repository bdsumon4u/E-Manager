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
use App\Hotash\Mail\AbstractFolder;
use App\Hotash\Mail\Exceptions\ConnectionErrorException;
use App\Hotash\Mail\Exceptions\MessageNotFoundException;
use App\Hotash\Mail\MasksMessages;
use Google_Service_Exception;

class Folder extends AbstractFolder
{
    use MasksMessages;

    /**
     * Gmail Folder Delimiter
     */
    const DELIMITER = '/';

    /**
     * The next page messages identifier
     *
     * @var string
     */
    protected $next;

    /**
     * Get the folder unique identifier
     *
     * @return string
     */
    public function getId()
    {
        return $this->getEntity()->getId();
    }

    /**
     * Get folder message
     *
     * @param  string  $uid
     * @return \App\Hotash\Mail\Gmail\Message
     *
     * @throws \App\Hotash\Mail\Exceptions\MessageNotFoundException
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function getMessage($uid)
    {
        try {
            $message = Client::message()
                ->withLabels($this->getId())
                ->get($uid);

            return $this->maskMessage($message, Message::class);
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() === 404) {
                throw new MessageNotFoundException($e->getMessage(), $e->getCode(), $e);
            } elseif ($e->getCode() == 401) {
                throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
            }

            throw $e;
        }
    }

    /**
     * Get messages in the folder
     *
     * @param  int  $limit
     * @return \Illuminate\Support\Collection
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function getMessages($limit = 50)
    {
        try {
            $messages = Client::message()
                ->withLabels($this->getId())
                ->preload()
                ->take($limit)
                ->all();

            $masked = $this->maskMessages($messages, Message::class);

            $this->next = $messages->next;

            return $masked;
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() == 401) {
                throw new ConnectionErrorException;
            }

            throw $e;
        }
    }

    /**
     * Get messages starting from specific date and time
     *
     * @param  string  $dateTime
     * @param  int  $limit
     * @return \Illuminate\Support\Collection
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function getMessagesFrom($dateTime, $limit = 50)
    {
        try {
            $messages = Client::message()
                ->withLabels($this->getId())
                ->preload()
                ->after(strtotime($dateTime))
                ->take($limit)
                ->all();

            $masked = $this->maskMessages($messages, Message::class);

            $this->next = $messages->next;

            return $masked;
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() == 401) {
                throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
            }

            throw $e;
        }
    }

    /**
     * Get the folder system name
     *
     * @return string
     */
    public function getName()
    {
        return $this->getEntity()->getName();
    }

    /**
     * Get the folder display name
     *
     * @return string
     */
    public function getDisplayName()
    {
        return last(explode(self::DELIMITER, $this->getName()));
    }

    /**
     * Check whether the folder is selectable
     *
     * @return bool
     */
    public function isSelectable()
    {
        return true;
    }

    /**
     * Check whether a message can be moved to this folder
     *
     * @return bool
     */
    public function supportMove()
    {
        return ! $this->isDraft() && ! $this->isSent();
    }

    /**
     * Fetch the next page of the messages
     *
     * @return null|\Illuminate\Support\Collection
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function nextPage()
    {
        try {
            if ($result = ($this->next)()) {
                $this->next = $result->next;

                return $this->maskMessages($result, Message::class);
            }

            return null;
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() == 401) {
                throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
            }

            throw $e;
        }
    }
}
