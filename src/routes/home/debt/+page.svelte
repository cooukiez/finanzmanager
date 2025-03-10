<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Card, CardContent, CardFooter, CardHeader } from "$lib/components/ui/card/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Check, X } from "lucide-svelte";
  import type { PageData } from "./$types";

  // Zugriff auf die Daten, die an die Komponente übergeben werden
  let { data }: { data: PageData } = $props();

  let description = $state("");

</script>

<div class="container m-0 p-6 space-y-12 w-full">
  <div class="flex flex-wrap gap-6 w-full">
    <section class="flex-1 max-w-lg">
      <h2 class="text-xl font-semibold mb-6">Request Money</h2>
      <Card>
        <!-- Formular zum Anfordern einer Schuld -->
        <form method="POST" action="?/createDebt" use:enhance>
          <CardContent>
            <div class="mb-4">
              <label for="username" class="block mb-2 font-semibold">Username</label>
              <Input id="username" name="username" placeholder="Enter a username" required />
            </div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold" for="amount">Amount</label>
              <Input id="amount" name="amount" placeholder="Enter amount" required step="0.10" type="number" />
            </div>
            <div class="mb-4">
              <label for="description" class="block mb-2 font-semibold">Description</label>
              <Textarea
                id="description"
                name="description"
                bind:value={description}
                placeholder="Add a short description (optional, max. 20 characters)"
                class="w-full"
              ></Textarea>
              <p
                class="text-sm"
                class:text-red-500={description.length > 20}
                class:text-gray-500={description.length <= 20}
              >
                {description.length}/20 characters used
              </p>
            </div>
          </CardContent>
          <CardFooter class="flex justify-end">
            <Button type="submit" variant="default">Request Debt</Button>
          </CardFooter>
        </form>
      </Card>
    </section>

    <!-- Anzeige ausstehender Schulden -->
    {#if data.requestsAsDebtor.length > 0 || data.requestsAsCreditor.length > 0}
      <section class="flex-1">
        <h2 class="text-xl font-semibold mb-6">Pending Debts</h2>
        <div class="space-y-6">

          <!-- Schulden, die der Nutzer zu zahlen hat -->
          {#if data.requestsAsDebtor.length > 0}
            <div>
              <div class="grid gap-4">
                {#each data.requestsAsDebtor as debt (debt.id)}
                  <Card>
                    <CardHeader>
                      <p>You owe <strong>{debt.creditor.name}</strong></p>
                    </CardHeader>
                    <CardContent>
                      <p>Amount: <strong>{debt.amount}€</strong></p>
                      {#if debt.description}
                        <p>Description: <strong>{debt.description}</strong></p>
                      {/if}
                    </CardContent>
                    <CardFooter class="flex justify-between items-center">
                      <span class="text-gray-500 text-sm">
                        Status: Pending
                      </span>
                      <!-- Buttons zur Annahme oder Ablehnung der Schuld -->
                      <form method="POST" action="?/handleRequest" use:enhance={() => ({ update }) => update({ reset: true })}>
                        <input type="hidden" name="debtId" value={debt.id} />
                        <Button class="bg-green-500 hover:bg-green-600 text-white" size="sm" name="action" type="submit" value="accept">
                          <Check class="mr-1" /> Accept
                        </Button>
                        <Button class="bg-red-500 hover:bg-red-600 text-white" size="sm" name="action" type="submit" value="decline">
                          <X class="mr-1" /> Decline
                        </Button>
                      </form>
                    </CardFooter>
                  </Card>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Schulden, die andere dem Nutzer schulden -->
          {#if data.requestsAsCreditor.length > 0}
            <div>
              <div class="grid gap-4">
                {#each data.requestsAsCreditor as debt (debt.id)}
                  <Card>
                    <CardHeader>
                      <p><strong>{debt.debtor.name}</strong> owes you</p>
                    </CardHeader>
                    <CardContent class="text-gray-600">
                      <p>Amount: <strong>{debt.amount}€</strong></p>
                      {#if debt.description}
                        <p>Description: <strong>{debt.description}</strong></p>
                      {/if}
                    </CardContent>
                    <CardFooter class="text-gray-500 text-sm">
                      Status: Pending
                    </CardFooter>
                  </Card>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </section>
    {/if}
  </div>

  <!-- Anzeige akzeptierter oder abgelehnter Schulden -->
  {#if data.acceptedDebts.length > 0 || (data.declinedDebtsAsCreditor ?? []).length > 0}
    <h2 class="text-xl font-semibold mb-4">Debts</h2>
    <section class="mt-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {#if data.acceptedDebts.length > 0}
          <section>
            <div class="grid gap-4">
              {#each data.acceptedDebts as debt (debt.id)}
                <Card class="bg-green-100">
                  <CardHeader class="text-black">
                    <p>
                      {#if debt.debtorId === data.user.id}
                        You owe <strong>{debt.creditor.name}</strong>
                      {:else}
                        <strong>{debt.debtor.name}</strong> owes you
                      {/if}
                    </p>
                  </CardHeader>
                  <CardContent class="text-gray-600">
                    <p>Amount: <strong>{debt.amount}€</strong></p>
                    {#if debt.description}
                      <p>Description: <strong>{debt.description}</strong></p>
                    {/if}
                  </CardContent>
                  <CardFooter class="flex justify-between items-center">
                    <span class="text-gray-500 text-sm">
                      Status: Accepted
                    </span>
                    <!-- Button zum Löschen einer beglichenen Schuld -->
                    {#if (debt.creditorId === data.user.id)}
                      <form method="POST" action="?/deleteDebt" use:enhance={() => ({ update }) => update({ reset: true })}>
                        <input type="hidden" name="debtId" value={debt.id} />
                        <Button
                          variant="default"
                          size="sm"
                          type="submit"
                          class="m-0"
                        >
                          Debt payed by {debt.debtor.name}
                        </Button>
                      </form>
                    {:else }
                      <Button class="invisible m-0 bg-gray-300 text-xs" type="submit" variant="default" size="sm" disabled>
                        Placeholder
                      </Button>
                    {/if}
                  </CardFooter>
                </Card>
              {/each}
            </div>
          </section>
        {/if}

        <!-- Liste der vom Schuldner abgelehnten Schulden -->
        {#if (data.declinedDebtsAsCreditor ?? []).length > 0}
          <div>
            <div class="grid gap-4">
              {#each data.declinedDebtsAsCreditor ?? [] as debt (debt.id)}
                <Card class="bg-red-50 relative">
                  <CardHeader class="text-black">
                    <p><strong>{debt.debtor.name}</strong> declined to pay</p>
                  </CardHeader>
                  <CardContent class="text-gray-600">
                    <p>Amount: <strong>{debt.amount}€</strong></p>
                    {#if debt.description}
                      <p>Description: <strong>{debt.description}</strong></p>
                    {/if}
                  </CardContent>
                  <CardFooter class="flex justify-between items-center">
                    <p class="text-gray-500 text-sm">Status: Declined</p>
                    <!-- Button zum löschen abgelehnter Schulden -->
                    <form method="POST" action="?/deleteDebt" use:enhance={() => ({ update }) => update({ reset: true })}>
                      <input type="hidden" name="debtId" value={debt.id} />
                      <Button
                        variant="default"
                        size="sm"
                        type="submit"
                        class="m-0"
                      >
                        Remove
                      </Button>
                    </form>
                  </CardFooter>
                </Card>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </section>
  {/if}
</div>