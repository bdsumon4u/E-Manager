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

namespace App\Innoclapps;

trait Makeable
{
    /**
     * Create new instance
     *
     * @param  array  $params
     * @return static
     */
    public static function make(...$params): static
    {
        return new static(...$params);
    }
}
