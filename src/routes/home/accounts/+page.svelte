<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";

  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card/index.js";
  // noinspection ES6UnusedImports
  import * as Form from "$lib/components/ui/form/index.js";
  // noinspection ES6UnusedImports
  import * as Sheet from "$lib/components/ui/sheet/index.js";

  import { Input } from "$lib/components/ui/input/index.js";

  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { accountCreateFormSchema } from "./schema";
  import AccountSelect from "./components/AccountSelect.svelte";
  import AccountInfo from "./components/AccountInfo.svelte";

  const { data } = $props();

  let open = $state(false);
  let selectedAccountName = $state("All Accounts");

  const form = superForm(data.form, {
    validators: zodClient(accountCreateFormSchema),
    onResult: ({ result }) => {
      if (result.type === "success") {
        open = false;
      }
    }
  });

  const { form: formData, enhance } = form;

  const accountData = $derived(data.accountData);
</script>


{#if accountData.length !== 0}
  <AccountSelect accounts={accountData} bind:selectedValue={selectedAccountName} />
  <div class="flex flex-col mt-4 mb-2 gap-2">
    {#each accountData as account}
      {#if selectedAccountName === "All Accounts" || account.name === selectedAccountName}
        <AccountInfo account={account} />
      {/if}
    {/each}
  </div>
{/if}

<Card.Root class="w-full">
  <Card.Content class="flex flex-row justify-between items-center p-3 pl-5">

    {#if accountData.length === 0}
      <span class="text-muted-foreground text-sm">You seem to be missing an account</span>
    {:else}
      <span class="text-muted-foreground text-sm">Add new Account</span>
    {/if}

    <Sheet.Root bind:open>
      <Sheet.Trigger class={buttonVariants({ variant: "default" })}
      >Add Account
      </Sheet.Trigger>
      <Sheet.Content class="sm:max-w-[425px]">
        <Sheet.Header>
          <Sheet.Title>Add Account</Sheet.Title>
          <Sheet.Description>
            Add a new account to manage your finances
          </Sheet.Description>
        </Sheet.Header>
        <form method="POST" use:enhance>
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
          <Sheet.Footer>
            <Button type="submit">Create</Button>
          </Sheet.Footer>
        </form>
      </Sheet.Content>
    </Sheet.Root>
  </Card.Content>
</Card.Root>