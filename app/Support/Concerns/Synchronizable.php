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

namespace App\Support\Concerns;

use App\Models\Synchronization;

trait Synchronizable
{
    /**
     * Boot the Synchronizable trait
     *
     * @return void
     */
    public static function bootSynchronizable()
    {
        // Start a new synchronization once created.
        static::created(function ($synchronizable) {
            $synchronizable->synchronization()->create();
        });

        // Stop and delete associated synchronization.
        static::deleting(function ($synchronizable) {
            $synchronizable->synchronization->delete();
        });
    }

    /**
     * Get the synchronizable synchronizer class
     *
     * @return \App\Contracts\Synchronizable
     */
    abstract public function synchronizer();

    /**
     * Get the model synchronization model
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function synchronization()
    {
        return $this->morphOne(Synchronization::class, 'synchronizable');
    }
}
