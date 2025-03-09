<script lang="ts">
    // noinspection ES6UnusedImports
    import * as Command from "$lib/components/ui/command";
    // noinspection ES6UnusedImports
    import * as Popover from "$lib/components/ui/popover";

    import Check from "lucide-svelte/icons/check";
    import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
    import { tick } from "svelte";
    import { Button } from "$lib/components/ui/button";

    import { cn } from "$lib/utils.js";

    interface Account {
        name: string;
        balance?: number;
        transactions?: any[];
    }

    let {
        accounts,
        selectedValue = $bindable("")
    } = $props();

    let open = $state(false);
    let name = $state(selectedValue);
    let triggerRef = $state<HTMLButtonElement>(null!);

    $effect(() => {
        // When selectedValue prop changes, update the internal name state
        name = selectedValue;
    });

    $effect(() => {
        // When internal name state changes, update the selectedValue prop
        // This creates two-way binding
        if (name) {
            selectedValue = name;
        }
    });

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
                {name === "All Accounts" ? "All Accounts" : (accounts.find((a: Account) => a.name === name)?.name ?? accounts[0]?.name)}
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
                    {#each accounts as account}
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
                      onSelect={() => {
              name = "All Accounts";
              closeAndFocusTrigger();
            }}
                      value={"ALL"}
                    >
                        <Check
                          class={cn(
                "mr-2 size-4",
                name !== "All Accounts" && "text-transparent"
              )}
                        />
                        {"All Accounts"}
                    </Command.Item>
                </Command.Group>
            </Command.List>
        </Command.Root>
    </Popover.Content>
</Popover.Root>