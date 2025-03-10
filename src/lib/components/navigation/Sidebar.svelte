<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Sidebar from "$lib/components/ui/sidebar";
  import { useSidebar } from "$lib/components/ui/sidebar";
  // noinspection ES6UnusedImports
  import * as Collapsible from "$lib/components/ui/collapsible";
  // noinspection ES6UnusedImports
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  import { ArrowLeftRight, ChevronDown, CreditCard, HandCoins, House, Menu } from "lucide-svelte";
  import { userAccounts, userDebt, userHomepage, userTransactions } from "$lib/config/routes";

  // Sidebar-Status
  const sidebar = useSidebar();

  // Links für die Sidebar
  const items = [
    {
      title: "Home",
      url: userHomepage,
      icon: House
    },
    {
      title: "Accounts",
      url: userAccounts,
      icon: CreditCard
    },
    {
      title: "Debt",
      url: userDebt,
      icon: HandCoins
    },
    {
      title: "Transactions",
      url: userTransactions,
      icon: ArrowLeftRight
    },
  ];
</script>

<!-- Die Sidebar-Komponente mit der Möglichkeit, sie über ein Icon einzuklappen -->
<Sidebar.Root collapsible="icon">
  <!-- Kopfbereich der Sidebar -->
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <!-- Menüschaltfläche zum Ein- und Ausklappen der Sidebar -->
        <Sidebar.MenuButton class="truncate" onclick={() => sidebar.toggle()}>
          <Menu />
          Menu
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>

  <!-- Hauptinhalt der Sidebar -->
  <Sidebar.Content>
    <!-- Eine zusammenklappbare Gruppe, die standardmäßig geöffnet ist -->
    <Collapsible.Root class="group/collapsible" open>
      <Sidebar.Group>
        <!-- Label für die Gruppe -->
        <Sidebar.GroupLabel>
          {#snippet child({ props })}
            <!-- Schaltfläche zum Ein- und Ausklappen des Bereichs -->
            <Collapsible.Trigger {...props}>
              Help
              <ChevronDown
                class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
              />
            </Collapsible.Trigger>
          {/snippet}
        </Sidebar.GroupLabel>

        <!-- Der Inhalt, der beim Öffnen sichtbar wird -->
        <Collapsible.Content>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              <!-- Durchlaufen der Elemente (items) und Anzeige als Menüeinträge -->
              {#each items as item (item.title)}
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton>
                    {#snippet child({ props })}
                      <!-- Verlinkung der einzelnen Menüeinträge -->
                      <a href={item.url} {...props}>
                        <!--suppress HtmlUnknownTag -->
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    {/snippet}
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              {/each}
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Collapsible.Content>
      </Sidebar.Group>
    </Collapsible.Root>
  </Sidebar.Content>
</Sidebar.Root>

