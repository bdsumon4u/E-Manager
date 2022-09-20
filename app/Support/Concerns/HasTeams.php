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

use App\Models\Team;

trait HasTeams
{
    /**
     * Get all of the teams the user belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function teams()
    {
        return $this->belongsToMany(Team::class)
            ->withTimestamps()
            ->as('membership');
    }

    /**
     * Determine if the user belongs to the given team.
     *
     * @param int|\App\Models\Team $team
     *
     * @return bool
     */
    public function belongsToTeam(int|Team $team)
    {
        return $this->teams->contains(
            fn ($t) => $t->id === (is_int($team) ? $team : $team->id)
        );
    }
}
