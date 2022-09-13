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

namespace App\Hotash\Mail\Imap;

use Exception;
use Ddeboer\Imap\Server;
use Illuminate\Support\Str;
use App\Hotash\Mail\FolderCollection;
use App\Hotash\Mail\FolderIdentifier;
use App\Hotash\Mail\AbstractImapClient;
use App\Hotash\Contracts\MailClient\Connectable;
use App\Hotash\Contracts\MailClient\FolderInterface;
use Ddeboer\Imap\Exception\MailboxDoesNotExistException;
use App\Hotash\Contracts\MailClient\MessageInterface;
use App\Hotash\Mail\Exceptions\FolderNotFoundException;
use App\Hotash\Mail\Exceptions\ConnectionErrorException;

class ImapClient extends AbstractImapClient implements Connectable
{
    /**
    * Ignored folders by name
    *
    * @var array
    */
    protected $excludeFolders = [
        'Bulk Mail',
    ];

    /**
     * @var \Ddeboer\Imap\Connection
     */
    protected $connection;

    /**
     * Create new ImapClient instance.
     *
     * @param \App\Hotash\Mail\Imap\Config $config
     */
    public function __construct(protected Config $config)
    {
    }

    /**
     * Get folder by name
     *
     * @throws \App\Hotash\Mail\Exceptions\FolderNotFoundException
     *
     * @param string $name
     *
     * @return \App\Hotash\Mail\Imap\Folder|null
     */
    public function getFolder($name)
    {
        $this->ensureConnected();

        try {
            return $this->maskFolder($this->connection->getMailbox($name));
        } catch (MailboxDoesNotExistException $e) {
            throw new FolderNotFoundException;
        }
    }

    /**
     * Retrieve the account available folders from remote server
     *
     * @param string|null $parentFolder
     *
     * @return \App\Hotash\Mail\FolderCollection
     */
    public function retrieveFolders($parentFolder = null)
    {
        $this->ensureConnected();

        return $this->maskFolders($this->connection->getMailboxes())
            ->createTreeFromDelimiter();
    }

    /**
     * Move a given message to a given folder
     *
     * @param \App\Hotash\Mail\Imap\Message $message
     * @param \App\Hotash\Mail\Imap\Folder $folder
     *
     * @return boolean
     */
    public function moveMessage(MessageInterface $message, FolderInterface $folder)
    {
        $this->ensureConnected();

        $message->getEntity()->move($folder->getEntity());

        $this->connection->expunge();

        return true;
    }

    /**
     * Batch move messages to a given folder
     *
     * @param array $messages
     * @param \App\Hotash\Mail\Imap\Folder $from
     * @param \App\Hotash\Mail\Imap\Folder $to
     *
     * @return array
     */
    public function batchMoveMessages($messages, FolderInterface $to, FolderInterface $from)
    {
        $this->ensureConnected();

        $nextUid = $to->getNextUid();

        $from->getEntity()->move($messages, $to->getEntity());

        $this->connection->expunge();

        $maps = [];

        foreach ($messages as $oldUid) {
            $maps[$oldUid] = $nextUid;
            $nextUid++;
        }

        return $maps;
    }

    /**
    * Permanently batch delete messages
    *
    * @param array $messages
    *
    * @return void
    */
    public function batchDeleteMessages($messages)
    {
        $this->ensureConnected();

        /** @var \App\Hotash\Mail\Imap\Folder **/
        $trashFolder = $this->getTrashFolder();
        $messages    = $trashFolder->getEntity()->getMessageSequence(implode(',', $messages));

        foreach ($messages as $message) {
            $message->delete();
        }

        $this->connection->expunge();
    }

    /**
     * Batch mark as read messages
     *
     * @param array $messages
     * @param \App\Hotash\Mail\FolderIdentifier $folder
     *
     * @return boolean
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     * @throws \App\Hotash\Mail\Exceptions\FolderNotFoundException
     */
    public function batchMarkAsRead($messages, ?FolderIdentifier $folder = null)
    {
        return $this->getFolder($folder->value)->setFlag('\\Seen', $messages);
    }

    /**
     * Batch mark as unread messages
     *
     * @param array $messages
     * @param \App\Hotash\Mail\FolderIdentifier $folder
     *
     * @return boolean
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     * @throws \App\Hotash\Mail\Exceptions\FolderNotFoundException
     */
    public function batchMarkAsUnread($messages, ?FolderIdentifier $folder = null)
    {
        return $this->getFolder($folder->value)->clearFlag('\\Seen', $messages);
    }

