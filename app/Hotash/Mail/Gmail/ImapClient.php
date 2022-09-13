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
use App\Hotash\Mail\AbstractImapClient;
use App\Hotash\Mail\Contracts\FolderInterface;
use App\Hotash\Mail\Contracts\MessageInterface;
use App\Hotash\Mail\Exceptions\ConnectionErrorException;
use App\Hotash\Mail\Exceptions\FolderNotFoundException;
use App\Hotash\Mail\Exceptions\MessageNotFoundException;
use App\Hotash\Mail\FolderCollection;
use App\Hotash\Mail\FolderIdentifier;
use App\Hotash\Mail\MasksMessages;
use App\Hotash\OAuth\AccessTokenProvider;
use Google_Service_Exception;

class ImapClient extends AbstractImapClient
{
    use MasksMessages;

    /**
     * The next page messages identifier
     *
     * @var string
     */
    protected $next;

    /**
     * Ignore folders by id
     *
     * @var array
     */
    protected $ignoredFoldersById = [
        'UNREAD',
        'CHAT',
        'STARRED',
        'PERSONAL', // Personal label is not even shown in Gmail
    ];

    /**
     * Create new ImapClient instance.
     *
     * @param  \App\Hotash\OAuth\AccessTokenProvider  $token
     */
    public function __construct(protected AccessTokenProvider $token)
    {
        Client::connectUsing($token);
    }

    /**
     * Get folder by a given id
     *
     * @param  string  $id The folder identifier
     * @return \App\Hotash\Mail\Outlook\Folder
     *
     * @throws \App\Hotash\Mail\Exceptions\FolderNotFoundException
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function getFolder($id)
    {
        try {
            return $this->maskFolder(Client::labels()->get($id));
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() === 404) {
                throw new FolderNotFoundException;
            } elseif ($e->getCode() == 401) {
                throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
            }

            throw $e;
        }
    }

    /**
     * Retrieve the account available folders from remote server
     *
     * @return \App\Hotash\Mail\FolderCollection
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function retrieveFolders()
    {
        try {
            return $this->maskFolders(Client::labels()->list())
                ->createTreeFromDelimiter(Folder::DELIMITER);
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() == 401) {
                throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
            }

            throw $e;
        }
    }

    /**
     * Get message by message identifier
     *
     * @param  string  $id
     * @param  \App\Hotash\Mail\FolderIdentifier  $folder
     * @return \App\Hotash\Mail\Gmail\Message
     *
     * @throws \App\Hotash\Mail\Exceptions\MessageNotFoundException
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function getMessage($id, ?FolderIdentifier $folder = null)
    {
        try {
            return $this->maskMessage(Client::message()->get($id), Message::class);
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
     * Get all account messages
     *
     * @param  int  $limit
     * @return \Illuminate\Support\Collection
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function getMessages($limit = 50)
    {
        try {
            $messages = Client::message()->take($limit)
                ->preload()
                ->includeSpamTrash()
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
     * Move a message to a given folder
     *
     * @todo  TEST THIS METHOD
     *
     * @param  \App\Hotash\Contracts\MailClient\FolderInterface  $folder
     * @return bool
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function moveMessage(MessageInterface $message, FolderInterface $folder)
    {
        try {
            return (bool) $this->getMessage($message->getId())
                ->addLabel($folder->getName());
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() == 401) {
                throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
            }

            throw $e;
        }
    }

    /**
     * Batch move messages to a given folder
     *
     * @param  array  $messages
     * @param  \App\Hotash\Contracts\MailClient\FolderInterface  $from
     * @param  \App\Hotash\Contracts\MailClient\FolderInterface  $to
     * @return bool
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function batchMoveMessages($messages, FolderInterface $to, FolderInterface $from)
    {
        try {
            // Gmail doesn't allow removing the "SENT" or "DRAFT" label, in this case
            // we don't pass any label to remove, only pass to add the label
            // and Gmail will do it's job
            $removeLabels = $from->supportMove() ? [$from->getId()] : [];
            $addLabels = [$to->getId()];

            return Client::message()->batchModify($messages, $removeLabels, $addLabels);
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() == 401) {
                throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
            }

            throw $e;
        }
    }

    /**
     * Permanently batch delete messages
     *
     * @param  array  $messages
     * @return void
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function batchDeleteMessages($messages)
    {
        try {
            return Client::message()->batchDelete($messages);
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() == 401) {
                throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
            }

            throw $e;
        }
    }

    /**
     * Batch mark as read messages
     *
     * @param  array  $messages
     * @param  \App\Hotash\Mail\FolderIdentifier  $folder
     * @return bool
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function batchMarkAsRead($messages, ?FolderIdentifier $folder = null)
    {
        try {
            return Client::message()->batchModify($messages, ['UNREAD']);
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() == 401) {
                throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
            }

            throw $e;
        }
    }

    /**
     * Batch mark as unread messages
     *
     * @param  array  $messages
     * @param  \App\Hotash\Mail\FolderIdentifier  $folder
     * @return bool
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function batchMarkAsUnread($messages, ?FolderIdentifier $folder = null)
    {
        try {
            return Client::message()->batchModify($messages, [], ['UNREAD']);
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() == 401) {
                throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
            }

            throw $e;
        }
    }

    /**
     * Batch get messages
     *
     * @param  array|\Illuminate\Support\Collection  $messages
     * @return \Illuminate\Support\Collection
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function batchGetMessages($messages)
    {
        try {
            $messages = Client::message()
                ->preload()
                ->batchRequest($messages);

            Client::message()->loadAttachments($messages);

            return $this->maskMessages($messages, Message::class);
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() == 401) {
                throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
            }

            throw $e;
        }
    }

    /**
     * Get the latest message from the sent folder
     *
     * @return \App\Hotash\Mail\Gmail\Message|null
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function getLatestSentMessage()
    {
        try {
            $messages = Client::message()->take(1)
                ->in('sent')
                ->preload()
                ->all();

            return $this->maskMessages($messages, Message::class)->first();
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() == 401) {
                throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
            }

            throw $e;
        }
    }

    /**
     * Get mailbox history
     *
     * https://developers.google.com/gmail/api/v1/reference/users/history/list
     *
     * @param  int  $historyId
     * @param  array  $optParams
     * @return \Illuminate\Support\Collection
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     */
    public function getHistory($historyId, $optParams = [])
    {
        try {
            $params = array_merge(['startHistoryId' => intval($historyId)], $optParams);

            return Client::history()->get($params);
        } catch (Google_Service_Exception $e) {
            if ($e->getCode() == 401) {
                throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
            }

            throw $e;
        }
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

    /**
     * Mask folders
     *
     * @param  array  $folders
     * @return \App\Hotash\Mail\FolderCollection
     */
    protected function maskFolders($folders)
    {
        return (new FolderCollection($folders))->map(function ($folder) {
            return $this->maskFolder($folder);
        })->reject(function ($folder) {
            // Email account draft folders are not supported
            return in_array($folder->getId(), $this->ignoredFoldersById) || $folder->isDraft();
        })->values();
    }

    /**
     * Mask folder
     *
     * @param  mixed  $folder
     * @return \App\Hotash\Mail\Gmail\Folder
     */
    protected function maskFolder($folder)
    {
        return new Folder($folder);
    }
}
