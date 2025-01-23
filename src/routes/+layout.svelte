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

<div class="relative">
    <Navbar class="relative top-0 w-full items-center z-20 border-b p-0" fluid={true}>
        <NavBrand href="/">
            {#if data.user}
                <img src="favicon.png" class="p-1 me-3 sm:h-9" alt="finanzmanager"/>
                <span class="self-center whitespace-nowrap">Finanzmanager</span>
            {:else}
                <img src="favicon.png" class="p-1 me-3 sm:h-9" alt="finanzmanager"/>
                <span class="self-center whitespace-nowrap">Finanzmanager</span>
            {/if}
        </NavBrand>

        {#if data.user}
            <NavUl ulClass="flex flex-col p-2 mt-2 h-12 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium">
                {#if data.user.role === "admin"}
                    <NavLi href="/">Dashboard</NavLi>
                {:else}
                    <NavLi class="cursor-pointer justify-center items-center flex">
                        Accounts
                        <ChevronDownOutline class="inline"/>
                    </NavLi>
                    <Dropdown placement="bottom" class="w-44 z-20 shadow-lg">
                        <DropdownItem href="/">Create new Account</DropdownItem>
                    </Dropdown>

                    <NavLi class="cursor-pointer justify-center items-center flex">
                        Groups
                        <ChevronDownOutline class="inline"/>
                    </NavLi>
                    <Dropdown placement="bottom" class="w-44 z-20 shadow-lg">
                        <DropdownItem href="/">Join new Group</DropdownItem>
                    </Dropdown>
                {/if}

                <div class="flex items-center">
                    <Avatar class="w-7 h-7" id="avatar-menu"/>
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
            </NavUl>
        {:else}
            <NavUl ulClass="flex p-2 mt-2 h-12 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium">
                <NavLi href="/">Home</NavLi>
            </NavUl>
        {/if}
    </Navbar>
    <div class="">
        {@render children()}
    </div>
</div>