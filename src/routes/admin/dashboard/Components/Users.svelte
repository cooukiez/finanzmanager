<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Trash2, Save } from "lucide-svelte"; // Icons for actions

  import { enhance } from "$app/forms";

  export let users;
</script>

{#if users?.length > 0}
  <div class="rounded-lg border border-gray-200 shadow-md overflow-x-auto max-h-[calc(100vh-200px)]">
    <table class="w-full text-left border-collapse">
      <!-- Table Head -->
      <thead class="bg-gray-50">
      <tr>
        <th class="font-semibold text-gray-700 px-4 py-3">Name</th>
        <th class="font-semibold text-gray-700 px-4 py-3">Email</th>
        <th class="font-semibold text-gray-700 px-4 py-3">Role</th>
        <th class="font-semibold text-gray-700 px-4 py-3 text-right">Actions</th>
      </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
      {#each users as user (user.id)}
        <tr class="bg-white hover:bg-gray-50">
          <!-- Name Cell -->
          <td class="px-4 py-3">
            <Input
              type="text"
              bind:value={user.name}
              name="newname"
              placeholder="Enter name"
              class="w-full"
            />
          </td>

          <td class="px-4 py-3">
            <Input
              type="email"
              bind:value={user.email}
              name="newemail"
              placeholder="Enter email"
              class="w-full"
            />
          </td>

          <td class="px-4 py-3">
            <Input
              type="text"
              bind:value={user.role}
              name="newrole"
              placeholder="Enter role"
              class="w-full"
            />
          </td>

          <td class="px-4 py-3 text-right">
            <div class="flex items-center justify-end gap-2">

              <form method="POST" action="?/update" use:enhance>
                <input type="hidden" name="id" value={user.id} />

                <input type="hidden" name="newname" value={user.name} />
                <input type="hidden" name="newemail" value={user.email} />
                <input type="hidden" name="newrole" value={user.role} />

                <Button type="submit" size="sm" variant="default">
                  <Save class="w-4 h-4 mr-1" /> Update
                </Button>
              </form>

              <form method="POST" action="?/delete" use:enhance>
                <input type="hidden" name="id" value={user.id} />
                <Button type="submit" size="sm" variant="destructive">
                  <Trash2 class="w-4 h-4 mr-1" /> Delete
                </Button>
              </form>
            </div>
          </td>
        </tr>
      {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p class="text-gray-500 text-center">No users found.</p>
{/if}