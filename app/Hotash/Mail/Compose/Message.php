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

class Message extends AbstractComposer
{
    /**
     * Reply to the message
     *
     * @return \App\Hotash\Contracts\MailClient\MessageInterface
     */
    public function send()
    {
        return $this->client->send();
    }
}
