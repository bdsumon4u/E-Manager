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

namespace App\Criteria\Activity;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Criteria\QueriesByUserCriteria;
use App\Innoclapps\Contracts\Repository\CriteriaInterface;
use App\Innoclapps\Contracts\Repository\RepositoryInterface;

class OwnActivitiesCriteria implements CriteriaInterface
{
    /**
     * Apply criteria in query repository
     *
     * @param \Illumindata\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Builder $model
     * @param \App\Innoclapps\Contracts\Repository\RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        return static::applyQuery($model);
    }

    /**
     * Apply the query for the criteria
     *
     * @param \Illumindata\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Builder $model
     *
     * @return \Illumindata\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Builder
     */
    public static function applyQuery($model)
    {
        if (Auth::user()->can('view all activities')) {
            return $model;
        }

        return $model->where(function ($query) {
            return tap(QueriesByUserCriteria::applyQuery($query, Auth::user()), function ($instance) {
                if (Auth::user()->can('view attends and owned activities')) {
                    $instance->orWhereHas('guests', function ($query) {
                        return $query->where('guestable_type', User::class)
                            ->where('guestable_id', Auth::user()->getKey());
                    });
                }
            });
        });
    }
}