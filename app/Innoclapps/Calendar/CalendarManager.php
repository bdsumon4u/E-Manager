<?php
/**
 * Concord CRM - https://www.concordcrm.com
 *
 * @version   1.0.7
 *
 * @link      Releases - https://www.concordcrm.com/releases
 * @link      Terms Of Service - https://www.concordcrm.com/terms
 *
 * @copyright Copyright (c) 2022-2022 KONKORD DIGITAL
 */

namespace App\Innoclapps\Calendar;

use App\Innoclapps\OAuth\AccessTokenProvider;
use App\Innoclapps\Calendar\Google\GoogleCalendar;
use App\Innoclapps\Calendar\Outlook\OutlookCalendar;
use InvalidArgumentException;

class CalendarManager
{
    /**
     * Create calendar client
     *
     * @param string $connectionType Outlook, Google
     * @param \App\Innoclapps\OAuth\AccessTokenProvider $token
     *
     * @return Client
     */
    public static function createClient(string $connectionType, AccessTokenProvider $token)
    {
        $method = 'create' . ucfirst($connectionType) . 'Driver';

        if (! method_exists(new static, $method)) {
            throw new InvalidArgumentException(sprintf(
                'Unable to resolve [%s] driver for [%s].',
                $method,
                static::class
            ));
        }

        return self::$method($token);
    }

    /**
     * Create the Google calendar driver
     *
     * @param \App\Innoclapps\OAuth\AccessTokenProvider $token
     *
     * @return \App\Innoclapps\Calendar\Google\Calendar
     */
    public static function createGoogleDriver(AccessTokenProvider $token) : GoogleCalendar
    {
        return new GoogleCalendar($token);
    }

    /**
     * Create the Outlook calendar driver
     *
     * @param \App\Innoclapps\OAuth\AccessTokenProvider $token
     *
     * @return \App\Innoclapps\Calendar\Outlook\Calendar
     */
    public static function createOutlookDriver(AccessTokenProvider $token) : OutlookCalendar
    {
        return new OutlookCalendar($token);
    }
}
