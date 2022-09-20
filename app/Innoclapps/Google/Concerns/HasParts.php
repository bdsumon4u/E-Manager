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

namespace App\Innoclapps\Google\Concerns;

use Illuminate\Support\Collection;

trait HasParts
{
    /**
     * @var \Illuminate\Support\Collection
     */
    protected $allParts;

    /**
     * Find all Parts of a message.
     *
     * Necessary to reset the $allParts variable.
     *
     * @param \Illuminate\Support\Collection $partsContainer
     *
     * @return \Illuminate\Support\Collection
     */
    protected function getAllParts($partsContainer)
    {
        $this->iterateParts($partsContainer);

        return new Collection($this->allParts);
    }

    /**
     * Recursive Method. Iterates through a collection,
     * finding all 'parts'.
     *
     * @param collection $partsContainer
     * @param bool $returnOnFirstFound
     *
     * @return Collection|boolean
     */
    protected function iterateParts($partsContainer, $returnOnFirstFound = false)
    {
        $parts   = [];
        $plucked = $partsContainer->flatten()->filter();

        if ($plucked->count()) {
            $parts = $plucked;
        } else {
            if ($partsContainer->count()) {
                $parts = $partsContainer;
            }
        }

        if ($parts) {
            /** @var \Google_Service_Gmail_MessagePart $part */
            foreach ($parts as $part) {
                if ($part) {
                    if ($returnOnFirstFound) {
                        return true;
                    }

                    $this->allParts[$part->getPartId()] = $part;

                    $this->iterateParts(new Collection($part->getParts()));
                }
            }
        }
    }
}
