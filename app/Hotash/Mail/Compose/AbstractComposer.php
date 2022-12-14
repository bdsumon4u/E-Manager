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

namespace App\Hotash\Mail\Compose;

use App\Hotash\Contracts\Repositories\MediaRepository;
use App\Hotash\Mail\Client;
use App\Hotash\Mail\FolderIdentifier;
use App\Hotash\Resources\MailPlaceholders;
use Illuminate\Support\Str;
use Illuminate\Support\Traits\ForwardsCalls;
use KubAT\PhpSimple\HtmlDomParser;

abstract class AbstractComposer
{
    use ForwardsCalls;

    /**
     * Create new AbstractComposer instance.
     *
     * @param  \App\Hotash\Mail\Client  $client
     * @param  \App\Hotash\Mail\FolderIdentifier|null  $sentFolder
     */
    public function __construct(protected Client $client, ?FolderIdentifier $sentFolder = null)
    {
        if ($sentFolder) {
            $this->setSentFolder($sentFolder);
        }
    }

    /**
     * Send the message
     *
     * @return \App\Hotash\Contracts\MailClient\MessageInterface|null
     */
    abstract public function send();

    /**
     * Set the account sent folder
     *
     * @param  \App\Hotash\Mail\FolderIdentifier  $folder
     * @return static
     */
    public function setSentFolder(FolderIdentifier $identifier)
    {
        $this->client->setSentFolder(
            $this->client->getFolders()->find($identifier)
        );

        return $this;
    }

    /**
     * Convert the media images from the given message to base64
     *
     * @param  string  $message
     * @return string
     */
    protected function convertMediaImagesToBase64($message)
    {
        if (! $message) {
            return $message;
        }

        $repository = resolve(MediaRepository::class);
        $dom = HtmlDomParser::str_get_html($message);

        foreach ($dom->find('img') as $image) {
            if (Str::startsWith($image->src, [
                rtrim(url(config('app.url'), '/')).'/media',
                'media',
                '/media',
            ]) && Str::endsWith($image->src, 'preview')) {
                if (preg_match('/[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}/', $image->src, $matches)) {
                    // Find the inline attachment by token via the media repository
                    $media = $repository->findByToken($matches[0]);
                    $image->src = 'data:'.$media->mime_type.';base64,'.base64_encode($media->contents());
                }
            }
        }

        return $dom->save();
    }

    /**
     * Pass dynamic methods onto the client instance.
     *
     * @param  string  $method
     * @param  array  $parameters
     * @return static
     */
    public function __call($method, $parameters)
    {
        if ($method === 'htmlBody') {
            // First we will clean up spaces from the editor and then
            // we will clean up the placeholders input fields when empty
            $parameters[0] = trim(str_replace(
                ['<p><br /></p>', '<p><br/></p>', '<p><br></p>', '<p>&nbsp;</p>'],
                "\n",
                MailPlaceholders::cleanUpWhenViaInputFields($parameters[0])
            ));

            // Next, we will convert the media images that are inline from the current server
            // to base64 images so the EmbeddedImagesProcessor can embed them inline
            // If we don't embed the images and use the URL directly and the user decide to
            // change his Concord CRM installation domain, the images won't longer works, for this reason
            // we need to embed them inline like any other email client
            $parameters[0] = $this->convertMediaImagesToBase64($parameters[0]);
        }

        $this->forwardCallTo(
            $this->client,
            $method,
            $parameters
        );

        return $this;
    }
}
