<script lang="ts">
	import { onMount } from "svelte";
	let users: any[] = [];

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

	const updateUser = async (userId: number, updatedName: string) => {
		try {
			const response = await fetch(`/api/update_user/${userId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: updatedName }),
			});
			if (response.ok) {
				const updatedUser = await response.json();
				const index = users.findIndex((user) => user.id === userId);
				if (index !== -1) {
					users[index] = updatedUser;
				}
			} else {
				console.error("Failed to update user:", await response.text());
			}
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};
</script>

<h1>Management</h1>

{#if users.length > 0}
	<ul>
		{#each users as user}
			<li>
				[{user.id}]
				<strong>
					<input type="text" value={user.name} />

					<!-- on:input={(e) => updateUser(user.id, e.target.value)} -->
				</strong>
				(<i>{user.email}</i>)
				<form method="POST" action="?/delete_user">
					<input type="hidden" name="email" value={user.email} />
					<button type="submit">Delete User</button>
				</form>
			</li>
		{/each}
	</ul>
{:else}
	<p>No users found.</p>
{/if}
