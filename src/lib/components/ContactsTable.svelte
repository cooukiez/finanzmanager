<script>
	import { enhance } from '$app/forms';
	export let users;
</script>

<div class="overflow-x-auto w-full mt-6">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>
				</th>
				<th>Name</th>
				<th>Email</th>
				<th>Role</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<tr>
					<th>
						<label>
							<input type="checkbox" class="checkbox" />
						</label>
					</th>
					<td>
						<div class="font-bold">{user.name}</div>
					</td>
					<td>{user.email}</td>
					<td>{user.role}</td>
					<th>
						<form method="POST" action="?/delete" use:enhance>
							<input type="hidden" name="id" hidden value={user.id} />
							<button class="btn btn-error text-white btn-xs">Delete</button>
						</form>
					</th>
				</tr>
			{/each}
		</tbody>
		<!-- foot -->
		<tfoot>
			<tr>
				<th />
				<th>Name</th>
				<th>Email</th>
				<th>Role</th>
				<th />
			</tr>
		</tfoot>
	</table>
</div>
