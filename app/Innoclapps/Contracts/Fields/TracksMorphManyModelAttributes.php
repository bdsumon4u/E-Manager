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

namespace App\Innoclapps\Contracts\Fields;

interface TracksMorphManyModelAttributes
{
    /**
     * Get the attributes the changes should be tracked on
     *
     * @return array|string
     */
    public function trackAttributes() : array|string;
}
