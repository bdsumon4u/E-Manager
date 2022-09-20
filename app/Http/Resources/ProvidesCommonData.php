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

namespace App\Http\Resources;

use App\Innoclapps\Facades\Innoclapps;

trait ProvidesCommonData
{
    /**
     * The created follow up task for the resource
     *
     * @var \App\Models\Activity|null
     */
    protected static $createdActivity;

    /**
     * Add common data to the resource
     *
     * @param  array  $data
     * @param  \App\Innoclapps\Resources\Http\ResourceRequest|\Illuminate\Http\Request  $request
     * @return array
     */
    protected function withCommonData($data, $request)
    {
        $data = parent::withCommonData($data, $request);

        static::createdFollowUpTask(null);

        if ($this->shouldMergeAssociations()) {
            $data[] = $this->merge([
                'associations' => $this->prepareAssociationsForResponse(),
            ]);
        }

        return $data;
    }

    /**
     * Set the follow up task which was created to merge in the resource
     *
     * @param  \App\Models\Activity|null  $task
     * @return void
     */
    public static function createdFollowUpTask($task)
    {
        static::$createdActivity = $task;
    }

    /**
     * Get the resource associations
     *
     * @return Collection|array
     */
    protected function prepareAssociationsForResponse()
    {
        if (! $this->shouldMergeAssociations()) {
            return [];
        }

        return collect($this->resource->associatedResources())
            ->map(function ($resourceRecords, $resourceName) {
                return Innoclapps::resourceByName($resourceName)->createJsonResource($resourceRecords);
            });
    }

    /**
     * Check whether a resource has associations and should be merged
     * Associations are merged only if they are previously eager loaded
     *
     * @return bool
     */
    protected function shouldMergeAssociations()
    {
        if (! method_exists($this->resource, 'associatedResources')) {
            return false;
        }

        return $this->resource->associationsLoaded();
    }
}
