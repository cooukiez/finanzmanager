<script>import "../app.css";
import type {Snippet} from "svelte";
import type {LayoutData} from "./$types";

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



{@render children()}
