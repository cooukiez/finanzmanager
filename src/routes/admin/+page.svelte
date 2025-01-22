<script lang="ts">
	import { enhance, applyAction } from '$app/forms';

	import Alert from '$lib/components/Alert.svelte';
	import Users from "$lib/components/Users.svelte";

	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData, form: ActionData } = $props();
</script>

<div>
	<div>
		<h2>Admin View</h2>
	</div>
	<form
			method="POST"
			action="?/create"

			use:enhance={({ formElement }) => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					formElement.reset();
				}
				if (result.type === 'failure') {
					await applyAction(result);
				}
				update();
			};
		}}
	>
		<div>
			<label for="name">
				<span">Name</span>
			</label>

			<input
					type="text"
					name="name"
					value={form?.name ?? ''}
			/>
		</div>
		<div>
			<label for="email">
				<span>Email</span>
			</label>
			<input
					type="email"
					name="email"
					value={form?.email ?? ''}
			/>
		</div>
		<div>
			<label for="role">
				<span>Role</span>
			</label>

			<input
					type="text"
					name="role"
					value={form?.role?? ''}
			/>
		</div>
		<div>
			<label for="password">
				<span>Password</span>
			</label>

			<input
					type="text"
					name="password"
					value={form?.password ?? ''}
			/>
		</div>
		<button>Add</button>
		{#if form?.error}
			<Alert message={form?.message} />
		{/if}
	</form>

	<Users users={data?.users}/>
</div>