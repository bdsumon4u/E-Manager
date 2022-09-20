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

use App\Innoclapps\Contracts\Presentable;

class UrlPlaceholder extends MailPlaceholder
{
    /**
     * The placeholder tag
     *
     * @var string
     */
    public string $tag = 'url';

    /**
    * Format the placeholder
    *
    * @param string|null $contentType
    *
    * @return string
    */
    public function format(?string $contentType = null)
    {
        return url(
            $this->value instanceof Presentable ? $this->value->path : $this->value
        );
    }

    /**
     * Boot the placeholder and set default values
     *
     * @return void
     */
    public function boot()
    {
        $this->description('URL');
    }
}
