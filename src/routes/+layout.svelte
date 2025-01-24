<script lang="ts">
    import "../app.css";
    import type {Snippet} from "svelte";
    import type {LayoutData} from "./$types";

    import {
        Avatar,
        Dropdown,
        DropdownDivider,
        DropdownHeader,
        DropdownItem,
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper
    } from 'flowbite-svelte';
    import {AngleLeftOutline, BarsFromLeftOutline, ChartPieSolid, ChevronDownOutline} from 'flowbite-svelte-icons';

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

    let navUlClass = "flex flex-col md:flex-row p-2 mt-2 h-12 md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium";
    let navLiClass = "cursor-pointer justify-center items-center flex";
    let dropdownClass = "w-44 z-20 py-2 shadow-lg";
</script>

<Navbar class="sticky top-0 z-20 border-b p-0" fluid={true}>
    {#if !data.user}
        <NavBrand href="/">
            <div class={navLiClass}>
                <img src="favicon.png" class="w-9 h-9 p-1 me-3" alt="finanzmanager"/>
                <span class="self-center whitespace-nowrap text-gray-900 dark:text-white">Finanzmanager</span>
            </div>
        </NavBrand>
    {/if}

    {#if data.user}
        <NavUl ulClass={navUlClass + "p-0"}>
            <div class={navLiClass}>
                <BarsFromLeftOutline class="w-9 h-9 py-1 me-3" onclick={toggleSidebar}/>
            </div>

            {#if data.user.role === "admin"}
                <NavLi href="/">Dashboard</NavLi>
            {:else}
                <NavLi class={navLiClass}>
                    Accounts
                    <ChevronDownOutline class="inline"/>
                </NavLi>
                <Dropdown placement="bottom" class={dropdownClass}>
                    <DropdownItem href="/" class="w-full">Add new Account</DropdownItem>
                </Dropdown>

                <NavLi class={navLiClass}>
                    Groups
                    <ChevronDownOutline class="inline"/>
                </NavLi>
                <Dropdown placement="bottom" class={dropdownClass}>
                    <DropdownItem href="/" class="w-full">Join new Group</DropdownItem>
                </Dropdown>
            {/if}
        </NavUl>
        <NavUl ulClass={navUlClass}>
            <div class={navLiClass}>
                <Avatar class="w-7 h-7" id="avatar-menu"/>
            </div>
            <div>
                <Dropdown placement="bottom" triggeredBy="#avatar-menu" class={dropdownClass}>
                    <DropdownHeader>
                        <span class="block truncate text-sm">{data.user.name}</span>
                        <span class="block truncate text-sm">{data.user.email}</span>
                    </DropdownHeader>
                    <DropdownItem>Profile</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem href="/lorem" class="w-full">Lorem ipsum</DropdownItem>
                    <DropdownDivider/>
                    <DropdownItem onclick={handleLogout}>Sign out</DropdownItem>
                </Dropdown>
            </div>

        </NavUl>
    {:else}
        <NavUl ulClass={navUlClass}>
            <NavLi href="/">Home</NavLi>
        </NavUl>
    {/if}
</Navbar>

{#if data.user && showSidebar}
    <Sidebar id="sidebar" class="absolute top-0 h-full z-20">
        <SidebarWrapper class="h-full">
            <SidebarGroup>
                <SidebarItem label="Back" onclick={toggleSidebar}>
                    <svelte:fragment slot="icon">
                        <AngleLeftOutline/>
                    </svelte:fragment>
                </SidebarItem>
            </SidebarGroup>
            <SidebarGroup border>
                <SidebarItem label="Dashboard" class="">
                    <svelte:fragment slot="icon">
                        <ChartPieSolid/>
                    </svelte:fragment>
                </SidebarItem>
            </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
{/if}

{@render children()}