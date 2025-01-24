<script lang="ts">
    import "../app.css";

    import type {Snippet} from "svelte";
    import type {LayoutData} from "./$types";

    import ExampleNav from "$lib/components/ui/nav/ExampleNav.svelte";
    import {ModeWatcher} from "mode-watcher";

    import {Button} from "$lib/components/ui/button";

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
</script>

<ModeWatcher/>

<ExampleNav/>

<div class="h-24"></div>

<Button variant="outline">Click me</Button>

{@render children()}
