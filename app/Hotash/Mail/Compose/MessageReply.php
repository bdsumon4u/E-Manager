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

namespace App\Hotash\Mail\Compose;

use App\Hotash\Mail\Client;
use App\Hotash\Mail\FolderIdentifier;

class MessageReply extends AbstractComposer
{
    /**
     * Holds the message ID the reply is intended for
     *
     * @var string|int
     */
    protected string|int $id;

    /**
     * Holds the folder the message belongs to
     *
     * @var \App\Hotash\Mail\FolderIdentifier
     */
    protected FolderIdentifier $folder;

    /**
     * Create new MessageReply instance
     *
     * @param \App\Hotash\Mail\Client $client
     * @param string|int $remoteId
     * @param \App\Hotash\Mail\FolderIdentifier $folder
     * @param \App\Hotash\Mail\FolderIdentifier|null $sentFolder
     */
    public function __construct(Client $client, string|int $remoteId, FolderIdentifier $folder, ?FolderIdentifier $sentFolder = null)
    {
        parent::__construct($client, $sentFolder);

        $this->id     = $remoteId;
        $this->folder = $folder;
    }

    /**
     * Reply to the message
     *
     * @return \App\Hotash\Contracts\MailClient\MessageInterface
     */
    public function send()
    {
        return $this->client->reply($this->id, $this->folder);
    }
}
