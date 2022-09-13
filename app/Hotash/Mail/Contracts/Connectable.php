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

namespace App\Hotash\Mail\Contracts;

use App\Hotash\Mail\Imap\ImapConfig;

interface Connectable
{
    /**
     * Connect to server
     *
     * @return mixed
     */
    public function connect();

    /**
     * Test the connection
     *
     * @return mixed
     */
    public function testConnection();

    /**
     * Get the connection config
     *
     * @return \App\Hotash\Mail\Imap\ImapConfig
     */
    public function getConfig(): ImapConfig;
}
