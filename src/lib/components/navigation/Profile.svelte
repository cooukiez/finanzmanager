<script lang="ts">
    // noinspection ES6UnusedImports
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    // noinspection ES6UnusedImports
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

    import {Moon, Sun} from "lucide-svelte";
    import {handleLogout} from "$lib/client/auth";
    import {Button} from "$lib/components/ui/button";
    import {toggleMode} from "mode-watcher";
</script>

<div class="flex flex-row items-center gap-4">
    <Button onclick={toggleMode} size="icon" variant="outline">
        <Sun
                class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
                class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
    </Button>

    <DropdownMenu.Root>
        <DropdownMenu.Trigger class="relative h-9 w-9 rounded-full hover:bg-accent hover:text-accent-foreground">
            <Avatar.Root class="h-9 w-9">
                <Avatar.Image alt="profile" src=""/>
                <Avatar.Fallback>UP</Avatar.Fallback>
            </Avatar.Root>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-56 mx-1">
            <DropdownMenu.Group>
                <DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
                <DropdownMenu.Separator/>
                <DropdownMenu.Group>
                    <DropdownMenu.Item>
                        Profile
                        <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                        Settings
                        <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
                    </DropdownMenu.Item>
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>Theme</DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item>
                                <Sun/>
                                Light
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <Moon/>
                                Dark
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator/>
                            <DropdownMenu.Item>System</DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                </DropdownMenu.Group>
                <DropdownMenu.Separator/>
                <a href="https://github.com/cooukiez/finanzmanager">
                    <DropdownMenu.Item>Github</DropdownMenu.Item>
                </a>
                <a href="https://github.com/cooukiez/finanzmanager/projects?query=is:open">
                    <DropdownMenu.Item>Project on Github</DropdownMenu.Item>
                </a>
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>Support</DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent>
                        <DropdownMenu.Item>Create Issue</DropdownMenu.Item>
                        <DropdownMenu.Item>Create Discussion</DropdownMenu.Item>
                        <DropdownMenu.Separator/>
                        <DropdownMenu.Item>Fix it yourself</DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
                <DropdownMenu.Separator/>
                <DropdownMenu.Item onclick={handleLogout}>
                    Log out
                    <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
                </DropdownMenu.Item>
            </DropdownMenu.Group>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>