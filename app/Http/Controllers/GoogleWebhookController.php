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

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contracts\Repositories\SynchronizationRepository;

class GoogleWebhookController extends Controller
{
    /**
     *  Handle the webhook request
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Contracts\Repositories\SynchronizationRepository $repository
     *
     * @return void
     */
    public function handle(Request $request, SynchronizationRepository $repository)
    {
        if ($request->header('x-goog-resource-state') !== 'exists') {
            return;
        }

        $synchronization = $repository->findWhere([
            'id'          => $request->header('x-goog-channel-id'),
            'resource_id' => $request->header('x-goog-resource-id'),
        ])->first();

        abort_unless($synchronization, 404);

        $synchronization->ping();
    }
}
