<?php

namespace App\Hotash\Mail;

trait Smtpable
{
    /**
     * The sender email
     *
     * @var string|null
     */
    protected $fromEmail;

    /**
     * The sender name
     *
     * @var string|null
     */
    protected $fromName;

    /**
     * Set the from header email
     *
     * @param  string  $email
     * @return static
     */
    public function setFromAddress($email)
    {
        $this->fromEmail = $email;

        return $this;
    }

    /**
     * Get the from header email
     *
     * @return string|null
     */
    public function getFromAddress()
    {
        return $this->fromEmail;
    }

    /**
     * Set the from header name
     *
     * @param  string  $name
     * @return static
     */
    public function setFromName($name)
    {
        $this->fromName = $name;

        return $this;
    }

    /**
     * Get the from header name
     *
     * @return string|null
     */
    public function getFromName()
    {
        return $this->fromName;
    }
}
