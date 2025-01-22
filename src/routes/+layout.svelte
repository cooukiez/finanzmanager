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


<Navbar class="">
    <NavBrand href="/">
        {#if data.user}
            <span>Finanzmanager</span>
        {:else}
            <img src="favicon.png" class="me-3 h-6 sm:h-9" alt="finanzmanager"/>
            <span class="self-center whitespace-nowrap">Finanzmanager</span>
        {/if}

    </NavBrand>

    {#if data.user}
        <div class="flex items-center md:order-2">
            <Avatar class="w-8 h-8" id="avatar-menu"/>
        </div>
        <Dropdown placement="bottom" triggeredBy="#avatar-menu">
            <DropdownHeader>
                <span class="block truncate text-sm">{data.user.name}</span>
                <span class="block truncate text-sm">{data.user.email}</span>
            </DropdownHeader>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownDivider/>
            <DropdownItem onclick={handleLogout}>Sign out</DropdownItem>
        </Dropdown>

        <NavUl>
            {#if data.user.role === "admin"}
                <NavLi href="/">Dashboard</NavLi>
            {:else}
                <NavLi class="cursor-pointer justify-center items-center flex">
                    Accounts
                    <ChevronDownOutline class="inline"/>
                </NavLi>
                <Dropdown  placement="bottom" class="w-44 z-20 shadow-lg">
                    <DropdownItem href="/">Create new Account</DropdownItem>
                </Dropdown>

                <NavLi class="cursor-pointer justify-center items-center flex">
                    Groups
                    <ChevronDownOutline class="inline"/>
                </NavLi>
                <Dropdown  placement="bottom" class="w-44 z-20 shadow-lg">
                    <DropdownItem href="/">Join new Group</DropdownItem>
                </Dropdown>
            {/if}
        </NavUl>
    {:else}
        <NavUl>
            <NavLi href="/">Home</NavLi>
        </NavUl>
    {/if}
</Navbar>

{@render children()}
