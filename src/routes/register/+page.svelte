<script>
	import { enhance } from "$app/forms";
</script>
<div class="w3-card w3-margin w3-padding">
	<h1>Register</h1>
	<form class="w3-container" method="post" use:enhance>
			<div class="w3-margin-bottom">
					Email <input class="w3-input w3-border" type="email" name="email">
			</div>
			<div class="w3-margin-bottom">
					Password <input class="w3-input w3-border" type="password" name="password">
			</div>
			<button class="w3-btn w3-black">Register</button>
	</form>
</div>