<script lang="ts">
    import "../app.css";
    import type {Snippet} from "svelte";
    import type {LayoutData} from "./$types";

    import {
        Avatar, Button,
        Dropdown,
        DropdownDivider,
        DropdownHeader,
        DropdownItem,
        Navbar,
        NavBrand,
        NavLi,
        NavUl
    } from 'flowbite-svelte';
    import {ChevronDownOutline, BarsFromLeftOutline} from 'flowbite-svelte-icons';

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

<Navbar class="sticky top-0 z-20 border-b p-0" fluid={true}>
    <NavBrand href="/">
        {#if data.user}
            <div class="cursor-pointer justify-center items-center flex">
                <BarsFromLeftOutline class="w-9 h-9 p-1 me-3"/>
            </div>
        {:else}
            <div class="cursor-pointer justify-center items-center flex">
                <img src="favicon.png" class="w-9 h-9 p-1 me-3" alt="finanzmanager"/>
                <span class="self-center whitespace-nowrap">Finanzmanager</span>
            </div>
        {/if}
    </NavBrand>

    {#if data.user}
        <NavUl ulClass="flex flex-col md:flex-row p-2 mt-2 h-12 md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium">
            {#if data.user.role === "admin"}
                <NavLi href="/">Dashboard</NavLi>
            {:else}
                <NavLi class="cursor-pointer justify-center items-center flex">
                    Accounts
                    <ChevronDownOutline class="inline"/>
                </NavLi>
                <Dropdown placement="bottom" class="w-44 z-20 shadow-lg">
                    <DropdownItem href="/" class="w-full">Create new Account</DropdownItem>
                </Dropdown>

                <NavLi class="cursor-pointer justify-center items-center flex">
                    Groups
                    <ChevronDownOutline class="inline"/>
                </NavLi>
                <Dropdown placement="bottom" class="w-44 z-20 shadow-lg">
                    <DropdownItem href="/" class="w-full">Join new Group</DropdownItem>
                </Dropdown>
            {/if}

            <div class="cursor-pointer justify-center items-center flex">
                <Avatar class="w-7 h-7" id="avatar-menu"/>
            </div>
            <div>
                <Dropdown placement="bottom" triggeredBy="#avatar-menu">
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
        <NavUl ulClass="flex flex-col md:flex-row p-2 mt-2 h-12 md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium">
            <NavLi href="/">Home</NavLi>
        </NavUl>
    {/if}
</Navbar>

{@render children()}