<script lang="ts">
	import { enhance, applyAction } from '$app/forms';

	import Alert from '$lib/components/Alert.svelte';
	import Users from "$lib/components/Users.svelte";

	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData, form: ActionData } = $props();
</script>

<div class="w-full">
	<div class="flex justify-between items-center w-full">
		<h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">Admin View</h2>
	</div>
	<form
			method="POST"
			action="?/create"
			class="w-full flex flex-col"

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
		<div class="form-control w-full max-w-xs">
			<label for="name" class="label">
				<span class="label-text">Name</span>
			</label>

			<input
					type="text"
					name="name"
					value={form?.name ?? ''}
					class="input input-primary input-bordered w-full max-w-xs"
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="email" class="label">
				<span class="label-text">Email</span>
			</label>
			<input
					type="email"
					name="email"
					value={form?.email ?? ''}
					class="input input-primary input-bordered w-full max-w-xs"
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="role" class="label">
				<span class="label-text">Role</span>
			</label>

			<input
					type="text"
					name="role"
					value={form?.role?? ''}
					class="input input-primary input-bordered w-full max-w-xs"
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="password" class="label">
				<span class="label-text">Password</span>
			</label>

			<input
					type="text"
					name="password"
					value={form?.password ?? ''}
					class="input input-primary input-bordered w-full max-w-xs"
			/>
		</div>
		<button class="mt-4 btn btn-primary w-full max-w-xs">Add</button>
		{#if form?.error}
			<Alert message={form?.message} />
		{/if}
	</form>

	<Users users={data?.users}/>
</div>