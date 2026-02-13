<script lang="ts">
  // Importiere UI-Komponenten für Card, Tabs und Table
  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card/index.js";
  // noinspection ES6UnusedImports
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  // noinspection ES6UnusedImports
  import * as Table from "$lib/components/ui/table/index.js";

  // Importiere Button-Komponente und Pfeil-Icons
  import { Button } from "$lib/components/ui/button";
  import { ArrowDownLeft, ArrowUpRight } from "lucide-svelte";

  // Hole Account-Daten aus den übergebenen Props
  let { account } = $props<{ account: any }>();

  // Zustand für den aktuell ausgewählten Tab (Standard: "overview")
  let selectedTabValue = $state("overview");

  // Funktion zum Formatieren eines Datums; liefert "N/A", wenn kein Datum vorhanden ist
  function formatDate(date: any) {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  }
</script>

<!-- Hauptlayout: Card-Komponente, die Account-Details anzeigt -->
<div class="flex flex-col gap-4">
  <Card.Root class="w-full">
    <!-- Card-Kopfzeile mit Account-Namen und Beschreibung -->
    <Card.Header
      class="flex flex-row items-center justify-between space-y-0 pb-2"
    >
      <div>
        <Card.Title>{account.name}</Card.Title>
        <Card.Description>Account Overview</Card.Description>
      </div>
    </Card.Header>
    <Card.Content>
      <div class="flex flex-col space-y-6">
        <!-- Anzeige des aktuellen Kontostands -->
        <div>
          <div class="text-sm text-muted-foreground">Current Balance</div>
          <div class="text-3xl font-bold">{account.balance}€</div>
        </div>

        <!-- Tabs zum Umschalten zwischen Übersicht und Transaktionen -->
        <Tabs.Root
          onValueChange={(value) => (selectedTabValue = value)}
          value={selectedTabValue}
        >
          <Tabs.List class="grid grid-cols-2">
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="transactions">Transactions</Tabs.Trigger>
          </Tabs.List>

          <!-- Inhalt des "Overview"-Tabs -->
          <Tabs.Content class="py-4" value="overview">
            <div class="grid grid-cols-2 gap-4">
              {#if account.transactions && account.transactions.length > 0}
                <!-- Card für Einnahmen -->
                <Card.Root>
                  <Card.Header class="pb-2">
                    <Card.Title class="text-sm font-medium">Income</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <div class="flex items-center">
                      <ArrowUpRight class="mr-2 h-4 w-4 text-green-500" />
                      <span class="text-xl font-bold">{account.income}€</span>
                    </div>
                  </Card.Content>
                </Card.Root>

                <!-- Card für Ausgaben -->
                <Card.Root>
                  <Card.Header class="pb-2">
                    <Card.Title class="text-sm font-medium"
                    >Expenses
                    </Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <div class="flex items-center">
                      <ArrowDownLeft class="mr-2 h-4 w-4 text-red-500" />
                      <span class="text-xl font-bold">{account.expenses}€</span>
                    </div>
                  </Card.Content>
                </Card.Root>
              {/if}

              <!-- Card mit allgemeinen Account-Informationen -->
              <Card.Root class="col-span-2">
                <Card.Header class="pb-2">
                  <Card.Title class="text-sm font-medium"
                  >Account Information
                  </Card.Title>
                </Card.Header>
                <Card.Content>
                  <div class="text-sm space-y-1">
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Account Name:</span>
                      <span>{account.name}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Current Balance:</span
                      >
                      <span>{account.balance}€</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground"
                      >Transaction Count:</span
                      >
                      <span>{account.transactions?.length || 0}</span>
                    </div>
                  </div>
                </Card.Content>
              </Card.Root>
            </div>
          </Tabs.Content>

          <!-- Inhalt des "Transactions"-Tabs -->
          <Tabs.Content class="py-4" value="transactions">
            {#if account.transactions && account.transactions.length > 0}
              <div class="overflow-x-auto max-h-[300px]">
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head>Date</Table.Head>
                      <Table.Head>Type</Table.Head>
                      <Table.Head class="text-right">Amount</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {#each account.transactions as transaction}
                      <Table.Row>
                        <Table.Cell>{formatDate(transaction.date)}</Table.Cell>
                        <Table.Cell>{transaction.type}</Table.Cell>
                        <Table.Cell
                          class={`text-right ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.amount}€
                        </Table.Cell>
                      </Table.Row>
                    {/each}
                  </Table.Body>
                </Table.Root>
              </div>
            {:else}
              <!-- Nachricht, falls keine Transaktionen vorhanden sind -->
              <div class="text-center py-8 text-muted-foreground">
                No transactions available for this account
              </div>
            {/if}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </Card.Content>
    <!-- Card-Fußzeile mit Button zum Hinzufügen einer Transaktion -->
    <Card.Footer class="flex justify-end">
      <Button href="/home/transactions" size="sm" variant="outline"
      >Add Transaction
      </Button>
    </Card.Footer>
  </Card.Root>
</div>