    /**
     * Get message by message identifier
     *
     * @throws \App\Hotash\Mail\Exceptions\MessageNotFoundException|\App\Hotash\Mail\Exceptions\FolderNotFoundException
     *
     * @param int $id
     * @param \App\Hotash\Mail\FolderIdentifier $folder
     *
     * @return \App\Hotash\Mail\Imap\Message
     */
    public function getMessage($id, ?FolderIdentifier $folder = null)
    {
        return $this->getFolder($folder->value)->getMessage($id);
    }

    /**
     * Add a just sent message into the sent folder
     *
     * NOTE: Gmail IMAP accounts automatically add the message to sent folder
     *
     * For Gmail, even if we invoke this function, the message won't be added
     * multiple times to the sent folder
     *
     * @param string $messageMIME
     *
     * @return bool
     */
    public function addMessageToSentFolder($messageMIME)
    {
        /** @var \App\Hotash\Mail\Imap\Folder **/
        if ($folder = $this->getSentFolder()) {
            return $folder->addMessage($messageMIME, '\\Seen');
        }
    }

    /**
     * Get the latest message from the sent folder
     *
     * @return \App\Hotash\Mail\Imap\Message|null
     */
    public function getLatestSentMessage()
    {
        /** @var \App\Hotash\Mail\Imap\Folder **/
        if ($folder = $this->getSentFolder()) {
            return $folder->getLatestMessage();
        }
    }

    /**
     * Connect to IMAP
     *
     * @return mixed
     */
    public function connect()
    {
        $server = new Server(
            $this->getConfig()->host(),
            $this->getConfig()->port(),
            $this->getConnectionFlags()
        );

        $username = $this->getConfig()->username() ?? $this->getConfig()->email();

        return $this->connection = $server->authenticate($username, $this->getConfig()->password());
    }

    /**
     * Test the IMAP client connection
     *
     * @return void
     */
    public function testConnection()
    {
        $this->connect();
    }

    /**
     * Get the IMAP configuration
     *
     * @return \App\Hotash\Mail\Imap\Config
     */
    public function getConfig() : Config
    {
        return $this->config;
    }

    /**
     * Ensure that the client is connected
     *
     * @throws \App\Hotash\Mail\Exceptions\ConnectionErrorException
     *
     * @return \Ddeboer\Imap\Connection
     */
    protected function ensureConnected()
    {
        if ($this->connection) {
            return $this->connection;
        }

        try {
            return $this->connect();
        } catch (Exception $e) {
            throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
        }
    }

    /**
     * Get full address of mailbox.
     *
     * @return string
     */
    protected function getConnectionFlags()
    {
        $flags = '/imap';

        if (in_array($this->getConfig()->encryption(), ['tls', 'notls', 'ssl'])) {
            $flags .= '/' . $this->getConfig()->encryption();
        } elseif ($this->getConfig()->encryption() === 'starttls') {
            $flags .= '/tls';
        }

        if (! $this->getConfig()->validateCertificate()) {
            $flags .= '/novalidate-cert';
        } else {
            $flags .= '/validate-cert';
        }

        return $flags;
    }

    /**
     * Mask folders
     *
     * @param array $folders
     *
     * @return \App\Hotash\Mail\FolderCollection
     */
    protected function maskFolders($folders)
    {
        if (! $folders) {
            $folders = [];
        }

        $draft = null;

        return (new FolderCollection($folders))->map(function ($folder) {
            return $this->maskFolder($folder);
        })->reject(function ($folder) use (&$draft) {
            // We will exclude the draft and all sub folders in the draft folder
            // e.q. Drafts and Drafts/Templates
            // the isDraft method will return true only for the main parent folder Draft
            if ($folder->isDraft() ||
            ($draft && Str::startsWith($folder->getName(), $draft->getName()))) {
                $draft = $folder;

                return true;
            }

            return in_array($folder->getName(), $this->excludeFolders);
        })->values();
    }

    /**
     * Mask folder
     *
     * @param mixed $folder
     *
     * @return \App\Hotash\Mail\Imap\Folder
     */
    protected function maskFolder($folder)
    {
        return new Folder($folder);
    }
}
