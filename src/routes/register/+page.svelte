<script lang="ts">
    import {enhance} from "$app/forms";
    import type {ActionData} from "./$types";

    export let form: ActionData;
</script>

<div>
    <h1>Register</h1>
    <form method="post" use:enhance>
        <div><input placeholder="Email" name="email" required type="email"/></div>
        <div><input placeholder="Username" name="username" required/></div>
        <div><input placeholder="Password" name="password" required type="password"/></div>
        <button>Register</button>
        <p>{form?.message ?? ""}</p>
    </form>

    <a href="/login">Login with existing account instead</a>
</div>
