<?php

use App\Mail\BestMail;
use App\Mail\TestMail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

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

Route::get('/', function () {
    return view('welcome');
});
Route::get('/auth/redirect', function () {
    return Socialite::driver('google')
        ->scopes([
            'https://mail.google.com/',
        ])
        ->with([
            'access_type' => 'offline',
            'prompt' => 'consent select_account',
        ])
        ->redirect();
});

Route::get('/auth/callback', function () {
    $user = Socialite::driver('google')->user();

    $user = User::query()->updateOrCreate([
        'email' => $user->email,
    ], [
        'name' => $user->name,
        'password' => bcrypt('password'),
        'google_access_token' => $user->token,
        'google_refresh_token' => $user->refreshToken,
        'google_expires_at' => now()->addSeconds(3599)->toDateTimeString(),
    ]);

    Auth::login($user);

    return redirect('/');
});

Route::get('/send', function () {
    // Mail::to('bradlriordan@gmail.com')->send(new TestMail);
    // Mail::to('bapsojaydo@vusra.com')->send(new TestMail);
    // Mail::to('dtpqefqpixvwxc@emergentvillage.org')->send(new TestMail);
    // Mail::to('s1lxq2ie73@kobrandly.com')->send(new TestMail);
    Mail::to('sirsam@tempverify.com')->send(new TestMail);
    // Mail::to('bradlriordan@gmail.com')->send(new BestMail);
});

Route::get('/test', function () {
    Mail::to('bradlriordan@gmail.com')->send(new TestMail);
    // Mail::to('bapsojaydo@vusra.com')->send(new TestMail);
    // Mail::to('dtpqefqpixvwxc@emergentvillage.org')->send(new TestMail);
    // Mail::to('s1lxq2ie73@kobrandly.com')->send(new TestMail);
    // Mail::to('sirsam@tempverify.com')->send(new TestMail);
    // Mail::to('bradlriordan@gmail.com')->send(new BestMail);
});

Route::get('/best', function () {
    // Mail::to('bradlriordan@gmail.com')->send(new TestMail);
    // Mail::to('bapsojaydo@vusra.com')->send(new TestMail);
    // Mail::to('dtpqefqpixvwxc@emergentvillage.org')->send(new TestMail);
    // Mail::to('s1lxq2ie73@kobrandly.com')->send(new TestMail);
    Mail::to('sirsam@tempverify.com')->send(new BestMail);
    // Mail::to('bradlriordan@gmail.com')->send(new BestMail);
});
