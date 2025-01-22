<script lang="ts">
	import { enhance } from "$app/forms";
	import Alert from "$lib/components/Alert.svelte";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<div>
	<h1>Login</h1>
	<form method="post" use:enhance>
		<div>Email <input type="email" name="email" /></div>
		<div>Password <input type="password" name="password" /></div>
		<button>Login</button>
		{#if form?.error}
			<Alert message={form?.message} />
		{/if}
	</form>

	<a href="/register">Create an account instead</a>
</div>