<script lang="ts">
    import "../app.css";
    import type {Snippet} from "svelte";
    import type {LayoutData} from "./$types";
    import { DarkMode } from 'flowbite-svelte';

    import {
        Avatar,
        Dropdown,
        DropdownDivider,
        DropdownHeader,
        DropdownItem,
        Navbar,
        NavBrand,
        NavLi,
        NavUl
    } from 'flowbite-svelte';
    import {ChevronDownOutline} from 'flowbite-svelte-icons';

    let {data, children}: { data: LayoutData; children: Snippet } = $props();

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


<Navbar>
    <DarkMode />
    <NavBrand href="/">
        {#if data.user}
            <span>Finanzmanager</span>
        {:else}
            <img src="favicon.png" class="me-3 h-6 sm:h-9" alt="finanzmanager"/>
            <span>Finanzmanager</span>
        {/if}

    </NavBrand>
    <NavUl>
        {#if data.user}
            {#if data.user.role === "admin"}
                <NavLi href="/">Dashboard</NavLi>
            {:else}
                <NavLi class="cursor-pointer">
                    Accounts
                    <ChevronDownOutline class="inline"/>
                </NavLi>
                <Dropdown class="w-44 z-20">
                    <DropdownItem href="/">Create new Account</DropdownItem>
                </Dropdown>

                <NavLi class="cursor-pointer">
                    Groups
                    <ChevronDownOutline class="inline"/>
                </NavLi>
                <Dropdown class="w-44 z-20">
                    <DropdownItem href="/">Join new Group</DropdownItem>
                </Dropdown>
            {/if}

            <div class="flex items-center md:order-2">
                <Avatar id="avatar-menu"/>
            </div>
            <Dropdown placement="bottom" triggeredBy="#avatar-menu">
                <DropdownHeader>
                    <span class="block truncate text-sm">{data.user.name}</span>
                    <span class="block truncate text-sm">{data.user.email}</span>
                </DropdownHeader>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem href="/settings">Settings</DropdownItem>
                <DropdownDivider/>
                <DropdownItem onclick={handleLogout}>Sign out</DropdownItem>
            </Dropdown>
        {:else}
            <NavLi href="/">Home</NavLi>
        {/if}
    </NavUl>
</Navbar>

{@render children()}
