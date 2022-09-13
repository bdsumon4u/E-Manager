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

namespace App\Hotash\Mail;

use App\Hotash\Mail\Contracts\Connectable;
use App\Hotash\Mail\Exceptions\ConnectionErrorException;
use App\Hotash\Mail\Gmail\ImapClient as GmailImapClient;
use App\Hotash\Mail\Gmail\SmtpClient as GmailSmtpClient;
use App\Hotash\Mail\Imap\ImapClient;
use App\Hotash\Mail\Imap\ImapConfig;
use App\Hotash\Mail\Imap\SmtpClient;
use App\Hotash\Mail\Imap\SmtpConfig;
use App\Hotash\Mail\Outlook\ImapClient as OutlookImapClient;
use App\Hotash\Mail\Outlook\SmtpClient as OutlookSmtpClient;
use App\Hotash\OAuth\AccessTokenProvider;
use Exception;

class ClientManager
{
    /**
     * Available encryption types
     */
    const ENCRYPTION_TYPES = [
        'ssl', 'tls', 'starttls',
    ];

    /**
     * Create mail client instance
     *
     * @param  \App\Hotash\Mail\ConnectionType  $connectionType
     * @param  \App\Hotash\OAuth\AccessTokenProvider|\App\Hotash\Mail\Imap\Config  $imapConfig
     * @param  \App\Hotash\OAuth\AccessTokenProvider|\App\Hotash\Mail\Imap\SmtpConfig|null  $smtpConfig
     * @return \App\Hotash\Mail\Client
     */
    public static function createClient(
        ConnectionType $connectionType,
        AccessTokenProvider|ImapConfig $imapConfig,
        AccessTokenProvider|SmtpConfig $smtpConfig = null,
    ): Client {
        $part = $connectionType === ConnectionType::Imap ? '' : $connectionType->value;

        return new Client(
            self::{'create'.$part.'ImapClient'}($imapConfig),
            // ?? $imapConfig is if is AccessTokenProvider
            self::{'create'.$part.'SmtpClient'}($smtpConfig ?? $imapConfig)
        );
    }

    /**
     * Create IMAP client instance
     *
     * @param  \App\Hotash\Mail\Imap\Config  $config
     * @return \App\Hotash\Mail\Imap\ImapClient
     */
    public static function createImapClient(ImapConfig $config): ImapClient
    {
        return new ImapClient($config);
    }

    /**
     * Create SMTP client instance
     *
     * @param  \App\Hotash\Mail\Imap\SmtpConfig  $config
     * @return \App\Hotash\Mail\Imap\SmtpClient
     */
    public static function createSmtpClient(SmtpConfig $config): SmtpClient
    {
        return new SmtpClient($config);
    }

    /**
     * Create Outlook IMAP client instance
     *
     * @param  \App\Hotash\OAuth\AccessTokenProvider  $token
     * @return \App\Hotash\Mail\Outlook\ImapClient
     */
    public static function createOutlookImapClient(AccessTokenProvider $token): OutlookImapClient
    {
        return new OutlookImapClient($token);
    }

    /**
     * Create Outlook SMTP client instance
     *
     * @param  \App\Hotash\OAuth\AccessTokenProvider  $token
     * @return \App\Hotash\Mail\Outlook\SmtpClient
     */
    public static function createOutlookSmtpClient(AccessTokenProvider $token): OutlookSmtpClient
    {
        return new OutlookSmtpClient($token);
    }

    /**
     * Create Gmail IMAP client instance
     *
     * @param  \App\Hotash\OAuth\AccessTokenProvider  $token
     * @return \App\Hotash\Mail\Gmail\ImapClient
     */
    public static function createGmailImapClient(AccessTokenProvider $token): GmailImapClient
    {
        return new GmailImapClient($token);
    }

    /**
     * Create Gmail SMTP client instance
     *
     * @param  \App\Hotash\OAuth\AccessTokenProvider  $token
     * @return \App\Hotash\Mail\Gmail\SmtpClient
     */
    public static function createGmailSmtpClient(AccessTokenProvider $token): GmailSmtpClient
    {
        return new GmailSmtpClient($token);
    }

    /**
     * Test server connection
     *
     * @param  \App\Hotash\Contracts\Mail\Connectable  $client
     * @return void
     */
    public static function testConnection(Connectable $client): void
    {
        try {
            $client->testConnection();
        } catch (Exception $e) {
            throw new ConnectionErrorException($e->getMessage(), $e->getCode(), $e);
        }
    }
}
