<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
    import { Button } from "$lib/components/ui/button";
    import {ArrowDownLeft, ArrowUpRight} from "lucide-svelte";

    let { account } = $props<{ account: any }>();

    let selectedTabValue = $state("overview");

    function formatDate(date:any) {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString();
    }

</script>

<div class="flex flex-col gap-4 mt-4">
<Card.Root class="w-full">
    <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
            <Card.Title>{account.name}</Card.Title>
            <Card.Description>Account Overview</Card.Description>
        </div>
    </Card.Header>
    <Card.Content>
        <div class="flex flex-col space-y-6">
            <div>
                <div class="text-sm text-muted-foreground">Current Balance</div>
                <div class="text-3xl font-bold">{account.balance}€</div>
            </div>

            <Tabs.Root value={selectedTabValue} onValueChange={(value) => selectedTabValue = value}>
                <Tabs.List class="grid grid-cols-2">
                    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                    <Tabs.Trigger value="transactions">Transactions</Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="overview" class="py-4">
                    <div class="grid grid-cols-2 gap-4">
                        {#if account.transactions && account.transactions.length > 0}
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

                            <Card.Root>
                                <Card.Header class="pb-2">
                                    <Card.Title class="text-sm font-medium">Expenses</Card.Title>
                                </Card.Header>
                                <Card.Content>
                                    <div class="flex items-center">
                                        <ArrowDownLeft class="mr-2 h-4 w-4 text-red-500" />
                                        <span class="text-xl font-bold">{account.expenses}€</span>
                                    </div>
                                </Card.Content>
                            </Card.Root>
                        {/if}

                        <Card.Root class="col-span-2">
                            <Card.Header class="pb-2">
                                <Card.Title class="text-sm font-medium">Account Information</Card.Title>
                            </Card.Header>
                            <Card.Content>
                                <div class="text-sm space-y-1">
                                    <div class="flex justify-between">
                                        <span class="text-muted-foreground">Account Name:</span>
                                        <span>{account.name}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-muted-foreground">Current Balance:</span>
                                        <span>{account.balance}€</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-muted-foreground">Transaction Count:</span>
                                        <span>{account.transactions?.length || 0}</span>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card.Root>
                    </div>
                </Tabs.Content>

                <Tabs.Content value="transactions" class="py-4">
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
                                            <Table.Cell class={`text-right ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                                                {transaction.amount}€
                                            </Table.Cell>
                                        </Table.Row>
                                    {/each}
                                </Table.Body>
                            </Table.Root>
                        </div>
                    {:else}
                        <div class="text-center py-8 text-muted-foreground">
                            No transactions available for this account
                        </div>
                    {/if}
                </Tabs.Content>
            </Tabs.Root>
        </div>
    </Card.Content>
    <Card.Footer class="flex justify-end">
        <Button variant="outline" size="sm">Add Transaction</Button>
    </Card.Footer>
</Card.Root>
</div>