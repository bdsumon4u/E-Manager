<?php

namespace App\Hotash\Google\Concerns;

trait HasDecodeableBody
{
    /**
     * @param $content
     * @return string
     */
    public function getDecodedBody($content)
    {
        return str_replace('_', '/', str_replace('-', '+', $content));
    }
}
