<script lang="ts">
    import "../app.css";
    import type {Snippet} from "svelte";
    import type {LayoutData} from "./$types";


    import Sun from "svelte-radix/Sun.svelte";
    import Moon from "svelte-radix/Moon.svelte";

    import ExampleNav from "$lib/components/ui/nav/ExampleNav.svelte";
    import {ModeWatcher, toggleMode} from "mode-watcher";

    import {Button} from "$lib/components/ui/button";

    let bookmarks = false;
    let fullUrls = true;


    const profileRadioValue = "benoit";

    let {data, children}: { data: LayoutData; children: Snippet } = $props();

    let {showSidebar} = $state({showSidebar: false});

    function toggleSidebar() {
        showSidebar = !showSidebar;
    }

    async function handleLogout() {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
            });

            if (response.ok) {
                // redirect user to root page
                window.location.href = "/";
            } else {
                console.error("Logout failed:", await response.json());
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    }
</script>

<ModeWatcher/>

<ExampleNav/>

<Menubar.Root>
    <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
            <Menubar.Item>
                New Tab
                <Menubar.Shortcut>⌘T</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item>
                New Window
                <Menubar.Shortcut>⌘N</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item>New Incognito Window</Menubar.Item>
            <Menubar.Separator/>
            <Menubar.Sub>
                <Menubar.SubTrigger>Share</Menubar.SubTrigger>
                <Menubar.SubContent>
                    <Menubar.Item>Email link</Menubar.Item>
                    <Menubar.Item>Messages</Menubar.Item>
                    <Menubar.Item>Notes</Menubar.Item>
                </Menubar.SubContent>
            </Menubar.Sub>
            <Menubar.Separator/>
            <Menubar.Item>
                Print...
                <Menubar.Shortcut>⌘P</Menubar.Shortcut>
            </Menubar.Item>
        </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
            <Menubar.Item>
                Undo
                <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item>
                Redo
                <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Separator/>
            <Menubar.Sub>
                <Menubar.SubTrigger>Find</Menubar.SubTrigger>
                <Menubar.SubContent>
                    <Menubar.Item>Search the web</Menubar.Item>
                    <Menubar.Separator/>
                    <Menubar.Item>Find...</Menubar.Item>
                    <Menubar.Item>Find Next</Menubar.Item>
                    <Menubar.Item>Find Previous</Menubar.Item>
                </Menubar.SubContent>
            </Menubar.Sub>
            <Menubar.Separator/>
            <Menubar.Item>Cut</Menubar.Item>
            <Menubar.Item>Copy</Menubar.Item>
            <Menubar.Item>Paste</Menubar.Item>
        </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Content>
            <Menubar.CheckboxItem bind:checked={bookmarks}
            >Always Show Bookmarks Bar
            </Menubar.CheckboxItem
            >
            <Menubar.CheckboxItem bind:checked={fullUrls}>
                Always Show Full URLs
            </Menubar.CheckboxItem>
            <Menubar.Separator/>
            <Menubar.Item inset>
                Reload
                <Menubar.Shortcut>⌘R</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item inset>
                Force Reload
                <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Separator/>
            <Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
            <Menubar.Separator/>
            <Menubar.Item inset>Hide Sidebar</Menubar.Item>
        </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
        <Menubar.Trigger>Profiles</Menubar.Trigger>
        <Menubar.Content>
            <Menubar.RadioGroup value={profileRadioValue}>
                <Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
                <Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
                <Menubar.RadioItem value="Luis">Luis</Menubar.RadioItem>
            </Menubar.RadioGroup>
            <Menubar.Separator/>
            <Menubar.Item inset>Edit...</Menubar.Item>
            <Menubar.Separator/>
            <Menubar.Item inset>Add Profile...</Menubar.Item>
        </Menubar.Content>
    </Menubar.Menu>
</Menubar.Root>

<div class="h-24"></div>

<Button variant="outline">Click me</Button>

<Button on:click={toggleMode} size="icon" variant="outline">
    <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
</Button>

<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline">Open</Button>
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

{@render children()}
