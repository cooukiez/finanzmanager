<script lang="ts">
    import {enhance} from "$app/forms";
    import type {ActionData} from "../../../../.svelte-kit/types/src/routes";

    export let form: ActionData;
</script>

<div>
    <h1>Register</h1>
    <form method="post" use:enhance>
        <div><input placeholder="Email" name="email" required type="email"/></div>

        <div><input placeholder="Username" name="username" required type="text"/></div>

        <div><input placeholder="Password" name="password" required type="password"/></div>

        <button>Register</button>
        <p>{form?.message ?? ""}</p>
    </form>

    <a href="/auth/login">Login with existing account instead</a>
</div>
