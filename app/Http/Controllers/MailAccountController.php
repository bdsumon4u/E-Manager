<?php

namespace App\Http\Controllers;

use App\Contracts\Repositories\EmailAccountRepository;
use App\Criteria\EmailAccount\EmailAccountsForUserCriteria;
use App\Http\Requests\EmailAccountRequest;
use App\Http\Resources\EmailAccountResource;
use App\Innoclapps\MailClient\ConnectionType;
use App\Models\EmailAccount;
use Illuminate\Http\Request;
use ProtoneMedia\Splade\Facades\Toast;

class MailAccountController extends Controller
{
    /**
     * Initialize new EmailAccountController instance.
     *
     * @param  \App\Contracts\Repositories\EmailAccountRepository  $repository
     */
    public function __construct(protected EmailAccountRepository $repository)
    {
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $query = $this->repository->withResponseRelations()
            ->pushCriteria(new EmailAccountsForUserCriteria($request->user()));

        if ($request->query('viaOAuth')) {
            return redirect()->action([static::class, 'edit'], $query->orderBy('id', 'desc')->first());
        }

        $accounts = $query->all();

        return view('mail.accounts', [
            'accounts' => $accounts,
        ]);
    }

    public function create(Request $request, string $type)
    {
        return view('mail.accounts.create', [
            'connection_types' => $this->connectionTypes(),
        ]);
    }

    public function store(Request $request)
    {
        return back()->with('authLink', action([OAuthEmailAccountController::class, 'connect'], [
            'type' => $request->get('type', 'personal'),
            'provider' => match ($request->connection_type) {
                ConnectionType::Gmail->value => 'google',
                ConnectionType::Outlook->value => 'microsoft',
                default => 'imap',
            },
            'period' => now()->subMonths($request->period)->toDateString(),
        ]));
    }

    public function edit(Request $request, EmailAccount $emailAccount)
    {
        return view('mail.accounts.edit', [
            'connection_types' => $this->connectionTypes(),
            'account' => json_decode(EmailAccountResource::make($emailAccount)->toJson(), true),
        ]);
    }

    private function connectionTypes()
    {
        return array_combine(array_column(ConnectionType::cases(), 'value'), array_column(ConnectionType::cases(), 'name'));
    }

    public function update(EmailAccountRequest $request, $id)
    {
        // The user is not allowed to update these fields after creation
        $except = ['email', 'connection_type', 'user_id', 'initial_sync_from'];

        $this->repository->update($request->except($except), $id);

        Toast::title('Email settings were updated!');

        return back();
    }
}
