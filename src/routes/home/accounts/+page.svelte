<script lang="ts">
  // Importiere Button-Komponente und Varianten für Buttons
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";

  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card/index.js";
  // noinspection ES6UnusedImports
  import * as Form from "$lib/components/ui/form/index.js";
  // noinspection ES6UnusedImports
  import * as Sheet from "$lib/components/ui/sheet/index.js";

  // Importiere Input-Komponente
  import { Input } from "$lib/components/ui/input/index.js";

  // Importiere superForm-Funktion und Zod-Adapter für Formularvalidierung
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { accountCreateFormSchema } from "./schema";

  // Importiere Komponenten für Account-Auswahl und -Informationen
  import AccountSelect from "./components/AccountSelect.svelte";
  import AccountInfo from "./components/AccountInfo.svelte";

  // Hole übergebene Daten aus den Props
  const { data } = $props();

  // Lokaler Zustand: ob das Sheet geöffnet ist und welcher Account ausgewählt wurde
  let open = $state(false);
  let selectedAccountName = $state("All Accounts");

  // Initialisiere das Formular mit Validierung und Ergebnis-Callback
  const form = superForm(data.form, {
    validators: zodClient(accountCreateFormSchema),
    onResult: ({ result }) => {
      if (result.type === "success") {
        open = false; // Schließt das Sheet bei erfolgreichem Submit
      }
    },
  });

  // Destrukturiere das Formularobjekt und die Svelte-Enhance-Funktion
  const { form: formData, enhance } = form;

  // Leite die Account-Daten aus den übergebenen Daten ab
  const accountData = $derived(data.accountData);
</script>

{#if accountData.length !== 0}
  <!-- Zeige die Account-Auswahl, wenn Accounts vorhanden sind -->
  <AccountSelect
    accounts={accountData}
    bind:selectedValue={selectedAccountName}
  />
  <div class="flex flex-col mt-4 mb-2 gap-2">
    {#each accountData as account}
      <!-- Zeige Account-Informationen basierend auf der Auswahl -->
      {#if selectedAccountName === "All Accounts" || account.name === selectedAccountName}
        <AccountInfo {account} />
      {/if}
    {/each}
  </div>
{/if}

<!-- Card-Komponente für den "Add Account"-Bereich -->
<Card.Root class="w-full">
  <Card.Content class="flex flex-row justify-between items-center p-3 pl-5">
    {#if accountData.length === 0}
      <!-- Nachricht, wenn keine Accounts existieren -->
      <span class="text-muted-foreground text-sm"
      >You seem to be missing an account</span
      >
    {:else}
      <span class="text-muted-foreground text-sm">Add new Account</span>
    {/if}

    <!-- Sheet-Komponente für das Formular zum Hinzufügen eines Accounts -->
    <Sheet.Root bind:open>
      <Sheet.Trigger class={buttonVariants({ variant: "default" })}>
        Add Account
      </Sheet.Trigger>
      <Sheet.Content class="sm:max-w-[425px]">
        <Sheet.Header>
          <Sheet.Title>Add Account</Sheet.Title>
          <Sheet.Description>
            Add a new account to manage your finances
          </Sheet.Description>
        </Sheet.Header>
        <!-- Formular zum Erstellen eines neuen Accounts mit SvelteKit Superforms -->
        <form method="POST" use:enhance>
          <!-- Formularfeld für den Accountnamen -->
          <Form.Field {form} name="name">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Account name</Form.Label>
                <Input {...props} bind:value={$formData.name} />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>
          <!-- Formularfeld für den Initial Balance -->
          <Form.Field {form} name="balance">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Initial Balance</Form.Label>
                <Input
                  {...props}
                  bind:value={$formData.balance}
                  type="number"
                />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>
          <!-- Footer des Sheets mit dem Submit-Button -->
          <Sheet.Footer>
            <Button type="submit">Create</Button>
          </Sheet.Footer>
        </form>
      </Sheet.Content>
    </Sheet.Root>
  </Card.Content>
</Card.Root>
