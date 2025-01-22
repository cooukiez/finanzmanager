<script lang="ts">
    import "../app.css";
    import type {Snippet} from "svelte";
    import type {LayoutData} from "./$types";

    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';

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
    <NavBrand href="/">
        <img src="favicon.png" class="me-3 h-6 sm:h-9" alt="finanzmanager"/>
        <span>Finanzmanager</span>
    </NavBrand>
    <NavUl>
        {#if data.user}
            {#if data.user.role === "admin"}
                <a href="/admin">Home</a>
            {:else}
                <NavLi class="cursor-pointer">
                    Dropdown<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
                </NavLi>
                <Dropdown class="w-44 z-20">
                    <DropdownItem href="/">Dashboard</DropdownItem>
                    <DropdownItem href="/docs/components/navbar">Settings</DropdownItem>
                    <DropdownItem href="/">Earnings</DropdownItem>
                    <DropdownDivider/>
                    <DropdownItem href="/">Sign out</DropdownItem>
                </Dropdown>
            {/if}
            <button onclick="{handleLogout}">Logout</button>
        {:else}
            <a href="/">Home</a>
        {/if}
    </NavUl>
</Navbar>

{@render children()}
