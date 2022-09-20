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

namespace App\Innoclapps\Concerns;

use App\Innoclapps\Facades\Innoclapps;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

trait HasCreator
{
    /**
     * Boot HasCreator trait
     *
     * @return void
     */
    protected static function bootHasCreator()
    {
        static::creating(function ($model) {
            $foreignKeyName = (new static)->creator()->getForeignKeyName();

            if (! $model->{$foreignKeyName} && Auth::check()) {
                $model->{$foreignKeyName} = Auth::id();
            }
        });
    }

    /**
     * A resource has creator
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function creator()
    {
        return $this->belongsTo(
            // Innoclapps::getUserRepository()->model(),
            User::class,
            'created_by'
        );
    }
}
