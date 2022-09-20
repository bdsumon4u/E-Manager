<x-app-layout>
    <x-slot name="header"></x-slot>

    <div class="max-w-2xl px-4 py-5 mx-auto">
        <x-splade-form action="{{ route('mail.accounts.store') }}" method="post" default="{connection_type: 'Gmail', period: 1, imap_encryption: 'ssl', 'smtp_encryption': 'ssl'}" class="w-full px-4 py-3 bg-white">
            <div
                class="flex flex-col h-full bg-white divide-y divide-neutral-200 dark:divide-neutral-700 dark:bg-neutral-900"
            >
                <div class="flex flex-col flex-1 min-h-0 pb-6">
                    <div class="">
                        <div class="flex items-start justify-between">
                            <div class="space-y-1">
                                <h2
                                    id="headlessui-dialog-title-11"
                                    class="text-lg font-medium text-neutral-700 dark:text-white"
                                >
                                    Create Email Account
                                </h2>
                                <!---->
                            </div>
                        </div>
                    </div>
                    <div class="relative flex-1 mt-8">
                        <div class="p-4 mb-5 rounded-md bg-blue-50" style=""><div class="flex"><div class="shrink-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-5 h-5 text-blue-400"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="ml-3"><h3 class="text-sm font-medium text-blue-800" style="display: none;"></h3><div class="text-sm text-blue-700"><div>Microsoft application not configured,
                            you must <a href="/settings/integrations/microsoft" rel="noopener noreferrer" target="_blank" class="font-medium underline text-danger-700 hover:text-danger-600">configure</a> your
                            Microsoft application in order to connect Outlook mail client.</div></div></div><!----></div></div>
                        <div
                            class="px-4 py-3 mb-3 border rounded-md border-warning-400"
                        >
                            <x-splade-select name="connection_type" :options="$connection_types" placeholder="Select Account Type" choices="{ searchEnabled: false }" />
                        </div>
                        <div
                            class="p-3 mb-3 border rounded-md border-neutral-200 dark:border-neutral-600"
                        >
                            <x-splade-radios group="x" help="No Helpx" name="period" inline label="Sync emails from" :options="['Now', '1 month ago', 3 => '3 months ago', 6 => '6 months ago']" />
                        </div>
                        <div :class="{'blur-sm pointer-events-none': form.connection_type != 'Imap'}">
                            <div class="mb-3">
                                <label
                                    class="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-100"
                                    for="email"
                                    ><span class="mr-1 text-sm text-danger-600">*</span
                                    >Email Address</label
                                ><input
                                    name="email"
                                    autocomplete="off"
                                    type="email"
                                    class="rounded-md form-input dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 border-neutral-300 dark:border-neutral-500"
                                    spellcheck="false"
                                    style="
                                        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiYmZkZTQxOS00ZGRkLWU5NDYtOWQ2MC05OGExNGJiMTA3N2YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDAyNDkwMkRDOTIyMTFFNkI0MzFGRTk2RjM1OTdENTciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDAyNDkwMkNDOTIyMTFFNkI0MzFGRTk2RjM1OTdENTciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTU2NTE1NDItMmIzOC1kZjRkLTk0N2UtN2NjOTlmMjQ5ZGFjIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmJiZmRlNDE5LTRkZGQtZTk0Ni05ZDYwLTk4YTE0YmIxMDc3ZiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po+RVEoAAApzSURBVHja3Fp5bBTnFf/N7L32rm98gI0NmNAQjoAR4WihCCdNHFBDonCmJQWhtiRS01JoSlCqCqhoFeUoTUpTOSptuKSK0HIYHI5wCWwMxmAo8QXYDvg+du31ntP3zc7Osd61zR9V4o412m/mm/3mHb/3e+99a87j8UA68uh8i84F+GYfp+jcSucVdsFJCiyjcy+G17Gczn1MgcdpUInheUxkCpygQf4wVaCYKSBgGB88nc5hLL+TKTCcPSDoNVdCZF04jtPMh66HcrBno607oGT0nYG+G5JBP9giQ70vvoz+OHBDWkMzF2YPtsZQjaSPtrBBpwOv139t2GD5iSkR7v0hKaDjg8Kfrv4StR2tsBhNiqU4aaAeQ3tfUEwpzwuiMIJ4LYRNC9LYT0IGAn7My8hBVoydxoGoMI6uAD2oN+ixu6wEP9xTCBgN0NHJ7oOnl/NQxuyTk5SRr5V5eRztUzZKaA1avK0JeROeROmiNdDRfa/f/2gQ0kmfp2u+pFkdxqemw4+AuLgQJpxaYHHMSxKJygiSYKpnID0TsqbkAnapo/XrnJ1AfBKW5kwU5wMBgrLB0A9Sai/owwMx5Cqb2QyD0RgMTFFAyY18cMxzPAI8FHjwKkXEZ3lZeOWeSng+GO5McDdB5X5nC8YmjsBf5y7C/NQsEVc8GfBGexOsegPG2hLg9XklhbnoHhA0rKLAg/0xQfT0wl6/D/WOdlhMJoy0xYkKBST4cRrPSKkSWugI0pyeYu2BywmXuxcrJ0zHrtnPIUanl6H1zq3L2Hi5CLlJaSh9djVi9Ub4fL7Bg1gTsCpFmAwuvxfMg+vz5qC2qx3Ham4jLS4BNpMZPiEQfBYqQdUBz6m8RxCr7WpFnDUWH85+CavHTpJfXd/rwLpLR1F09xZ4kwVNbheaXb2w2U2DxwCn4uKg8EG/MEiw8f3uLrybvxg/y5srzmw+fwLbS79Am6cP2XHxpIQQDPR+Vudkq3d6+9De04WF2d/Cn596luARL7//07uVeOPK52jp7cao5DQ4vR7YyfIGno9aC/VjIRlKGi8o2ln0BvnxbXOfxvEXX0UmQamqtQle8gLDtcIynAwtnY5HrbNDVGDrzGdQnL9cFt5F0Fhz+ShWnfsnugNeZFM8yIHOc8p6gyoQ5goOWrobRVbe9EUR/lByVn706axxuLZiPV6ZNAMNXW1ocvWIwoYsz5MAbuL3OqLIyUmpOP/camyePEf+/umme5hyrBCFd0qRGpeENKtNhKPac6HoDM/QfDQIaXDMKQnKajDCTFl646lDWPTZbgrmLvFROyW73fkvovCZl2GiQKzpbBW/xjJ6IwXqw55urJ8yB1eeX4NZKSPlV2ypOIcFJ/eiqqcDoxPTYeR0YkKDmgi4IeYBjXacJiDkCx9Rno3Yx2pOw+Gqm7jS8hXenV+AZbnBIHyVktC8kdn4ydnDOHH3NmNzZCSl44/zX8CS0RPk5asdHSJkzjZWI9GeALvBLFkdETI792i1kIZSubD4ECmTWYhHbkoaGnscWH54D05NnYWd8wpgpCAdQ5x9vOAVbC0/JzLVjpn5SDFb5WU+ri7HG1dPoocCPzMxVVzXh4CUMyBRNjQxFK3C7V9Oh3tBjgFBU9eEvJERa0dfwIqPyy/iUnMDPpr3POakZYnzb039tubFbUSHr5Uex76aCliJPrPjk0lwIWgqThFazj9qJlNZUp2J+QEhFEmRkC7S4Se3G8jq45LTcbO9GXMPfYLt18718+Zhgsq0I4XYV30dGXHJSCaP+CKV0+HQVddNEeTkMVgmi1JxqhdmYjAIjIlLRBIlns0XjuF7RXtQ5+iE0+fBprJTWFS8l4LZQfSYSjTLBWEIxeIyWUBLv8zbrOyI1mMMueAXQjTECzKE2A1BrHmCVywIGRvFElUeb6jGwqJ/wE4ZuryjCSOoPGYMFqLHkEGEaNVpv4oAg5fT/WIgyiKy2blglhAETnZMKMBziFk6PG40E+4zY+PETO6HEE5tEd6jULYIlQA3YIs6sAfCDCGor7j+TCXI8gkUG1TRksXF6hXB8nogOow0JYR3PUNqaKSjL1T1MSsLIXpDfwvKWVKJF0FyV1DpsD453MoRy5hQVcvaECq3yXdeVXc2oAIsC7KbdkpW/vZW3KeanOOlQJLre17bmYV6AekZQccp/M1D6dx0yj2l2RmgY2PruXuQYEtGosk0NAWYi9i5YfZ30UolbKOzGzEmo9IyQrV4iD14pW/QBCZULai6rgnzgkaRkN9YcqOA9wd8eH3MdCQYLfB5ff2RR61aN2vAwpUwUjf2TTq8Xm9/yAEOfqBNo//NXlqUsdgECxHv+bzeaHEO3ZYtW96kTw3AWCN95mIZXli7EWUVt/GXTz/Dpas30NLeiV9u/QD7/1WMC6UVMJsMeHP7TuRkjURGagp++usdqKt/gPrGJvzit+9h198PItDbh5wnxmFJxTGMMdmQSaXy72uu4pP6SixOHSNKVVByCA5KeHkJabjd3YptNSWI15uwrboEeXEplFvM8hZL2O6gJ+LWIvu022KQm52Jg0VnEGeLxYI5eTAbDbDHWqGnEjl9RBIaH7bgwP5/w+3xYsHcGfjo/UKsXf8D1FgsqLhVhR8tW4wNb7+HZnhweooPDZVn8LfJC7Hp2hFMTAkKX9b5EEfvXUe7rw8/Hj0ZLsL8keY6fCdxFH3ew4bsaVGbmailBMPbtEkTcGDX75CanIili/Px83UrwJPgPWRRMwW1nmp+i9mEaTOnkZf+Q574EzIfH4/0lCQkxtuROTKN4sggJgcXNTNrR02Ejuwz/fxeTE3NwXSyLDverirBytyZYg4501KP3Jh4pJljYaX1M0wxiJWa/BC5PFI57fN50e3sQUtbp3hdXnkHReSRdWuWITHBDlefGz6/Hy8VLBCFrb3XiBo6Hxubhco7tYixmLFzx6/w1JL5WH3jc/yGBG1wO2Gi4u9QUy3qqC8uar2HfLJ2rbMdH9y/jncmzIWHFPYQA3X7PegVBCVLRvAEP5ACDHZJ8XGwxVjEa+aNlIw0XLt5BxfLKuD3B+By9WHdqu9jx+bXERtjhZcSIIPUk0+Mx8kDH2LVysViB9fe48QMewpey55C5ZSAZKLF9++W4+XUcdg/vQAXZi1FY59TVOwxawJSDBZYdAasuHIIB7+qIgOZIv4OoKFRtYtCTNTa3gWTUQ9bbIwIn06HAwE/2zGjeyRwW2cXskelUw+sQ8ODZjEVWMjyXuLsEaSwnzzEtge7/F4k6I00z4n7Sqz576bAzSK46KRN5CZqPd00Z6cAtpKXWr1u1FKrmWm1I8McQ+9VsjEf3KVwRFRAHemhfOB2u2GKkg0ZQ7ANp/DcIXI3y+z0MrZZ7CelWP9g1BkUONC82xfcNjSy2ikQhEqAFObZ7oe46xug0sZDcFE2hgdUQIMxloEF5QcH9S7xYD98aDyqqna5cNaLUM8JMr61vUMYQhz6wRKY3DRF2N4OV3jAHzPC95xU11yU4lRA2NZOFBrlMHwP7v/iZ9biYSx/8bD/VwPmgVsI/uPEcDuYzLe44f7vNv8VYAB02UEWdC0FyQAAAABJRU5ErkJggg==') !important;
                                        background-repeat: no-repeat;
                                        background-size: 20px;
                                        background-position: 97% center;
                                        cursor: auto;
                                    "
                                    data-temp-mail-org="0"
                                /><!----><!---->
                            </div>
                            <div class="mb-3">
                                <label
                                    class="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-100"
                                    ><!----></label
                                >
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input
                                            id="create_contact"
                                            name="create_contact"
                                            type="checkbox"
                                            class="form-check dark:bg-neutral-700"
                                            value="true"
                                        />
                                    </div>
                                    <div class="ml-2">
                                        <label
                                            class="block text-sm font-medium text-neutral-700 dark:text-neutral-100"
                                            for="create_contact"
                                            ><!---->Create Contact record if record does
                                            not exists.</label
                                        ><!---->
                                    </div>
                                </div>
                                <!---->
                            </div>
                        </div>
                        <div :class="{'blur-sm pointer-events-none': form.connection_type != 'Imap'}">
                            <div class="mb-3">
                                <label
                                    class="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-100"
                                    for="password"
                                    ><span class="mr-1 text-sm text-danger-600">*</span
                                    >Password</label
                                ><input
                                    name="password"
                                    autocomplete="off"
                                    type="password"
                                    placeholder=""
                                    class="rounded-md form-input dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 border-neutral-300 dark:border-neutral-500"
                                    spellcheck="false"
                                /><!----><!---->
                            </div>
                            <div class="mb-3">
                                <div class="flex">
                                    <label
                                        class="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-100 grow"
                                        for="username"
                                        ><!---->Username</label
                                    ><span
                                        class="self-end mb-px text-xs text-neutral-600 dark:text-neutral-200"
                                        >Optional</span
                                    >
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    autocomplete="off"
                                    type="text"
                                    class="rounded-md form-input dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 border-neutral-300 dark:border-neutral-500"
                                    spellcheck="false"
                                /><!---->
                            </div>
                            <div class="mt-4 mb-3">
                                <h5
                                    class="mb-3 font-medium text-neutral-700 dark:text-neutral-100"
                                >
                                    Incoming Mail (IMAP)
                                </h5>
                                <div class="mb-3">
                                    <label
                                        class="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-100"
                                        for="imap_server"
                                        ><span class="mr-1 text-sm text-danger-600"
                                            >*</span
                                        >Server</label
                                    ><input
                                        name="imap_server"
                                        autocomplete="off"
                                        type="text"
                                        placeholder="imap.example.com"
                                        class="rounded-md form-input dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 border-neutral-300 dark:border-neutral-500"
                                        spellcheck="false"
                                    /><!----><!---->
                                </div>
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-2">
                                        <div class="mb-3">
                                            <label
                                                class="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-100"
                                                for="imap_port"
                                                ><span
                                                    class="mr-1 text-sm text-danger-600"
                                                    >*</span
                                                >Port</label
                                            ><input
                                                name="imap_port"
                                                autocomplete="off"
                                                type="number"
                                                class="rounded-md form-input dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 border-neutral-300 dark:border-neutral-500"
                                            /><!----><!---->
                                        </div>
                                    </div>
                                    <div class="col-span-4">
                                        <x-splade-select name="imap_encryption" :options="['ssl' => 'SSL', 'tls' => 'TLS']" />
                                    </div>
                                </div>
                            </div>
                            <h5
                                class="mb-3 font-medium text-neutral-700 dark:text-neutral-100"
                            >
                                Outgoing Mail (SMTP)
                            </h5>
                            <div class="mb-3">
                                <label
                                    class="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-100"
                                    for="smtp_server"
                                    ><span class="mr-1 text-sm text-danger-600">*</span
                                    >Server</label
                                ><input
                                    name="smtp_server"
                                    autocomplete="off"
                                    type="text"
                                    placeholder="smtp.example.com"
                                    class="rounded-md form-input dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 border-neutral-300 dark:border-neutral-500"
                                    spellcheck="false"
                                /><!----><!---->
                            </div>
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-2">
                                    <div class="mb-3">
                                        <label
                                            class="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-100"
                                            for="smtp_port"
                                            ><span class="mr-1 text-sm text-danger-600"
                                                >*</span
                                            >Port</label
                                        ><input
                                            name="smtp_port"
                                            autocomplete="off"
                                            type="number"
                                            class="rounded-md form-input dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 border-neutral-300 dark:border-neutral-500"
                                        /><!----><!---->
                                    </div>
                                </div>
                                <div class="col-span-4">
                                    <x-splade-select name="smtp_encryption" :options="['ssl' => 'SSL', 'tls' => 'TLS']" />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label
                                    class="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-100"
                                    ><!----></label
                                >
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input
                                            id="validate_cert"
                                            name="validate_cert"
                                            type="checkbox"
                                            class="form-check dark:bg-neutral-700"
                                            value="0"
                                        />
                                    </div>
                                    <div class="ml-2">
                                        <label
                                            class="block text-sm font-medium text-neutral-700 dark:text-neutral-100"
                                            for="validate_cert"
                                            ><!---->Allow non-secure certificate</label
                                        ><!---->
                                    </div>
                                </div>
                                <!----><!---->
                            </div>
                        </div>
                        <!---->
                        <div :class="{'blur-sm pointer-events-none': form.connection_type != 'Imap'}">
                            <!---->
                        </div>
                        <!----><!---->
                    </div>
                </div>
                <div class="py-4 shrink-0 dark:bg-neutral-800">
                    <div class="flex flex-wrap justify-end space-x-3 sm:flex-nowrap">
                        <button type="button" class="rounded-md btn btn-white btn-md">
                            Cancel</button
                        >
                        @if ($link = session()->get('authLink'))
                            <a href="{{ $link }}">Authenticate</a>
                        @else
                            <button
                                type="submit"
                                class="rounded-md btn btn-blue-500 btn-md"
                                tabindex="-1"
                            >Connect Account
                            </button>
                        @endif
                    </div>
                </div>
            </div>
        </x-splade-form>
    </div>
</x-app-layout>