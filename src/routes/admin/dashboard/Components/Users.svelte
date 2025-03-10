<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { enhance } from "$app/forms";
  import { Save, Trash2 } from "lucide-svelte";

  export let users;

  const handleDelete = (userId: string) => {
    const form = new FormData();
    form.set("id", userId);
    fetch("?/delete", {
      method: "POST",
      body: form,
    }).then(() => location.reload());
  };
</script>

{#if users?.length > 0}
  <div class="space-y-4">
    {#each users as user (user.id)}
      <form
        method="POST"
        action="?/update"
        class="flex items-center space-x-4 p-4 rounded-lg shadow border border-gray-300"
        use:enhance={({ formElement }) => {
          return async ({ update }) => {
            const data = new FormData(formElement);
            const response = await fetch(formElement.action, {
              method: formElement.method,
              body: data,
            });
            if (response.ok) {
              update();
            }
          };
        }}
      >
        <input type="hidden" name="id" value={user.id} />

        <Input
          type="text"
          name="newname"
          bind:value={user.name}
          placeholder="Name"
          class="flex-1"
          required
        />

        <Input
          type="email"
          name="newemail"
          bind:value={user.email}
          placeholder="Email"
          class="flex-1"
          required
        />

        <Input
          type="text"
          name="newrole"
          bind:value={user.role}
          placeholder="Role"
          class="flex-1"
          required
        />

        <Button type="submit" variant="default" size="sm">
          <Save class="w-4 h-4 mr-1" /> Save
        </Button>

        <Button
          type="button"
          onclick={() => handleDelete(user.id)}
          size="sm"
          variant="destructive"
        >
          <Trash2 class="w-4 h-4 mr-1" /> Delete
        </Button>
      </form>
    {/each}
  </div>
{:else}
  <div class="text-center">No users found</div>
{/if}