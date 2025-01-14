<script lang="ts">
  export let users: { id: string; name: string; email: string }[];  // Define the 'users' prop passed from server-side load
</script>

<main>
  <h1>All Users</h1>
  <ul>
    {#each users as user}
      <li>{user.name} - {user.email}</li>
    {/each}
  </ul>
</main>
