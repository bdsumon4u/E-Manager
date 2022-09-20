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

namespace App\Providers;

use App\Contracts\Repositories\EmailAccountFolderRepository;
use App\Contracts\Repositories\EmailAccountMessageRepository;
use App\Contracts\Repositories\EmailAccountRepository;
use App\Contracts\Repositories\PredefinedMailTemplateRepository;
use App\Innoclapps\Facades\Innoclapps;
use App\Innoclapps\Facades\Menu;
use App\Innoclapps\Facades\Permissions;
use App\Innoclapps\Menu\Item as MenuItem;
use App\Repositories\EmailAccountFolderRepositoryEloquent;
use App\Repositories\EmailAccountMessageRepositoryEloquent;
use App\Repositories\EmailAccountRepositoryEloquent;
use App\Repositories\PredefinedMailTemplateRepositoryEloquent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class InboxServiceProvider extends ServiceProvider
{
    /**
     * All of the container bindings that should be registered.
     *
     * @var array
     */
    public $bindings = [
        EmailAccountRepository::class => EmailAccountRepositoryEloquent::class,
        EmailAccountFolderRepository::class => EmailAccountFolderRepositoryEloquent::class,
        EmailAccountMessageRepository::class => EmailAccountMessageRepositoryEloquent::class,
        // PredefinedMailTemplateRepository::class => PredefinedMailTemplateRepositoryEloquent::class,
    ];

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        // Innoclapps::booting(function () {
        //     Menu::register(
        //         MenuItem::make(__('inbox.inbox'), '/inbox', 'Mail')
        //             ->position(15)
        //             ->badge(fn () => resolve(EmailAccountRepository::class)->countUnreadMessagesForUser(Auth::user()))
        //             ->badgeVariant('info')
        //     );
        // });

        $this->registerPermissions();
    }

    /**
     * Register inbox permissions
     *
     * @return void
     */
    public function registerPermissions(): void
    {
        Permissions::group(['name' => 'inbox', 'as' => __('inbox.shared')], function ($manager) {
            $manager->register('access-inbox', [
                'as' => __('role.capabilities.access'),
                'permissions' => [
                    'access shared inbox' => __('role.capabilities.access'),
                ],
            ]);
        });
    }
}
