<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ __('Mail') }}
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="px-4 mx-auto sm:px-6 lg:px-8">
            <div class="sm:py-4">
                <div class="">
                    @if (true)
                    <div class="" style="display: none;">
                        <div
                            class="mx-auto overflow-hidden bg-white rounded-lg shadow card ring-1 ring-neutral-600 ring-opacity-5 dark:bg-neutral-900 max-w-7xl"
                        >
                            <div
                                class="flex flex-wrap items-center justify-between px-4 py-5 border-b border-neutral-200 dark:border-neutral-700 sm:flex-nowrap sm:px-6"
                            >
                                <div class="grow">
                                    <h3
                                        class="text-lg font-medium leading-6 whitespace-nowrap text-neutral-700 dark:text-white"
                                    >
                                        Email Accounts
                                    </h3>
                                    <!---->
                                </div>
                                <div class="w-full shrink-0 sm:ml-4 sm:w-auto">
                                    <div
                                        class="flex flex-col w-full mt-4 space-y-1 sm:mt-0 sm:w-auto sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0"
                                    >
                                        <span
                                            class="grid sm:inline v-popper--has-tooltip"
                                            ><button
                                                type="button"
                                                class="rounded btn btn-white btn-sm"
                                            >
                                                <!----><!---->Connect Shared
                                                Account
                                            </button></span
                                        ><button
                                            type="button"
                                            class="rounded btn btn-white btn-sm"
                                        >
                                            <!----><!---->Connect Personal Email
                                            Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ul
                                class="divide-y divide-neutral-200 dark:divide-neutral-700"
                            ></ul>
                            <!---->
                        </div>
                        <div
                            class="absolute inset-0 z-10"
                            style="display: none"
                        >
                            <div
                                class="absolute inset-0 rounded-md bg-neutral-100 opacity-60 dark:bg-neutral-700"
                            ></div>
                            <div
                                class="absolute z-20"
                                style="
                                    top: 50%;
                                    left: 50%;
                                    transform: translateX(-50%) translateY(-50%);
                                "
                            >
                                <svg
                                    class="w-5 h-5 animate-spin text-primary-500 dark:text-neutral-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div
                            class="max-w-5xl m-auto overflow-hidden bg-white rounded-lg shadow card ring-1 ring-neutral-600 ring-opacity-5 dark:bg-neutral-900"
                        >
                            <!---->
                            <div class="px-4 py-5 sm:p-6">
                                <div class="max-w-2xl p-4 mx-auto" style="">
                                    <h2
                                        class="text-2xl font-medium text-center text-neutral-800 dark:text-neutral-200"
                                    >
                                        No email accounts configured
                                    </h2>
                                    <p
                                        class="text-center text-neutral-600 dark:text-neutral-300"
                                    >
                                        Connect an account to start sending and
                                        organize emails in order close deals
                                        faster
                                    </p>
                                    <ul
                                        role="list"
                                        class="grid grid-cols-1 gap-6 py-10 mt-6 lg:grid-cols-2"
                                    >
                                        <li class="flow-root">
                                            <div
                                                class="relative flex items-center p-2 -m-2 space-x-4 rounded-xl"
                                            >
                                                <div
                                                    class="flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg shrink-0"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="2"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                        class="w-6 h-6 text-white"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p
                                                        class="mt-1 text-sm text-neutral-600 dark:text-neutral-200"
                                                    >
                                                        2-way email sync with
                                                        your email provider.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="flow-root">
                                            <div
                                                class="relative flex items-center p-2 -m-2 space-x-4 rounded-xl"
                                            >
                                                <div
                                                    class="flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg shrink-0"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="2"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                        class="w-6 h-6 text-white"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p
                                                        class="mt-1 text-sm text-neutral-600 dark:text-neutral-200"
                                                    >
                                                        Save time by making use
                                                        of predefined templates.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="flow-root">
                                            <div
                                                class="relative flex items-center p-2 -m-2 space-x-4 rounded-xl"
                                            >
                                                <div
                                                    class="flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg shrink-0"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="2"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                        class="w-6 h-6 text-white"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p
                                                        class="mt-1 text-sm text-neutral-600 dark:text-neutral-200"
                                                    >
                                                        Compose emails and
                                                        templates with
                                                        placeholders.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="flow-root">
                                            <div
                                                class="relative flex items-center p-2 -m-2 space-x-4 rounded-xl"
                                            >
                                                <div
                                                    class="flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg shrink-0"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="2"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                        class="w-6 h-6 text-white"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p
                                                        class="mt-1 text-sm text-neutral-600 dark:text-neutral-200"
                                                    >
                                                        Add customized signature
                                                        for a more professional
                                                        look.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="flow-root">
                                            <div
                                                class="relative flex items-center p-2 -m-2 space-x-4 rounded-xl"
                                            >
                                                <div
                                                    class="flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg shrink-0"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="2"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                        class="w-6 h-6 text-white"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p
                                                        class="mt-1 text-sm text-neutral-600 dark:text-neutral-200"
                                                    >
                                                        Associate emails to many
                                                        Contacts, Companies and
                                                        Deals.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="flow-root">
                                            <div
                                                class="relative flex items-center p-2 -m-2 space-x-4 rounded-xl"
                                            >
                                                <div
                                                    class="flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg shrink-0"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="2"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                        class="w-6 h-6 text-white"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p
                                                        class="mt-1 text-sm text-neutral-600 dark:text-neutral-200"
                                                    >
                                                        Connect via IMAP, your
                                                        Gmail or Outlook
                                                        account.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div
                                        class="mt-4 space-y-1 text-center sm:space-x-2"
                                    >
                                        <span class="v-popper--has-tooltip"
                                            ><button
                                                type="button"
                                                class="justify-center w-full px-4 py-2 text-white bg-blue-400 rounded-md hover:bg-blue-500 btn btn-md sm:w-justify-around sm:w-auto"
                                            >
                                                Connect Shared Account
                                            </button></span
                                        >
                                        <Link
                                            href="{{ route('mail.accounts.create', 'personal') }}"
                                            class="justify-center w-full px-4 py-2 text-white bg-blue-400 rounded-md hover:bg-blue-500 btn btn-md sm:w-justify-around sm:w-auto"
                                        >Connect Personal Email Account</Link>
                                    </div>
                                </div>
                            </div>
                            <!---->
                        </div>
                        <div
                            class="absolute inset-0 z-10"
                            style="display: none"
                        >
                            <div
                                class="absolute inset-0 rounded-md bg-neutral-100 opacity-60 dark:bg-neutral-700"
                            ></div>
                            <div
                                class="absolute z-20"
                                style="
                                    top: 50%;
                                    left: 50%;
                                    transform: translateX(-50%) translateY(-50%);
                                "
                            >
                                <svg
                                    class="w-5 h-5 animate-spin text-primary-500 dark:text-neutral-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    @elseif($loading = false)
                    <!---->
                    <div class="absolute inset-0 z-10">
                        <div
                            class="absolute inset-0 rounded-md bg-neutral-100 opacity-60 dark:bg-neutral-700"
                        ></div>
                        <div
                            class="absolute z-20"
                            style="
                                top: 50%;
                                left: 50%;
                                transform: translateX(-50%) translateY(-50%);
                            "
                        >
                            <svg
                                class="w-5 h-5 animate-spin text-primary-500 dark:text-neutral-300"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                ></circle>
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    @else
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
