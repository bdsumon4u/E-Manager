<?php

use App\Http\Controllers\GoogleWebhookController;
use App\Http\Controllers\MailAccountController;
use App\Http\Controllers\OAuthController;
use App\Http\Controllers\OAuthEmailAccountController;
use App\Http\Controllers\OutlookCalendarWebhookController;
use App\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('splade')->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });

    Route::middleware('auth')->group(function () {
        Route::get('/dashboard', function () {
            return view('dashboard');
        })->name('dashboard');
    });

    require __DIR__.'/auth.php';

    Route::post('/webhook/outlook-calendar', [OutlookCalendarWebhookController::class, 'handle'])
        ->withoutMiddleware(VerifyCsrfToken::class);

    Route::post('/webhook/google', [GoogleWebhookController::class, 'handle'])
        ->withoutMiddleware(VerifyCsrfToken::class);

    Route::group(['middleware' => ['auth']], function () {
        Route::get('/mail/accounts', MailAccountController::class)->name('mail.accounts');
        Route::get('/mail/accounts/create/{type}', [MailAccountController::class, 'create'])->name('mail.accounts.create');
        Route::post('/mail/accounts', [MailAccountController::class, 'store'])->name('mail.accounts.store');
        Route::get('/mail/accounts/{emailAccount}/edit', [MailAccountController::class, 'edit'])->name('mail.accounts.edit');
        Route::post('/mail/accounts/{emailAccount}/edit', [MailAccountController::class, 'update'])->name('mail.accounts.update');
    });
});

Route::group(['middleware' => ['auth']], function () {
    Route::get('/mail/accounts/{type}/{provider}/connect', [OAuthEmailAccountController::class, 'connect']);
    Route::get('/calendar/sync/{provider}/connect', [OAuthCalendarController::class, 'connect']);

    Route::get('/{providerName}/connect', [OAuthController::class, 'connect'])->where('providerName', 'microsoft|google');
    Route::get('/{providerName}/callback', [OAuthController::class, 'callback'])->where('providerName', 'microsoft|google');
});
