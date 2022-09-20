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

namespace App\Contracts;

interface Attendeeable
{
    /**
     * Get the person email address
     *
     * @return string|null
     */
    public function getGuestEmail() : ?string;

    /**
     * Get the person displayable name
     *
     * @return string
     */
    public function getGuestDisplayName() : string;

    /**
     * Get the notification that should be sent to the person when is added as guest
     *
     * @return \Illuminate\Mail\Mailable|\Illuminate\Notifications\Notification
     */
    public function getAttendeeNotificationClass();

    /**
     * Indicates whether the attending notification should be send to the guest
     *
     * @param \App\Contracts\Attendeeable $model
     *
     * @return boolean
     */
    public function shouldSendAttendingNotification(Attendeeable $model) : bool;
}
