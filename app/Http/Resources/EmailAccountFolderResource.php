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

use Illuminate\Http\Resources\Json\JsonResource;

class EmailAccountFolderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'               => $this->id,
            'parent_id'        => $this->parent_id,
            'email_account_id' => $this->email_account_id,
            'remote_id'        => $this->remote_id,
            'name'             => $this->name,
            'display_name'     => $this->display_name,
            'syncable'         => $this->syncable,
            'selectable'       => $this->selectable,
            'unread_count'     => (int) $this->unread_count ?: 0,
            'type'             => $this->type,
        ];
    }
}
