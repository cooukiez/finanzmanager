<script lang="ts">
    import { onMount } from 'svelte';
    let users: any[] = [];

    // Fetch users from the API endpoint
    onMount(async () => {
        try {
            const response = await fetch('/api/user');
            if (response.ok) {
                users = await response.json();
            } else {
                console.error('Failed to fetch users:', await response.text());
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });
</script>

<h1>Users List</h1>

{#if users.length > 0}
    <ul>
        {#each users as user}
            <li>
                <strong>{user.name}</strong> (<i>{user.email}</i>)}
            </li>
        {/each}
    </ul>
{:else}
    <p>No users found.</p>
{/if}