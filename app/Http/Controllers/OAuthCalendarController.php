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
use App\Innoclapps\Facades\OAuthState;
use App\Innoclapps\OAuth\OAuthManager;

class OAuthCalendarController extends Controller
{
    /**
     * OAuth connect email account
     *
     * @param string $providerName
     * @param \Illuminate\Http\Request $request
     * @param \App\Innoclapps\OAuth\OAuthManager $manager
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function connect($providerName, Request $request, OAuthManager $manager)
    {
        return redirect($manager->createProvider($providerName)
            ->getAuthorizationUrl(['state' => $this->createState($request, $manager)]));
    }

    /**
     * Create state
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Innoclapps\OAuth\OAuthManager $manager
     *
     * @return string
     */
    protected function createState($request, $manager)
    {
        return OAuthState::putWithParameters([
            'return_url' => '/calendar/sync?viaOAuth=true',
            're_auth'    => $request->re_auth,
            'key'        => $manager->generateRandomState(),
        ]);
    }
}
