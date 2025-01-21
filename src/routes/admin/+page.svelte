<script lang="ts">
	import { onMount } from "svelte";
	let users: any[] = [];
 	let editingID: null;

	onMount(async () => {
		try {
			const response = await fetch("/api/get_users");
			if (response.ok) {
				users = await response.json();
			} else {
				console.error("Failed to fetch users:", await response.text());
			}
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	});

</script>

<h1>Management</h1>

{#if users.length > 0}
	<ul>
		{#each users as user}
			<li>
				<form method="POST" >
					<i>[{user.id}]</i>
<!--	 				{#if editingID === user.id} -->
						<input type="text" name="newname" value={user.name}/>
						<input type="text" name="newemail" value={user.email}>
						<input type="text" name="newrole" value={user.role}/>
<!--					{:else}
						<i>[{user.name}]</i>
						<i>[{user.email}]</i>
						<i>[{user.role}]</i>
						<button on:click={editingID = user.id}>Update</button>
					{/if}  -->
					<input type="hidden" name="id" value={user.id}/>
					<button formaction="?/delete_user" type="submit">Delete User</button>
					<button on:click={editingID = null} formaction="?/update_user" type="submit">Done</button>
				</form>
			</li>
		{/each}
	</ul>
{:else}
	<p>No users found.</p>
{/if}
