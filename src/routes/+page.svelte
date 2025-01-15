<script lang="ts">
  type User = { id: string; name: string; email: string }; // Define the user type
  let users: User[] = [];

  async function getNames() {
    const response = await fetch('/api/users'); // Fetch from the API route
    users = await response.json(); // Parse the JSON response
  }

  // Automatically fetch user data when the page loads
  getNames();
</script>

<main>
  <h1>All Users</h1>
  <ul>
    {#each users as user}
      <li>{user.name} - {user.email}</li>
    {/each}
  </ul>
</main>
