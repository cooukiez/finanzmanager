<script>
	import { enhance } from "$app/forms";
</script>

<div>
	<h1>Register</h1>
	<form method="post" use:enhance>
		<div>Email <input type="email" name="email" /></div>
				<div>Password <input type="password" name="password" /></div>
		<button>Register</button>
	</form>

	<a href="/login">Login with existing account instead</a>
</div>