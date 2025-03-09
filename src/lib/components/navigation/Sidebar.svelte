<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Sidebar from "$lib/components/ui/sidebar";
  import { useSidebar } from "$lib/components/ui/sidebar";
  // noinspection ES6UnusedImports
  import * as Collapsible from "$lib/components/ui/collapsible";
  // noinspection ES6UnusedImports
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  import { CreditCard, ChevronDown, House, ArrowLeftRight, Menu, HandCoins } from "lucide-svelte";
  import {userAccounts, userDebt, userHomepage, userTransactions} from "$lib/config/routes";

  const sidebar = useSidebar();

  const items = [
    {
      title: "Home",
      url: userHomepage,
      icon: House
    },
    {
      title: "Transactions",
      url: userTransactions,
      icon: ArrowLeftRight
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
  ];
</script>

<Sidebar.Root collapsible="icon">
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton class="truncate" onclick={() => sidebar.toggle()}>
          <Menu />
          Menu
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    <Collapsible.Root class="group/collapsible" open>
      <Sidebar.Group>
        <Sidebar.GroupLabel>
          {#snippet child({ props })}
            <Collapsible.Trigger {...props}>
              Help
              <ChevronDown
                class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
              />
            </Collapsible.Trigger>
          {/snippet}
        </Sidebar.GroupLabel>
        <Collapsible.Content>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              {#each items as item (item.title)}
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton>
                    {#snippet child({ props })}
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
