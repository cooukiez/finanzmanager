<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";

  import { Input } from "$lib/components/ui/input/index.js";

  import { type Infer, superForm, type SuperValidated } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { accountCreateFormSchema, type AccountCreateFormSchema } from "./schema";
  import AccountSelect from "./components/AccountSelect.svelte";

  let {
    data
  }: { data: { form: SuperValidated<Infer<AccountCreateFormSchema>>; accountData:any} } =
    $props();

  let open = $state(false);
  const form = superForm(data.form, {
    validators: zodClient(accountCreateFormSchema),
    onResult: ({ result }) => {
      // check if submission successful and close dialog
      if (result.type === "success") {
        open = false;
      }
    },
    applyAction: true,
    resetForm: true
  });

  const {form: formData, enhance, reset} = form;
  let accountData = data?.accountData;
</script>

{#if accountData.length === 0}
<Card.Root class="w-full">
  <Card.Content class="flex flex-row justify-between items-center p-3 pl-5">
    <span class="text-muted-foreground text-sm"
    >You seem to be missing an account</span>
    <Popover.Root bind:open>
      <Popover.Trigger class={buttonVariants({ variant: "default" })}
      >Add Account
      </Popover.Trigger>
      <Popover.Content class="sm:max-w-[425px]">
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
                <Form.Label>Balenciaga</Form.Label>
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
      </Popover.Content>
    </Popover.Root>
  </Card.Content>
</Card.Root>

{:else}
<AccountSelect Accounts={accountData} />

<Card.Root class="w-full">
  <Card.Content class="flex flex-row justify-between items-center p-3 pl-5">
    <span class="text-muted-foreground text-sm"
    >Add new Account</span>
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
                <Form.Label>Balenciaga</Form.Label>
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
          <Dialog.Footer>
            <Button type="submit">Create</Button>
          </Dialog.Footer>
        </form>
      </Sheet.Content>
    </Sheet.Root>
  </Card.Content>
</Card.Root>
{/if}

