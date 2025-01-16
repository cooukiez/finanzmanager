<!-- <script lang="ts">
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
{/if} -->

<!-- 
<script>
    import { enhance } from "$app/forms";
</script>

<div class="w3-card w3-margin w3-padding">
    <h1>Login</h1>
    <foerm class="w3-container" method="post" use:enhance>
        <div class="w3-margin-bottom">
            Email <input class="w3-input w3-border" type="email" name="email">
        </div>
        <div class="w3-margin-bottom">
            Password <input class="w3-input w3-border" type="password" name="password">
        </div>
        <button class="w3-btn w3-black">Login</button>
    </form>
</div> -->

<script>
    import { enhance } from "$app/forms";
</script>
<div class="w3-card w3-margin w3-padding">
    <h1>Register</h1>
    <form class="w3-container" method="post" use:enhance>
        <div class="w3-margin-bottom">
            Email <input class="w3-input w3-border" type="email" name="email">
        </div>
        <div class="w3-margin-bottom">
            Password <input class="w3-input w3-border" type="password" name="password">
        </div>
        <button class="w3-btn w3-black">Register</button>
    </form>
</div>