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

namespace App\Innoclapps\MailableTemplates\Placeholders;

use JsonSerializable;

class Collection implements JsonSerializable
{
    /**
     * Create new Collection instance
     *
     * @param array $placeholders
     */
    public function __construct(protected array $placeholders)
    {
    }

    /**
     * Forget placeholders from the collection
     *
     * @param string|array $tagName
     *
     * @return static
     */
    public function forget(string|array $tagName)
    {
        $this->placeholders = collect($this->placeholders)
            ->reject(
                fn ($placeholder) => in_array($placeholder->tag, (array) $tagName)
            )->values()->all();

        return $this;
    }

    /**
     * Push placeholders
     *
     * @param \App\Innoclapps\MailableTemplates\Placeholders\MailPlaceholder|array $placeholders
     *
     * @return static
     */
    public function push($placeholders)
    {
        $this->placeholders = array_merge(
            $this->placeholders,
            is_array($placeholders) ? $placeholders : func_get_args()
        );

        return $this;
    }

    /**
     * Parse all the placeholders with their formatted values
     *
     * @param string|null $contentType
     *
     * @return array
     */
    public function parse(?string $contentType = 'html')
    {
        return collect($this->placeholders)->mapWithKeys(
            fn ($placeholder) => [$placeholder->tag => $placeholder->format($contentType)]
        )->all();
    }

    /**
     * jsonSerialize
     *
     * @return array
     */
    public function jsonSerialize() : array
    {
        return $this->placeholders;
    }
}
