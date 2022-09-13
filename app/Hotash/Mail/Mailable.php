<?php

namespace App\Hotash\Mail;

use App\Hotash\Mail\Contracts\SupportSaveToSentFolderParameter;
use App\Hotash\Mail\Exceptions\ConnectionErrorException;
use App\Hotash\OAuth\AccessTokenProvider;
use Illuminate\Container\Container;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Contracts\View\Factory;
use Illuminate\Mail\Mailable as Mail;
use Illuminate\Mail\Markdown;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;
use InvalidArgumentException;
use ReflectionClass;
use ReflectionProperty;

class Mailable extends Mail
{
    public function __construct(protected Factory $views)
    {
    }

    /**
     * Send the message using the given mailer.
     *
     * @param  \Illuminate\Contracts\Mail\Factory|\Illuminate\Contracts\Mail\Mailer  $mailer
     * @return \Illuminate\Mail\SentMessage|null
     */
    public function send($mailer)
    {
        // // Check if there is no system email account selected to send
        // // mail from, in this case, use the Laravel default configuration
        // if (! $systemAccountId = settings('system_email_account_id')) {
        //     return parent::send($mailer);
        // }

        // $repository = resolve(EmailAccountRepository::class);
        // $account    = $repository->find($systemAccountId);

        // // We will check if the email account requires authentication, as we
        // // are not able to send emails if the account required authentication, in this case
        // // we will return to the laravel default mailer behavior
        // if (! $account->canSendMails()) {
        //     return parent::send($mailer);
        // }

        // Call the build method in case some mailable template is overriding the method
        // to actually build the template e.q. add attachments etc..
        Container::getInstance()->call([$this, 'build']);

        $client = ClientManager::createClient(ConnectionType::Gmail, new AccessTokenProvider(Auth::user()->google_access_token, Auth::user()->email))
        ->setFromName(
            config('app.name')
        );

        // The mailables that are sent via email account are not supposed
        // to be saved in the sent folder to takes up space, however
        // email provider like Gmail does not allow to not save the mail
        // in the sent folder, in this case, we will check if the client
        // support to avoid saving the email in the sent folder
        // otherwise we will set custom header so these emails can be excluded from syncing
        if ($client->getSmtp() instanceof SupportSaveToSentFolderParameter) {
            $client->getSmtp()->saveToSentFolder(false);
        } else {
            $client->addHeader('X-Hotash-Mailable', true);
        }

        try {
            tap($client, function ($instance) {
                $data = $this->buildViewData();
                // First we need to parse the view, which could either be a string or an array
                // containing both an HTML and plain text versions of the view which should
                // be used when sending an e-mail. We will extract both of them out here.
                [$view, $plain, $raw] = $this->parseView($this->buildView());

                $instance->htmlBody($this->renderView($view, $data) ?: ' ')
                    ->textBody($this->renderView($plain, $data) ?: ' ')
                    ->subject($this->subject)
                    ->to($this->to)
                    ->cc($this->cc)
                    ->bcc($this->bcc)
                    ->replyTo($this->replyTo);
                // $this->buildAttachmentsViaEmailClient($instance);
            })->send();
        } catch (ConnectionErrorException $e) {
            // Set Requires Authentication
        }
    }

    /**
     * Parse the given view name or array.
     *
     * @param  string|array  $view
     * @return array
     *
     * @throws \InvalidArgumentException
     */
    protected function parseView($view)
    {
        if (is_string($view)) {
            return [$view, null, null];
        }

        // If the given view is an array with numeric keys, we will just assume that
        // both a "pretty" and "plain" view were provided, so we will return this
        // array as is, since it should contain both views with numerical keys.
        if (is_array($view) && isset($view[0])) {
            return [$view[0], $view[1], null];
        }

        // If this view is an array but doesn't contain numeric keys, we will assume
        // the views are being explicitly specified and will extract them via the
        // named keys instead, allowing the developers to use one or the other.
        if (is_array($view)) {
            return [
                $view['html'] ?? null,
                $view['text'] ?? null,
                $view['raw'] ?? null,
            ];
        }

        throw new InvalidArgumentException('Invalid view.');
    }

    /**
     * Render the given view.
     *
     * @param  string  $view
     * @param  array  $data
     * @return string
     */
    protected function renderView($view, $data)
    {
        return $view instanceof Htmlable
                        ? $view->toHtml()
                        : view($view, $data)->render();
    }

    /**
     * Render the mailable into a view.
     *
     * @return string
     *
     * @throws \ReflectionException
     */
    public function render()
    {
        return $this->withLocale($this->locale, function () {
            Container::getInstance()->call([$this, 'build']);

            return Container::getInstance()->make('mailer')->render(
                $this->buildView(), $this->buildViewData()
            );
        });
    }

    /**
     * Build the view for the message.
     *
     * @return array|string
     *
     * @throws \ReflectionException
     */
    protected function buildView()
    {
        if (isset($this->html)) {
            return array_filter([
                'html' => new HtmlString($this->html),
                'text' => $this->textView ?? null,
            ]);
        }

        if (isset($this->markdown)) {
            return $this->buildMarkdownView();
        }

        if (isset($this->view, $this->textView)) {
            return [$this->view, $this->textView];
        } elseif (isset($this->textView)) {
            return ['text' => $this->textView];
        }

        return $this->view;
    }

    /**
     * Build the Markdown view for the message.
     *
     * @return array
     *
     * @throws \ReflectionException
     */
    protected function buildMarkdownView()
    {
        $markdown = Container::getInstance()->make(Markdown::class);

        if (isset($this->theme)) {
            $markdown->theme($this->theme);
        }

        $data = $this->buildViewData();

        return [
            'html' => $markdown->render($this->markdown, $data),
            'text' => $this->buildMarkdownText($markdown, $data),
        ];
    }

