<script lang="ts">
  import { enhance } from "$app/forms";

  export let users;
</script>

{#if users.length > 0}
  <ul>
    {#each users as user}
      <form
        method="POST"
        use:enhance={() => {
          return ({ update }) => update({ reset: false });
        }}
      >
        <input type="text" name="newname" value={user.name} />
        <input type="text" name="newemail" value={user.email} />
        <input type="text" name="newrole" value={user.role} />

        <input type="hidden" name="id" value={user.id} />
        <button formaction="?/delete" type="submit">Delete</button>
        <button formaction="?/update" type="submit">Update</button>
      </form>
    {/each}
  </ul>

{:else}
  <p>No users found.</p>
{/if}
