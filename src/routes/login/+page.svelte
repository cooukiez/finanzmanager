<script>
	import { enhance } from "$app/forms";
</script>

<div>
	<h1>Login</h1>

	<!-- Todo: add form validation -->

	<form method="post" use:enhance>
		<div>Email <input type="email" name="email" /></div>
		<div>Password <input type="password" name="password" /></div>
		<button>Login</button>
	</form>

	<a href="/register">Create an account instead</a>
</div>