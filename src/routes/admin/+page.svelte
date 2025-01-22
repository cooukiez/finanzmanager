<script lang="ts">
    import {applyAction, enhance} from '$app/forms';

    import Alert from '$lib/components/Alert.svelte';
    import Users from "$lib/components/Users.svelte";

    import type {ActionData, PageData} from './$types';

    let {data, form}: { data: PageData, form: ActionData } = $props();
</script>

<div>
    <div>
        <h2>Admin View</h2>
    </div>
    <form
            action="?/create"
            method="POST"

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
            <input
                    name="name"
                    placeholder="Username"
                    type="text"
                    value={form?.name ?? ''}
                    required
            />
        </div>
        <div>
            <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={form?.email ?? ''}
                    required
            />
        </div>
        <div>
            <input
                    placeholder="Role"
                    name="role"
                    type="text"
                    value={form?.role?? ''}
                    required
            />
        </div>
        <div>
            <input
                    placeholder="Password"
                    name="password"
                    type="text"
                    value={form?.password ?? ''}
                    required
            />
        </div>
        <button>Add</button>
        {#if form?.error}
            <Alert message={form?.message}/>
        {/if}
    </form>

    <Users users={data?.users}/>
</div>