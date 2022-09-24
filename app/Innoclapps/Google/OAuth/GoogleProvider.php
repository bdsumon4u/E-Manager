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

namespace App\Innoclapps\Google\OAuth;

use League\OAuth2\Client\Provider\Google;
use League\OAuth2\Client\Token\AccessToken;
use League\OAuth2\Client\Provider\GoogleUser;

class GoogleProvider extends Google
{
    /**
     * Generate a user object from a successful user details request.
     *
     * @param array $response
     * @param \League\OAuth2\Client\Token\AccessToken $token
     *
     * @return \League\OAuth2\Client\Provider\GoogleUser
     */
    protected function createResourceOwner(array $response, AccessToken $token) : GoogleUser
    {
        return new GoogleResourceOwner($response);
    }
}
