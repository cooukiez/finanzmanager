<script lang="ts">
  import { type Infer, superForm, type SuperValidated } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  // noinspection ES6UnusedImports
  import * as Form from "$lib/components/ui/form/index.js";
  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card";

  import { Input } from "$lib/components/ui/input/index.js";

  import { loginFormSchema, type LoginFormSchema } from "../schema";

  let { data }: { data: { form: SuperValidated<Infer<LoginFormSchema>> } } =
    $props();

  const form = superForm(data.form, {
    validators: zodClient(loginFormSchema)
  });

  const { form: formData, enhance } = form;
</script>

<div class=" m-2 pt-20 flex flex-row justify-center items-center">
  <Card.Root class="w-96">
    <Card.Header>
      <Card.Title>Login</Card.Title>
      <Card.Description>Enter your account information</Card.Description>
    </Card.Header>
    <Card.Content>
      <form method="POST" use:enhance>
        <Form.Field {form} name="username">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Username</Form.Label>
              <Input {...props} bind:value={$formData.username} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="password">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Password</Form.Label>
              <Input
                {...props}
                bind:value={$formData.password}
                type="password"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Button class="mt-4">Submit</Form.Button>
      </form>
    </Card.Content>
  </Card.Root>
</div>
