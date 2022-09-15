<?php

namespace App\Hotash\OAuth;

class AccessTokenProvider
{
    /**
     * Initialize the acess token provider class
     *
     * @param  string  $token
     * @param  string  $email
     */
    public function __construct(protected string $token, protected string $email)
    {
    }

    /**
     * Get the access token
     *
     * @return string
     */
    public function getAccessToken(): string
    {
        return $this->token;
    }

    /**
     * Get the token email adress
     *
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }
}
