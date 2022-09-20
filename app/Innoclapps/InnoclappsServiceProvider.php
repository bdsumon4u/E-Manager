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

namespace App\Innoclapps;

use App\Innoclapps\Contracts\Repositories\OAuthAccountRepository;
use App\Innoclapps\Contracts\Repositories\PermissionRepository;
use App\Innoclapps\Contracts\Repositories\RoleRepository;
use App\Innoclapps\OAuth\OAuthAccountRepositoryEloquent;
use App\Innoclapps\Permissions\PermissionRepositoryEloquent;
use App\Innoclapps\Permissions\RoleRepositoryEloquent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\LazyLoadingViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class InnoclappsServiceProvider extends ServiceProvider
{
    /**
     * All of the container bindings that should be registered.
     *
     * @var array
     */
    public $bindings = [
        PermissionRepository::class => PermissionRepositoryEloquent::class,
        RoleRepository::class => RoleRepositoryEloquent::class,
        OAuthAccountRepository::class => OAuthAccountRepositoryEloquent::class,
    ];

    /**
     * All of the container singletons that should be registered.
     *
     * @var array
     */
    public $singletons = [
        'timezone' => \App\Innoclapps\Timezone::class,
    ];

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerMacros();

        // Avoid lazy loading violation when the calls are coming from the repositories delete, restore and forceDelete
        // methods because these methods are using foreach loops to find and delete/restore/forceDelete multiple models
        // However, this is valid only for development installation
        Model::handleLazyLoadingViolationUsing(function (Model $model, string $relation): void {
            if (! collect(debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS))->first(function ($trace) {
                return in_array($trace['function'], ['delete', 'forceDelete', 'restore']) &&
                isset($trace['class']) && stripos($trace['class'], 'repository') !== false;
            })) {
                throw new LazyLoadingViolationException($model, $relation);
            }
        });
    }

    /**
     * Register application macros
     *
     * @return void
     */
    public function registerMacros()
    {
        // Str::macro('isBase64Encoded', new \App\Innoclapps\Macros\Str\IsBase64Encoded);
        // Str::macro('clickable', new \App\Innoclapps\Macros\Str\ClickableUrls);

        // Arr::macro('toObject', new \App\Innoclapps\Macros\Arr\ToObject);
        // Arr::macro('valuesAsString', new \App\Innoclapps\Macros\Arr\CastValuesAsString);

        // Request::macro('isSearching', new \App\Innoclapps\Macros\Request\IsSearching);
        // Request::macro('isZapier', new \App\Innoclapps\Macros\Request\IsZapier);

        URL::macro('asAppUrl', function ($extra = '') {
            return rtrim(config('app.url'), '/').($extra ? '/'.$extra : '');
        });
    }
}
