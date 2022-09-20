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

namespace App\Innoclapps\Calendar\Google;

use App\Innoclapps\Calendar\AbstractCalendar;
use App\Innoclapps\Contracts\Calendar\Calendar as CalendarInterface;

class Calendar extends AbstractCalendar implements CalendarInterface
{
    /**
     * Get the calendar ID
     *
     * @return string
     */
    public function getId() : string
    {
        return $this->getEntity()->getId();
    }

    /**
     * Get the calendar title
     *
     * @return string
     */
    public function getTitle() : string
    {
        return $this->getEntity()->getSummary();
    }
}
