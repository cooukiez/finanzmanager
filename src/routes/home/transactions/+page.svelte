<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./column-def";

  import AccountSelect from "../accounts/components/AccountSelect.svelte";

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
          <DataTable columns={columns} data={account.transactions} form={data.form} />
        {/if}
      {/each}
    </div>
  {/if}
</div>
