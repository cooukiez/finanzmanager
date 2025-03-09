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
    <!-- Wenn Kontodaten vorhanden sind, wird das AccountSelect-Komponenten angezeigt -->
    <AccountSelect accounts={accountData} bind:selectedValue={selectedAccountName} />

    <div class="flex flex-col gap-2 mt-4">
      <!-- Durchlaufe die accountData und zeige für jedes Konto eine Card-Komponente an -->
      {#each accountData as account}
        {#if selectedAccountName === "All Accounts" || account.name === selectedAccountName}
          <!-- Wenn "All Accounts" ausgewählt ist oder der Kontoname mit der Auswahl übereinstimmt, wird die Karte angezeigt -->
          <Card.Root class="w-full">
            <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <!-- Kontoinformationen anzeigen -->
                <Card.Title>{account.name}</Card.Title>
                <Card.Description>Account Transactions</Card.Description>
              </div>
            </Card.Header>
            <Card.Content>
              <!-- Zeige die Transaktionen des Kontos in einer DataTable an -->
              <DataTable columns={columns} data={account.transactions} formInput={data.form} accountId={account.id} />
            </Card.Content>
          </Card.Root>
        {/if}
      {/each}
    </div>
  {:else}
    <!-- Wenn keine Kontodaten vorhanden sind, wird eine Nachricht angezeigt -->
    <div class="m-3 my-2 text-muted-foreground">
      <span>Es scheint, dass du kein Konto hast. Erstelle eines auf der <a href={userAccounts}
                                                                           class="underline">Kontoseite</a>.</span>
    </div>
  {/if}
</div>

