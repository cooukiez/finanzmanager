<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  let { data }: { data: PageData } = $props();

</script>

<Tabs.Root value="account" class="w-[400px]">
  <Tabs.List class="grid w-full grid-cols-2">
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
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
          <div class="space-y-1">
            <Label for="username">Username</Label>
            <Input id="name" name="newname" value={data?.user?.name}/>
          </div>
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
          <div class="space-y-1">
            <Label for="current">Current password</Label>
            <Input name="currentpassword" id="current" type="password"/>
          </div>
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