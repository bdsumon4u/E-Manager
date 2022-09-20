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

namespace App\Innoclapps\Contracts;

interface Metable
{
    /**
     * Add or update the value of the `Meta` at a given key.
     *
     * @param string $key
     * @param mixed $value
     */
    public function setMeta(string $key, $value) : void;

    /**
     * Check if a `Meta` has been set at a given key.
     *
     * @param string $key
     *
     * @return boolean
     */
    public function hasMeta(string $key) : bool;

    /**
     * Delete the `Meta` at a given key.
     *
     * @param string $key
     *
     * @return void
     */
    public function removeMeta(string $key) : void;

    /**
     * Retrieve the value of the `Meta` at a given key.
     *
     * @param string $key
     * @param mixed $default Fallback value if no Meta is found.
     *
     * @return mixed
     */
    public function getMeta(string $key, $default = null);
}
