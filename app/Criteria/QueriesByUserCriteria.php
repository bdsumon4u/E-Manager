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

namespace App\Criteria;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Contracts\Repositories\UserRepository;
use App\Innoclapps\Contracts\Repository\CriteriaInterface;
use App\Innoclapps\Contracts\Repository\RepositoryInterface;

class QueriesByUserCriteria implements CriteriaInterface
{
    /**
     * The user for the query
     *
     * @var \App\Models\User|int|null
     */
    protected $user;

    /**
     * User id column name
     *
     * @var string
     */
    protected $columnName;

    /**
     * Initialze QueriesByUserCriteria class
     *
     * @param \App\Models\User|int|null $user
     * @param string $columnName
     */
    public function __construct($user = null, $columnName = 'user_id')
    {
        $this->user       = $user;
        $this->columnName = $columnName;
    }

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
        return static::applyQuery($model, $this->user, $this->columnName);
    }

    /**
     * Apply the query for the criteria
     *
     * @param \Illumindata\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Builder $model
     * @param \App\Models\User|int|null $user
     * @param string $columnName
     *
     * @return \Illumindata\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Builder
     */
    public static function applyQuery($model, $user = null, $columnName = 'user_id')
    {
        return $model->where($columnName, static::determineUser($user)->getKey());
    }

    /**
     * Determine the user
     *
     * @param mixed $user
     *
     * @return \App\Models\User
     */
    protected static function determineUser($user)
    {
        if (is_null($user)) {
            $user = Auth::user();
        } elseif ($user instanceof User) {
            $user = $user;
        } else {
            $user = resolve(UserRepository::class)->find($user);
        }

        return $user;
    }
}
