<script lang="ts">
    import {enhance} from "$app/forms";
    import type {ActionData} from "./$types";

    export let form: ActionData;
</script>

<div>
    <h1>Register</h1>
    <form method="post" use:enhance>
        <div>Email <input name="email" required type="email"/></div>
        <div>Username <input name="username" required/></div>
        <div>Password <input name="password" required type="password"/></div>
        <button>Register</button>
        <p>{form?.message ?? ""}</p>
    </form>

    <a href="/login">Login with existing account instead</a>
</div>
