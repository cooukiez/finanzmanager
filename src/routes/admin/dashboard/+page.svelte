<script lang="ts">
  // Import notwendiger Module und Komponenten
  import { applyAction, enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";
  import Alert from "./Components/Alert.svelte";
  import Users from "./Components/Users.svelte";

  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";

  // Definiere die Props, die vom Server kommen
  let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="container mx-auto py-10 space-y-8">
  <!-- Karte für das Admin-Dashboard -->
  <Card.Root class="w-full">
    <Card.Header>
      <Card.Title>Admin Dashboard</Card.Title>
      <Card.Description>Manage users and their permissions</Card.Description>
    </Card.Header>

    <Card.Content>
      <!-- Formular zum Erstellen eines neuen Benutzers -->
      <form
        action="?/create"
        method="POST"
        class="space-y-4"
        use:enhance={({ formElement }) => {
          return async ({ result, update }) => {
            if (result.type === "success") {
              formElement.reset(); // Formular nach erfolgreichem Absenden zurücksetzen
            }
            if (result.type === "failure") {
              await applyAction(result); // Fehlerbehandlung
            }
            update(); // UI aktualisieren
          };
        }}
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Eingabefeld für den Benutzernamen -->
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

          <!-- Eingabefeld für die E-Mail-Adresse -->
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

          <!-- Eingabefeld für die Rolle -->
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

          <!-- Eingabefeld für das Passwort -->
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

        <!-- Submit-Button zum Erstellen eines neuen Benutzers -->
        <div class="pt-2">
          <Button type="submit" variant="default">Add User</Button>
        </div>

        <!-- Fehleranzeige, falls vorhanden -->
        {#if form?.error}
          <Alert message={form?.message} />
        {/if}
      </form>
    </Card.Content>
  </Card.Root>

  <Separator />

  <!-- Karte für das User-Management -->
  <Card.Root class="w-full">
    <Card.Header>
      <Card.Title>User Management</Card.Title>
      <Card.Description>View and manage existing users</Card.Description>
    </Card.Header>
    <Card.Content>
      <!-- Komponente zum Anzeigen der Benutzerliste -->
      <Users users={data?.users} />
    </Card.Content>
  </Card.Root>
</div>