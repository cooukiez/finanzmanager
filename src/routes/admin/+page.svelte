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
            <label for="name">
                <span>Name</span>
            </label>

            <input
                    name="name"
                    type="text"
                    value={form?.name ?? ''}
            />
        </div>
        <div>
            <label for="email">
                <span>Email</span>
            </label>
            <input
                    name="email"
                    type="email"
                    value={form?.email ?? ''}
            />
        </div>
        <div>
            <label for="role">
                <span>Role</span>
            </label>

            <input
                    name="role"
                    type="text"
                    value={form?.role?? ''}
            />
        </div>
        <div>
            <label for="password">
                <span>Password</span>
            </label>

            <input
                    name="password"
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