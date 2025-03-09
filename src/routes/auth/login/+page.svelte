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
    $props(); // Holt die Formulardaten aus den Props

  const form = superForm(data.form, {
    validators: zodClient(loginFormSchema)
  });

  const { form: formData, enhance } = form;
</script>

<div class=" m-2 pt-20 flex flex-row justify-center items-center">
  <!-- Container für das Login-Formular -->
  <Card.Root class="w-96">
    <Card.Header>
      <Card.Title>Login</Card.Title> <!-- Titel des Formulars -->
      <Card.Description>Enter your account information</Card.Description> <!-- Beschreibung des Formulars -->
    </Card.Header>
    <Card.Content>
      <!-- Formular wird mit der POST-Methode gesendet, und enhance wird verwendet, um das Formular zu verbessern -->
      <form method="POST" use:enhance>
        <!-- Formularfeld für den Benutzernamen -->
        <Form.Field {form} name="username">
          <Form.Control>
            {#snippet children({ props })}
              <!-- Label und Eingabefeld für den Benutzernamen -->
              <Form.Label>Username</Form.Label>
              <Input {...props} bind:value={$formData.username} /> <!-- Bindet den Benutzernamen an das Formular -->
            {/snippet}
          </Form.Control>
          <Form.FieldErrors /> <!-- Zeigt Fehlermeldungen für das Feld an -->
        </Form.Field>

        <!-- Formularfeld für das Passwort -->
        <Form.Field {form} name="password">
          <Form.Control>
            {#snippet children({ props })}
              <!-- Label und Eingabefeld für das Passwort -->
              <Form.Label>Password</Form.Label>
              <Input
                {...props}
                bind:value={$formData.password}
                type="password" /> <!-- Bindet das Passwort an das Formular und setzt den Typ auf "password" -->
            {/snippet}
          </Form.Control>
          <Form.FieldErrors /> <!-- Zeigt Fehlermeldungen für das Passwortfeld an -->
        </Form.Field>

        <!-- Absende-Button für das Formular -->
        <Form.Button class="mt-4">Submit</Form.Button>
      </form>
    </Card.Content>
  </Card.Root>
</div>