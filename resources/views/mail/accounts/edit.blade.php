<x-app-layout>
    <x-slot name="header"></x-slot>

    <div class="max-w-2xl px-4 py-5 mx-auto">
        <x-splade-form
            action="{{ route('mail.accounts.update', $account['id']) }}"
            method="post"
            :default="$account"
            class="w-full px-4 py-3 bg-white"
        >
            <div
                class="flex flex-col h-full bg-white divide-y shadow-xl divide-neutral-200 dark:divide-neutral-700 dark:bg-neutral-900"
            >
                <div
                    class="flex flex-col flex-1 min-h-0 py-6"
                >
                    <div class="px-4 sm:px-6">
                        <div class="flex items-start justify-between">
                            <div class="space-y-1">
                                <h2
                                    id="headlessui-dialog-title-9"
                                    class="text-lg font-medium text-neutral-700 dark:text-white"
                                >
                                    Edit Email Account
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="relative flex-1 px-4 mt-8 sm:px-6">
                        <x-splade-select class="mb-3" label="* Connection Type" name="connection_type" :options="$connection_types" disabled />
                        <x-splade-input class="mb-3" label="* Email Address" name="email" disabled />
                        <x-splade-checkbox class="mb-3" name="create_contact" label="Create contact record if record does not exists." />
                        <div class="">
                            <x-splade-input type="password" class="mb-3" label="* Password" name="password" />
                            <x-splade-input class="mb-3" label="Username" name="username" />

                            <div class="mt-4 mb-3">
                                <h5
                                    class="mb-3 font-medium text-neutral-700 dark:text-neutral-100"
                                >
                                    Incoming Mail (IMAP)
                                </h5>
                                <x-splade-input class="mb-3" label="* Server" name="imap_server" />
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-2">
                                        <x-splade-input class="mb-3" label="* Port" name="imap_port" />
                                    </div>
                                    <div class="col-span-4">
                                        <x-splade-select label="Encryption" name="imap_encryption" :options="['ssl' => 'SSL', 'tls' => 'TLS']" />
                                    </div>
                                </div>
                            </div>
                            <h5
                                class="mb-3 font-medium text-neutral-700 dark:text-neutral-100"
                            >
                                Outgoing Mail (SMTP)
                            </h5>
                            <div class="mb-3">
                                <x-splade-input class="mb-3" label="* Server" name="smtp_server" />
                            </div>
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-2">
                                    <x-splade-input class="mb-3" label="* Port" name="smtp_port" />
                                </div>
                                <div class="col-span-4">
                                    <x-splade-select label="Encryption" name="smtp_encryption" :options="['ssl' => 'SSL', 'tls' => 'TLS']" />
                                </div>
                            </div>
                            <x-splade-checkbox class="mb-2" name="validate_cert" label="Allow non-secured certificate" />
                        </div>
                        <x-splade-select class="mb-2" label="* Select Sent Folder" name="sent_folder_id" :options="array_combine(array_column($account['folders'], 'id'), array_column($account['folders'], 'display_name'))" />
                        <x-splade-select class="mb-2" label="* Select Trash Folder" name="trash_folder_id" :options="array_combine(array_column($account['folders'], 'id'), array_column($account['folders'], 'display_name'))" />
                        <div class="mb-3">
                            <label
                                class="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-100"
                                >Active folders</label
                            >
                            <div class="mt-3">
                                @foreach ($account['folders'] as $folder)
                                    <x-splade-checkbox name="folders[{{ $loop->index }}].syncable" label="{{ $folder['display_name'] }}" />
                                @endforeach
                            </div>
                            <!---->
                        </div>
                    </div>
                </div>
                <div class="px-4 py-4 shrink-0 dark:bg-neutral-800">
                    <div
                        class="flex flex-wrap justify-end space-x-3 sm:flex-nowrap"
                    >
                        <button
                            type="button"
                            class="rounded-md btn btn-white btn-md"
                        >Cancel</button
                        ><button
                            type="submit"
                            class="rounded-md btn btn-primary btn-md"
                        >
                        Save
                        </button>
                    </div>
                </div>
            </div>
        </x-splade-form>
    </div>
</x-app-layout>
