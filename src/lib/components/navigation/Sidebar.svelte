<script lang="ts">
    // noinspection ES6UnusedImports
    import * as Sidebar from "$lib/components/ui/sidebar";
    import {useSidebar} from "$lib/components/ui/sidebar";
    // noinspection ES6UnusedImports
    import * as Collapsible from "$lib/components/ui/collapsible";
    // noinspection ES6UnusedImports
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    import {Calendar, ChevronDown, House, Inbox, Menu, Search} from "lucide-svelte";

    const sidebar = useSidebar();

    const items = [
        {
            title: "Home",
            url: "/home",
            icon: House,
        },
        {
            title: "Lorem",
            url: "/lorem",
            icon: Inbox,
        },
        {
            title: "Accounts",
            url: "/accounts",
            icon: Calendar,
        },
        {
            title: "Groups",
            url: "/groups",
            icon: Search,
        },
    ];
</script>

<Sidebar.Root collapsible="icon">
    <Sidebar.Header>
        <Sidebar.Menu>
            <Sidebar.MenuItem>
                <Sidebar.MenuButton class="truncate" onclick={() => sidebar.toggle()}>
                    <Menu/>
                    Menu
                </Sidebar.MenuButton>
            </Sidebar.MenuItem>
        </Sidebar.Menu>
    </Sidebar.Header>
    <Sidebar.Content>
        <Collapsible.Root class="group/collapsible" open>
            <Sidebar.Group>
                <Sidebar.GroupLabel>
                    {#snippet child({props})}
                        <Collapsible.Trigger {...props}>
                            Help
                            <ChevronDown
                                    class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                            />
                        </Collapsible.Trigger>
                    {/snippet}
                </Sidebar.GroupLabel>
                <Collapsible.Content>
                    <Sidebar.GroupContent>
                        <Sidebar.Menu>
                            {#each items as item (item.title)}
                                <Sidebar.MenuItem>
                                    <Sidebar.MenuButton>
                                        {#snippet child({props})}
                                            <a href={item.url} {...props}>
                                                <item.icon/>
                                                <span>{item.title}</span>
                                            </a>
                                        {/snippet}
                                    </Sidebar.MenuButton>
                                </Sidebar.MenuItem>
                            {/each}
                        </Sidebar.Menu>
                    </Sidebar.GroupContent>
                </Collapsible.Content>
            </Sidebar.Group>
        </Collapsible.Root>
    </Sidebar.Content>
</Sidebar.Root>