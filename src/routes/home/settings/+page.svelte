<script lang="ts">
  // Importieren von UI-Komponenten aus der Bibliothek
  // noinspection ES6UnusedImports
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  // Zugriff auf die übergebenen Daten
  let { data }: { data: PageData } = $props();
</script>

<!-- Tab-Komponente mit zwei Tabs: Account und Passwort -->
<Tabs.Root value="account" class="w-[400px]">
  <Tabs.List class="grid w-full grid-cols-2">
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>

  <!-- Inhalt des Account-Tabs -->
  <Tabs.Content value="account">
    <Card.Root>
      <form
        method="POST"
        action="?/update_info"
        use:enhance={() => {
          return ({ update }) => update({ reset: false });
        }}
      >
        <Card.Header>
          <Card.Title>Account</Card.Title>
          <Card.Description>
            Make changes to your account here. Click save when you're done.
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-2">
          <!-- Eingabefeld für den Benutzernamen -->
          <div class="space-y-1">
            <Label for="username">Username</Label>
            <Input id="name" name="newname" value={data?.user?.name}/>
          </div>
          <!-- Eingabefeld für die E-Mail-Adresse -->
          <div class="space-y-1">
            <Label for="email">Email</Label>
            <Input type="email" id="email" name="newemail" value={data?.user?.email}/>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button type="submit">Save changes</Button>
        </Card.Footer>
      </form>
    </Card.Root>
  </Tabs.Content>

  <!-- Inhalt des Passwort-Tabs -->
  <Tabs.Content value="password">
    <Card.Root>
      <form
        method="POST"
        action="?/update_pass"
        use:enhance={() => {
          return ({ update }) => update({ reset: false });
        }}
      >
        <Card.Header>
          <Card.Title>Password</Card.Title>
          <Card.Description>
            Change your password here. After saving, you'll be logged out.
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-2">
          <!-- Eingabefeld für das aktuelle Passwort -->
          <div class="space-y-1">
            <Label for="current">Current password</Label>
            <Input name="currentpassword" id="current" type="password"/>
          </div>
          <!-- Eingabefeld für das neue Passwort -->
          <div class="space-y-1">
            <Label for="new">New password</Label>
            <Input name="newpassword" id="new" type="password" />
          </div>
        </Card.Content>
        <Card.Footer>
          <Button type="submit">Save password</Button>
        </Card.Footer>
      </form>
    </Card.Root>
  </Tabs.Content>
</Tabs.Root>