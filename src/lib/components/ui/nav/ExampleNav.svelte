<script lang="ts">
    import {cubicInOut} from "svelte/easing";
    import {crossfade} from "svelte/transition";
    import {cn} from "$lib/utils.js";
    import {ScrollArea} from "$lib/components/ui/scroll-area";
    import {page} from "$app/state";

    // noinspection ES6UnusedImports
    import * as Avatar from "$lib/components/ui/avatar/";
    // noinspection ES6UnusedImports
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/";

    import {Button} from "$lib/components/ui/button";
    import {Menu} from "lucide-svelte";

    let className: string | undefined | null = undefined;
    export {className as class};

    const [send, receive] = crossfade({
        duration: 250,
        easing: cubicInOut,
    });

    const examples = [
        {
            name: "Home",
            href: "/home",
            label: "", // Optional label
            index: 0, // Index for tracking
        },
        {
            name: "Lorem",
            href: "/lorem",
            label: "", // Optional label
            index: 1, // Index for tracking
        },
        {
            name: "Accounts",
            href: "/accounts",
            label: "", // Optional label
            index: 1, // Index for tracking
        },
        {
            name: "Groups",
            href: "/groups",
            label: "", // Optional label
            index: 1, // Index for tracking
        },
    ];
</script>

<div class="flex flex-row justify-between items-center gap-4 py-3 px-4">
    <div class="flex flex-row items-center gap-4">
        <Button class="relative w-8 h-8" variant="ghost">
            <Menu class="mx-4 w-7 h-7"/>
        </Button>

        <ScrollArea orientation="both" scrollbarXClasses="invisible">
            <div
                    class={cn("flex items-center overflow-y-auto pb-3 md:pb-0", className)}
                    {...$$restProps}
            >
                {#each examples as example, index (index)}
                    {@const isActive =
                    page.url.pathname.startsWith(example.href) ||
                    (page.url.pathname === "/" && index === 0)}

                    <a
                            href={example.href}
                            data-sveltekit-noscroll
                            class={cn(
							"hover:text-primary relative flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors",
							isActive ? "text-primary font-medium" : "text-muted-foreground"
						)}
                    >
                        {#if isActive}
                            <div
                                    class="bg-muted absolute inset-0 rounded-full"
                                    in:send={{ key: "activetab" }}
                                    out:receive={{ key: "activetab" }}
                            ></div>
                        {/if}
                        <div class="relative">
                            {example.name}
                            {#if example.label}
								<span
                                        class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline"
                                >
									{example.label}
								</span>
                            {/if}
                        </div>
                    </a>
                {/each}
            </div>
        </ScrollArea>
    </div>


    <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>


            <Button builders={[builder]} class="relative w-8 h-8 rounded-full" variant="ghost">
                <Avatar.Root class="w-8 h-8">
                    <Avatar.Image alt="user" src=""/>
                    <Avatar.Fallback>U</Avatar.Fallback>
                </Avatar.Root>
            </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-56">
            <DropdownMenu.Label>My Account</DropdownMenu.Label>
            <DropdownMenu.Separator/>
            <DropdownMenu.Group>
                <DropdownMenu.Item>
                    Profile
                    <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    Billing
                    <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    Settings
                    <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    Keyboard shortcuts
                    <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
                </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator/>
            <DropdownMenu.Group>
                <DropdownMenu.Item>Team</DropdownMenu.Item>
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent>
                        <DropdownMenu.Item>Email</DropdownMenu.Item>
                        <DropdownMenu.Item>Message</DropdownMenu.Item>
                        <DropdownMenu.Separator/>
                        <DropdownMenu.Item>More...</DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
                <DropdownMenu.Item>
                    New Team
                    <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
                </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator/>
            <DropdownMenu.Item>GitHub</DropdownMenu.Item>
            <DropdownMenu.Item>Support</DropdownMenu.Item>
            <DropdownMenu.Item>API</DropdownMenu.Item>
            <DropdownMenu.Separator/>
            <DropdownMenu.Item>
                Log out
                <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>