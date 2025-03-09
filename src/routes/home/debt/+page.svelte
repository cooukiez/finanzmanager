<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Card, CardContent, CardFooter, CardHeader } from "$lib/components/ui/card/index.js";
  import { Check, X } from "lucide-svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<div class="container mx-auto p-6 space-y-12">
  <div class="flex flex-wrap gap-6">
    <section class="flex-1 max-w-lg">
      <h2 class="text-xl font-semibold mb-6">Request Money</h2>
      <Card>
        <form method="POST" action="?/createDebt" use:enhance>
          <CardContent>
            <div class="mb-4">
              <label for="username" class="block mb-2 font-semibold text-gray-700">Username</label>
              <Input id="username" name="username" placeholder="Enter a username" required />
            </div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-gray-700" for="amount">Amount</label>
              <Input id="amount" min="1" name="amount" placeholder="Enter amount" required step="0.01" type="number" />
            </div>
          </CardContent>
          <CardFooter class="flex justify-end">
            <Button type="submit" variant="default">Request Debt</Button>
          </CardFooter>
        </form>
      </Card>
    </section>

    {#if data.requestsAsDebtor.length > 0 || data.requestsAsCreditor.length > 0}
      <section class="flex-1">
        <h2 class="text-xl font-semibold mb-6">Pending Debts</h2>
        <div class="space-y-6">

          {#if data.requestsAsDebtor.length > 0}
            <div>
              <h3 class="text-lg font-semibold">Debts You Owe</h3>
              <div class="grid gap-4">
                {#each data.requestsAsDebtor as debt (debt.id)}
                  <Card>
                    <CardHeader>
                      <p>You owe <strong>{debt.creditor.name}</strong></p>
                    </CardHeader>
                    <CardContent class="text-gray-600">
                      <p>Amount: <strong>{debt.amount}€</strong></p>
                    </CardContent>
                    <CardFooter class="flex justify-end gap-2">
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

          {#if data.requestsAsCreditor.length > 0}
            <div>
              <h3 class="text-lg font-semibold">Debts Owed To You</h3>
              <div class="grid gap-4">
                {#each data.requestsAsCreditor as debt (debt.id)}
                  <Card>
                    <CardHeader>
                      <p><strong>{debt.debtor.name}</strong> owes you</p>
                    </CardHeader>
                    <CardContent class="text-gray-600">
                      <p>Amount: <strong>{debt.amount}€</strong></p>
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

  {#if data.acceptedDebts.length > 0 || (data.declinedDebtsAsCreditor ?? []).length > 0}
    <h2 class="text-xl font-semibold mb-4">Debts</h2>
    <section class="mt-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {#if data.acceptedDebts.length > 0}
          <section>
            <div class="grid gap-4">
              {#each data.acceptedDebts as debt (debt.id)}
                <Card class="bg-green-100">
                  <CardHeader>
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
                  </CardContent>
                  <CardFooter class="flex justify-between items-center">
            <span class="text-gray-500 text-sm">
              Status: Accepted
            </span>
                    {#if (debt.creditorId === data.user.id)}
                      <form method="POST" action="?/deleteDebt" use:enhance={() => ({ update }) => update({ reset: true })}>
                        <input type="hidden" name="debtId" value={debt.id} />
                        <Button
                          variant="default"
                          size="sm"
                          type="submit"
                        >
                          Debt payed by {debt.debtor.name}
                        </Button>
                      </form>
                    {/if}
                  </CardFooter>
                </Card>
              {/each}
            </div>
          </section>
        {/if}

        {#if (data.declinedDebtsAsCreditor ?? []).length > 0}
          <div>
            <div class="grid gap-4">
              {#each data.declinedDebtsAsCreditor ?? [] as debt (debt.id)}
                <Card class="bg-red-50">
                  <CardHeader>
                    <p><strong>{debt.debtor.name}</strong> declined to pay</p>
                  </CardHeader>
                  <CardContent>
                    <p>Amount: <strong>{debt.amount}€</strong></p>
                  </CardContent>
                  <CardFooter>
                    <p class="text-gray-500 text-sm">Status: Declined</p>
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
