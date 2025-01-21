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
				<form method="POST" action="?/update_user" on:submit={editingID = null}>
<!-- 				{#if editingID === user.id}  -->
						<i>[{user.id}]</i>
						<input type="text" name="newname" value={user.name}/>
						<input type="text" name="newemail" value={user.email}>
						<input type="text" name="newrole" value={user.role}/>
						<input type="hidden" name="id" value={user.id}/>
						<button type="submit">Done</button>
<!--				{:else}
						<i>[{user.id}]</i>
						<i>[{user.name}]</i>
						<i>[{user.email}]</i>
						<i>[{user.role}]</i>
						<button on:click={() => {editingID = user.id}}>Edit User</button>
					{/if}	-->
				</form>
				<form name="deleteform" method="POST" action="?/delete_user">
					<input type="hidden" name="id" value={user.id} />
					<button type="submit">Delete User</button>
				</form>
			</li>
		{/each}
	</ul>
{:else}
	<p>No users found.</p>
{/if}
