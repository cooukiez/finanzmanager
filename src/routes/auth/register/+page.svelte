<script lang="ts">
  import { type Infer, superForm, type SuperValidated } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  // noinspection ES6UnusedImports
  import * as Form from "$lib/components/ui/form/index.js";
  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card";

  import { Input } from "$lib/components/ui/input/index.js";

  import { registerFormSchema, type RegisterFormSchema } from "../schema";

  let { data }: { data: { form: SuperValidated<Infer<RegisterFormSchema>> } } =
    $props();

  const form = superForm(data.form, {
    validators: zodClient(registerFormSchema)
  });

  const { form: formData, enhance } = form;
</script>

<div class="m-2 pt-20 flex flex-row justify-center items-center">
  <Card.Root class="w-96">
    <Card.Header>
      <Card.Title>Register</Card.Title> <!-- Titel des Formulars: Registrierung -->
      <Card.Description>Create new account</Card.Description> <!-- Beschreibung des Formulars -->
    </Card.Header>
    <Card.Content>
      <form method="POST" use:enhance> <!-- Das Formular wird mit POST übermittelt und mit Enhance optimiert -->
        <!-- E-Mail-Feld -->
        <Form.Field {form} name="email">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Email</Form.Label> <!-- Label für das E-Mail-Feld -->
              <Input {...props} bind:value={$formData.email} /> <!-- Bindet das Eingabefeld an die E-Mail-Daten -->
            {/snippet}
          </Form.Control>
          <Form.FieldErrors /> <!-- Zeigt Fehler für das E-Mail-Feld an -->
        </Form.Field>

        <!-- Benutzername-Feld -->
        <Form.Field {form} name="username">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Username</Form.Label> <!-- Label für das Benutzernamen-Feld -->
              <Input {...props} bind:value={$formData.username} />
              <!-- Bindet das Eingabefeld an die Benutzernamen-Daten -->
            {/snippet}
          </Form.Control>
          <Form.FieldErrors /> <!-- Zeigt Fehler für das Benutzernamen-Feld an -->
        </Form.Field>

        <!-- Passwort-Feld -->
        <Form.Field {form} name="password">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Password</Form.Label> <!-- Label für das Passwort-Feld -->
              <Input
                {...props}
                bind:value={$formData.password}
                type="password"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors /> <!-- Zeigt Fehler für das Passwort-Feld an -->
        </Form.Field>

        <!-- Absenden-Button -->
        <Form.Button class="mt-4">Submit</Form.Button> <!-- Button zum Absenden des Formulars -->
      </form>
    </Card.Content>
  </Card.Root>
</div>