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

namespace App\Innoclapps\OAuth;

use App\Innoclapps\Models\OAuthAccount;
use App\Innoclapps\Repository\AppRepository;
use App\Innoclapps\Contracts\Repositories\OAuthAccountRepository;

class OAuthAccountRepositoryEloquent extends AppRepository implements OAuthAccountRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public static function model()
    {
        return OAuthAccount::class;
    }

    /**
     * Set that this account requires authentication
     *
     * @param int $id
     * @param boolean $value
     */
    public function setRequiresAuthentication($id, $value = true)
    {
        $this->update(['requires_auth' => $value], $id);
    }
}
