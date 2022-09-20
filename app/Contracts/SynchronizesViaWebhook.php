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

use App\Models\Synchronization;

interface SynchronizesViaWebhook
{
    /**
     * Subscribe for changes for the given synchronization
     *
     * @param \App\Models\Synchronization $synchronization
     *
     * @return void
     */
    public function watch(Synchronization $synchronization);

    /**
     * Unsubscribe from changes for the given synchronization
     *
     * @param \App\Models\Synchronization $synchronization
     *
     * @return void
     */
    public function unwatch(Synchronization $synchronization);
}
