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

namespace App\Innoclapps\Contracts\Calendar;

interface Calendar
{
    /**
     * Get the calendar ID
     *
     * @return int|string
     */
    public function getId() : int|string;

    /**
     * Get the calendar title
     *
     * @return string
     */
    public function getTitle() : string;
}
