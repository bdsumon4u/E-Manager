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

interface HandlesChangedMorphManyAttributes
{
    /**
     * Handle the attributes updated event
     *
     * @param array $new
     * @param array $old
     *
     * @return void
     */
    public function morphManyAtributesUpdated($relationName, $new, $old);
}
