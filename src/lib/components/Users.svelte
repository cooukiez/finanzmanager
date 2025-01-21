<script lang="ts">
    import {applyAction, enhance} from '$app/forms';
    export let users;
    for (const user of users) {
        console.log(user.name);
        console.log(user.email);
        console.log(user.role);
    }
</script>

{#if users.length > 0}
    <ul>
        {#each users as user}
            <form method="POST"
                  use:enhance={() => {
            return ({ update }) => update({ reset: false });
            }}
            >
                <!--                     {#if editingID === user.id} -->
                <input type="text" name="newname" value={user.name} />
                <input type="text" name="newemail" value={user.email}/>
                <input type="text" name="newrole" value={user.role}/>
                <!--                    {:else}
                                        <i>[{user.name}]</i>
                                        <i>[{user.email}]</i>
                                        <i>[{user.role}]</i>
                                        <button on:click={editingID = user.id}>Update</button>
                                    {/if}  -->
                <input type="hidden" name="id" value={user.id}/>
                <button formaction="?/delete" type="submit">Delete</button>
                <button formaction="?/update" type="submit">Update</button>
            </form>
        {/each}
    </ul>
{:else}
    <p>No users found.</p>
{/if}

