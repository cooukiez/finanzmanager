<script lang="ts">
  // Importiere UI-Komponenten für Command und Popover
  // noinspection ES6UnusedImports
  import * as Command from "$lib/components/ui/command";
  // noinspection ES6UnusedImports
  import * as Popover from "$lib/components/ui/popover";

  // Importiere Icons für Checkbox und Dropdown-Pfeil
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  // Importiere Sveltes tick-Funktion, um nach DOM-Updates zu warten
  import { tick } from "svelte";
  // Importiere Button-Komponente und Utility-Funktion zur Klassenkombination
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils.js";

  // Definiert das Interface für einen Account
  interface Account {
    name: string;
    balance?: number;
    transactions?: any[];
  }

  // Hole Props: eine Liste von Accounts und einen bindbaren initialen Wert
  let { accounts, selectedValue = $bindable("") } = $props();

  // Lokaler Zustand: ob das Popover offen ist, der aktuell ausgewählte Name,
  // und eine Referenz zum Trigger-Button
  let open = $state(false);
  let name = $state(selectedValue);
  let triggerRef = $state<HTMLButtonElement>(null!);

  // Synchronisiere den lokalen Namen mit dem übergebenen Wert
  $effect(() => {
    name = selectedValue;
  });

  // Aktualisiere den bindbaren Wert, wenn sich der Name ändert
  $effect(() => {
    if (name) {
      selectedValue = name;
    }
  });

  // Schließt das Popover und fokussiert den Trigger-Button
  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }
</script>

<!-- Popover-Komponente zur Auswahl eines Accounts -->
<Popover.Root bind:open>
  <!-- Button als Trigger für das Popover -->
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        variant="outline"
        class="w-[200px] justify-between"
        {...props}
        role="combobox"
        aria-expanded={open}
      >
        <!-- Zeige den aktuell ausgewählten Accountnamen oder den ersten Account an -->
        {name === "All Accounts"
          ? "All Accounts"
          : (accounts.find((a: Account) => a.name === name)?.name ??
            accounts[0]?.name)}
        <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>

  <!-- Inhalt des Popovers mit Such- und Auswahlfunktion -->
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <!-- Suchfeld für Accounts -->
      <Command.Input placeholder="Search Accounts..." />
      <Command.List>
        <!-- Nachricht, falls keine Accounts gefunden werden -->
        <Command.Empty>No Account found.</Command.Empty>
        <Command.Group>
          <!-- Erstelle für jeden Account ein auswählbares Item -->
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
                  name !== account.name && "text-transparent",
                )}
              />
              {account.name}
            </Command.Item>
          {/each}
          <!-- Option, um "All Accounts" auszuwählen -->
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
                name !== "All Accounts" && "text-transparent",
              )}
            />
            {"All Accounts"}
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
