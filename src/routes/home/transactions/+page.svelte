<script lang="ts">
  import DataTable from "./components/data-table.svelte";
  import { columns } from "./column-def";

  import AccountSelect from "../accounts/components/AccountSelect.svelte";

  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card/index.js";
  import { userAccounts } from "$lib/config/routes";

  let { data } = $props();

  let selectedAccountName = $state("All Accounts");

  const accountData = $derived(data.accountData);
</script>

<div>
  {#if accountData.length !== 0}
    <AccountSelect accounts={accountData} bind:selectedValue={selectedAccountName} />

    <div class="flex flex-col gap-2 mt-4">
      {#each accountData as account}
        {#if selectedAccountName === "All Accounts" || account.name === selectedAccountName}
          <Card.Root class="w-full">
            <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <Card.Title>{account.name}</Card.Title>
                <Card.Description>Account Transactions</Card.Description>
              </div>
            </Card.Header>
            <Card.Content>
              <DataTable columns={columns} data={account.transactions} formInput={data.form} accountId={account.id} />
            </Card.Content>
          </Card.Root>
        {/if}
      {/each}
    </div>
  {:else}
    <div class="m-3 my-2 text-muted-foreground">
      <span>You seem to be missing an account. Create one on the <a href={userAccounts}
                                                                    class="underline">accounts page</a>.</span>
    </div>
  {/if}
</div>