    /**
     * Build the view data for the message.
     *
     * @return array
     *
     * @throws \ReflectionException
     */
    public function buildViewData()
    {
        $data = $this->viewData;

        if (static::$viewDataCallback) {
            $data = array_merge($data, call_user_func(static::$viewDataCallback, $this));
        }

        foreach ((new ReflectionClass($this))->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            if ($property->getDeclaringClass()->getName() !== self::class) {
                $data[$property->getName()] = $property->getValue($this);
            }
        }

        return $data;
    }

    /**
     * Build the text view for a Markdown message.
     *
     * @param  \Illuminate\Mail\Markdown  $markdown
     * @param  array  $data
     * @return string
     */
    protected function buildMarkdownText($markdown, $data)
    {
        return $this->textView
                ?? $markdown->renderText($this->markdown, $data);
    }

    /**
     * Get the mailable human readable name
     *
     * @return string
     */
    public static function name()
    {
        return Str::title(Str::snake(class_basename(get_called_class()), ' '));
    }

    // /**
    //  * Build the view for the message.
    //  *
    //  * @return array
    //  */
    // protected function buildView()
    // {
    //     $renderer = $this->getMailableTemplateRenderer();

    //     return array_filter([
    //         'html' => new HtmlString($renderer->renderHtmlLayout()),
    //         'text' => new HtmlString($renderer->renderTextLayout()),
    //     ]);
    // }

    // /**
    //  * Build the view data for the message.
    //  *
    //  * @return array
    //  */
    // public function buildViewData()
    // {
    //     return $this->placeholders()?->parse() ?: parent::buildViewData();
    // }

    /**
     * Build the subject for the message.
     *
     * @param  \Illuminate\Mail\Message  $message
     * @return static
     */
    protected function buildSubject($message)
    {
        $message->subject(
            $this->getMailableTemplateRenderer()->renderSubject()
        );

        return $this;
    }

    /**
     * Get the mailable template subject
     *
     * @return string|null
     */
    protected function getMailableTemplateSubject()
    {
        if ($this->subject) {
            return $this->subject;
        }

        return $this->getMailableTemplate()->getSubject() ?? $this->name();
    }

    /**
     * Get the mailable template model
     *
     * @return \App\Innoclapps\Models\MailableTemplate
     */
    public function getMailableTemplate()
    {
        if (! $this->templateModel) {
            $this->templateModel = static::templateRepository()->forMailable(
                $this,
                $this->locale ?? 'en'
            );
        }

        return $this->templateModel;
    }

    /**
     * Build the mailable attachemnts via email client
     *
     * @param  \App\Innoclapps\MailClient\Client  $client
     * @return static
     */
    protected function buildAttachmentsViaEmailClient($client)
    {
        foreach ($this->attachments as $attachment) {
            $client->attach($attachment['file'], $attachment['options']);
        }

        foreach ($this->rawAttachments as $attachment) {
            $client->attachData(
                $attachment['data'],
                $attachment['name'],
                $attachment['options']
            );
        }

        $client->diskAttachments = $this->diskAttachments;

        return $this;
    }

    /**
     * Get the mail template repository
     *
     * @return \App\Innoclapps\Contracts\Repositories\MailableRepository
     */
    protected static function templateRepository()
    {
        return resolve(MailableRepository::class);
    }

    /**
     * Prepares alt text message from HTML
     *
     * @param  string  $html
     * @return string
     */
    protected static function prepareTextMessageFromHtml($html)
    {
        return Html2Text::convert($html);
    }

    /**
     * Get the mail template content rendered
     *
     * @return \App\Innoclapps\MailableTemplates\Renderer
     */
    protected function getMailableTemplateRenderer(): Renderer
    {
        return app(Renderer::class, [
            'htmlTemplate' => $this->getMailableTemplate()->getHtmlTemplate(),
            'subject' => $this->getMailableTemplateSubject(),
            'placeholders' => $this->placeholders(),
            'htmlLayout' => $this->getHtmlLayout() ?? config('innoclapps.mailables.layout'),
            'textTemplate' => $this->getMailableTemplate()->getTextTemplate(),
            'textLayout' => $this->getTextLayout(),
        ]);
    }

    /**
     * Get the mailable HTML layout
     *
     * @return null
     */
    public function getHtmlLayout()
    {
        return null;
    }

    /**
     * Get the mailable text layout
     *
     * @return null
     */
    public function getTextLayout()
    {
        return null;
    }

    /**
     * Provide the defined mailable template placeholders
     *
     * @return \App\Innoclapps\MailableTemplates\Placeholders\Collection|null
     */
    public function placeholders()
    {
        //
    }

    /**
     * The Mailable build method
     *
     * @see  buildSubject, buildView, send
     *
     * @return static
     */
    public function build()
    {
        return $this;
    }

    /**
     * Seed the mailable in database as mail template
     *
     * @param  string  $locale Locale to seed the mail template
     * @return \App\Innoclapps\Models\MailableTemplate
     */
    public static function seed($locale = 'en')
    {
        $default = static::default();
        $mailable = get_called_class();
        $textTemplate = $default->textMessage() ?? static::prepareTextMessageFromHtml($default->htmlMessage());

        $template = static::templateRepository()->firstOrNew(
            [
                'locale' => $locale,
                'mailable' => $mailable,
            ],
            [
                'locale' => $locale,
                'mailable' => $mailable,
                'subject' => $default->subject(),
                'html_template' => $default->htmlMessage(),
                'text_template' => $textTemplate,
            ]
        );

        return tap($template, function ($instance) use ($mailable) {
            if (! $instance->getKey()) {
                $instance->mailable = $mailable;
                $instance->name = static::name();

                $instance->save();
            }
        });
    }
}
