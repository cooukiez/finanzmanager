<script lang="ts">
    import Check from "lucide-svelte/icons/check";
    import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
    import { tick } from "svelte";
    import * as Command from "$lib/components/ui/command";
    import * as Popover from "$lib/components/ui/popover";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button";
    import { Separator } from "$lib/components/ui/separator";
    import { cn } from "$lib/utils.js";
    import AccountInfo from "./AccountInfo.svelte";

    interface Account {
        name: string;
        balance?: number;
        transactions?: any[];
    }

    let { Accounts } = $props<{ Accounts: Account[] }>();

    let open = $state(false);
    let name = $state("");
    let triggerRef = $state<HTMLButtonElement>(null!);

    const selectedValue = $derived(
        name === "All Accounts" ? "All Accounts" : (Accounts.find((a: Account) => a.name === name)?.name ?? Accounts[0]?.name)
    );

    function closeAndFocusTrigger() {
        open = false;
        tick().then(() => {
            triggerRef.focus();
        });
    }
</script>

<Popover.Root bind:open>
    <Popover.Trigger bind:ref={triggerRef}>
        {#snippet child({ props })}
            <Button
                variant="outline"
                class="w-[200px] justify-between"
                {...props}
                role="combobox"
                aria-expanded={open}
            >
                {selectedValue}
                <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
        {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-[200px] p-0">
        <Command.Root>
            <Command.Input placeholder="Search Accounts..." />
            <Command.List>
                <Command.Empty>No Account found.</Command.Empty>
                <Command.Group>
                    {#each Accounts as account}
                        <Command.Item
                                value={account.name}
                                onSelect={() => {
                                name = account.name;
                                closeAndFocusTrigger();
                               }}
                        >
                            <Check
                                  class={cn(
                                 "mr-2 size-4",
                                 name !== account.name && "text-transparent"
                                )}
                            />
                            {account.name}
                        </Command.Item>
                    {/each}
                    <Command.Item
                            value={"ALL"}
                            onSelect={() => {
                                name = "All Accounts";
                                closeAndFocusTrigger();
                               }}
                    >
                        <Check
                                class={cn(
                                 "mr-2 size-4",
                                 name !== "All Accounts"&& "text-transparent"
                                )}
                        />
                        {"All Accounts"}
                    </Command.Item>
                </Command.Group>
            </Command.List>
        </Command.Root>
    </Popover.Content>
</Popover.Root>


<div class="flex flex-col gap-2">
    {#each Accounts as account}
        {#if selectedValue === "All Accounts" || account.name === selectedValue}
             <AccountInfo account={account} />
             <Separator />
        {/if}
    {/each}
</div>