<script lang="ts">
    import {enhance} from "$app/forms";
    import Alert from "$lib/components/Alert.svelte";
    import type {ActionData} from "../../../../.svelte-kit/types/src/routes";

    export let form: ActionData;
</script>

<div>
    <h1>Login</h1>
    <form method="post" use:enhance>
        <div><input placeholder="Email" name="email" type="email"/></div>
        <div><input placeholder="Password" name="password" type="password"/></div>
        <button>Login</button>
        {#if form?.error}
            <Alert message={form?.message}/>
        {/if}
    </form>

    <a href="/auth/register">Create an account instead</a>
</div>