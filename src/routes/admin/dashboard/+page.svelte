<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";
  import Alert from "./components/Alert.svelte";
  import Users from "./components/Users.svelte";

  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import * as Card from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";

  let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="container mx-auto py-10 space-y-8">
  <Card.Root class="w-full">
    <Card.Header>
      <Card.Title>Admin Dashboard</Card.Title>
      <Card.Description>Manage users and their permissions</Card.Description>
    </Card.Header>

    <Card.Content>
      <form
              action="?/create"
              method="POST"
              class="space-y-4"
              use:enhance={({ formElement }) => {
          return async ({ result, update }) => {
            if (result.type === "success") {
              formElement.reset();
            }
            if (result.type === "failure") {
              await applyAction(result);
            }
            update();
          };
        }}
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="name">Username</Label>
            <Input
                    id="name"
                    name="name"
                    placeholder="Enter username"
                    required
                    value={form?.name ?? ""}
            />
          </div>

          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    required
                    value={form?.email ?? ""}
            />
          </div>

          <div class="space-y-2">
            <Label for="role">Role</Label>
            <Input
                    id="role"
                    name="role"
                    placeholder="Enter user role"
                    required
                    value={form?.role ?? ""}
            />
          </div>

          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    required
                    value={form?.password ?? ""}
            />
          </div>
        </div>

        <div class="pt-2">
          <Button type="submit" variant="default">Add User</Button>
        </div>

        {#if form?.error}
          <Alert message={form?.message} />
        {/if}
      </form>
    </Card.Content>
  </Card.Root>

  <Separator />

  <Card.Root class="w-full">
    <Card.Header>
      <Card.Title>User Management</Card.Title>
      <Card.Description>View and manage existing users</Card.Description>
    </Card.Header>
    <Card.Content>
      <Users users={data?.users} />
    </Card.Content>
  </Card.Root>
</div>
