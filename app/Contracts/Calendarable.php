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

namespace App\Contracts;

use Illuminate\Database\Query\Expression;

interface Calendarable
{
    /**
     * Get the start date
     *
     * @return string
     */
    public function getCalendarStartDate() : string;

    /**
     * Get the end date
     *
     * @return string
     */
    public function getCalendarEndDate() : string;

    /**
     * Indicates whether the event is all day
     *
     * @return boolean
     */
    public function isAllDay() : bool;

    /**
     * Get the displayable title for the calendar
     *
     * @return string
     */
    public function getCalendarTitle() : string;

    /**
     * Get the calendar start date column name for query
     *
     * @return string
     */
    public static function getCalendarStartColumnName() : string|Expression;

    /**
     * Get the calendar end date column name for query
     *
     * @return string
     */
    public static function getCalendarEndColumnName() : string|Expression;
}
