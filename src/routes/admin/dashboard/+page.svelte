<script lang="ts">
    import {applyAction, enhance} from '$app/forms';

    import Alert from '$lib/components/Alert.svelte';
    import Users from "$lib/components/Users.svelte";

    import type {ActionData, PageData} from '../../../../.svelte-kit/types/src/routes';

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
                    required
                    type="text"
                    value={form?.name ?? ''}
            />
        </div>
        <div>
            <input
                    name="email"
                    placeholder="Email"
                    required
                    type="email"
                    value={form?.email ?? ''}
            />
        </div>
        <div>
            <input
                    name="role"
                    placeholder="Role"
                    required
                    type="text"
                    value={form?.role?? ''}
            />
        </div>
        <div>
            <input
                    name="password"
                    placeholder="Password"
                    required
                    type="text"
                    value={form?.password ?? ''}
            />
        </div>
        <button>Add</button>
        {#if form?.error}
            <Alert message={form?.message}/>
        {/if}
    </form>

    <Users users={data?.users}/>
</div>