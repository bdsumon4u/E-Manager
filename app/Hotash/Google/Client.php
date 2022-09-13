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

namespace App\Hotash\Google;

use App\Hotash\Google\Services\Calendar;
use App\Hotash\Google\Services\History;
use App\Hotash\Google\Services\Labels;
use App\Hotash\Google\Services\Message;
use App\Hotash\OAuth\AccessTokenProvider;
use App\Hotash\OAuth\OAuthManager;
use Google_Client;
use Illuminate\Support\Facades\Auth;

class Client
{
    /**
     * The email address to use to fetch the token
     *
     * @var string
     */
    protected static $email;

    /**
     * @var \Google_Client
     */
    protected $client;

    /**
     * Provide a connector for the access token
     *
     * @param  string|\App\Hotash\OAuth\AccessTokenProvider  $connector
     * @return static
     */
    public function connectUsing(string|AccessTokenProvider $connector): static
    {
        static::$email = is_string($connector) ? $connector : $connector->getEmail();

        // Reset the client so the next time can be retrieved with the new connector
        $this->client = null;

        return $this;
    }

    /**
     * Create new Labels instance.
     *
     * @return \App\Hotash\Google\Services\Labels
     */
    public function labels(): Labels
    {
        return new Labels($this->getClient());
    }

    /**
     * Create new Message instance.
     *
     * @return \App\Hotash\Google\Services\Message
     */
    public function message(): Message
    {
        return new Message($this->getClient());
    }

    /**
     * Create new History instance.
     *
     * @return \App\Hotash\Google\Services\History
     */
    public function history(): History
    {
        return new History($this->getClient());
    }

    /**
     * Create new Calendar instance.
     *
     * @return \App\Hotash\Google\Services\Calendar
     */
    public function calendar(): Calendar
    {
        return new Calendar($this->getClient());
    }

    /**
     * Get the Google_Client instance
     *
     * @return \Google_Client
     */
    public function getClient(): Google_Client
    {
        if ($this->client) {
            return $this->client;
        }

        $client = new Google_Client;

        // Perhaps via revoke?
        if ($email = static::$email) {
            $client->setAccessToken([
                'access_token' => Auth::user()->google_access_token,
                // 'access_token' => (new OAuthManager)->retrieveAccessToken('google', $email),
            ]);
        }

        return $this->client = $client;
    }

    /**
     * Revoke the current token
     *
     * @param  null|string  $accessToken
     *
     * The access token to revoke or the current one that is set via the connectUsing method will be used
     * @return void
     */
    public function revokeToken(?string $accessToken = null): void
    {
        $this->getClient()->revokeToken($accessToken);
    }
}
