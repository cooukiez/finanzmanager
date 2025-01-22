<script lang="ts">
    import "../app.css";
    import type {Snippet} from "svelte";
    import type {LayoutData} from "./$types";

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


<nav>
    {#if data.session}
        <a href="/home">Home</a>

        <button onclick="{handleLogout}">Logout</button>
    {:else}
        <a href="/">Home</a>
    {/if}
</nav>

{@render children()}
<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
