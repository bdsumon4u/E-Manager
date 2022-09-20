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

namespace App\Criteria\Team;

use App\Innoclapps\Contracts\Repository\CriteriaInterface;
use App\Innoclapps\Contracts\Repository\RepositoryInterface;

class ResourceUserTeamCriteria implements CriteriaInterface
{
    /**
     * Create new ResourceUserTeamCriteria instance.
     *
     * @param integer $teamId
     */
    public function __construct(protected int $teamId, protected string $userRelationship = 'user')
    {
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
        return $model->whereHas(
            $this->userRelationship . '.teams',
            fn ($query) => $query->where(
                'teams.id',
                $this->teamId,
            )
        );
    }
}
