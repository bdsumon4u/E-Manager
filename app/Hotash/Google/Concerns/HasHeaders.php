<?php
/**
 * Concord CRM - https://www.concordcrm.com
 *
 * @version   1.0.6
 *
 * @link      Releases - https://www.concordcrm.com/releases
 * @link      Terms Of Service - https://www.concordcrm.com/terms
 *
 * @copyright Copyright (c) 2022-2022 KONKORD DIGITAL
 */

namespace App\Hotash\Google\Concerns;

trait HasHeaders
{
    /**
     * @var \App\Hotash\Mail\Headers\HeadersCollection
     */
    protected $headers;

    /**
     * Get all headers for the configured part
     *
     * @return \App\Hotash\Mail\Headers\HeadersCollection
     */
    public function getHeaders()
    {
        return $this->headers;
    }

    /**
     * Get single header value
     *
     * @return \App\Hotash\Mail\Headers\Header|null
     */
    public function getHeader($name)
    {
        return $this->headers->find($name);
    }

    /**
     * Get single header value
     *
     * @return string|null
     */
    public function getHeaderValue($name)
    {
        $header = $this->getHeader($name);

        return $header ? $header->getValue() : null;
    }
}
