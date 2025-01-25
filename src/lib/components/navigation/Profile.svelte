<script lang="ts">
    // noinspection ES6UnusedImports
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    // noinspection ES6UnusedImports
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

    import {Moon, Sun} from "lucide-svelte";
    import {handleLogout} from "$lib/client/auth";
</script>

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
            <DropdownMenu.Item>GitHub</DropdownMenu.Item>
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