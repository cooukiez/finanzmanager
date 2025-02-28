<script lang="ts">
  import "../app.css";
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";

  import { cn } from "$lib/utils";

  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner";

  // noinspection ES6UnusedImports
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  // noinspection ES6UnusedImports
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Button } from "$lib/components/ui/button";

  import AppSidebar from "$lib/components/navigation/Sidebar.svelte";
  import NavLinks from "$lib/components/navigation/navlinks/NavLinks.svelte";
  import Profile from "$lib/components/navigation/Profile.svelte";
  import ThemeSwitcher from "$lib/components/navigation/ThemeSwitcher.svelte";

  import { userRoutes } from "$lib/config/user";
  import { adminRoutes } from "$lib/config/admin";
  import { homepageRoutes } from "$lib/config/homepage";

  import { loginPage, publicHomepage, registerPage } from "$lib/config/routes";

  import { toast } from "svelte-sonner";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let navContainerClass =
    "top-0 sticky bg-background bg-opacity-75 backdrop-blur z-20";
  let navClass =
    "flex flex-row items-center justify-between px-4 py-2 gap-4 h-12";
  let navItemClass = "flex flex-row items-center";

  function not_implemented() {
    toast.error("This feature is not implemented.", {
      description: "Please contact support for further information."
    });
  }
</script>

<ModeWatcher />
<Toaster />

<ContextMenu.Root>
  <ContextMenu.Trigger>
    {#if data.user}
      {#if data.user.role === "user"}
        <Sidebar.Provider open={false}>
          <AppSidebar />
          <main class="w-screen">
            <div class={navContainerClass}>
              <div class={navClass}>
                <div class={navItemClass}>
                  <NavLinks routes={userRoutes} />
                </div>
                <Profile />
              </div>
              <Separator orientation="horizontal" />
            </div>
            <div class="w-full h-full p-2">
              500<br>
              Internal Error
              <!--{@render children?.()}-->
            </div>
          </main>
        </Sidebar.Provider>
      {/if}
      {#if data.user.role === "admin"}
        <main class="w-screen">
          <div class={navContainerClass}>
            <div class={navClass}>
              <div class={navItemClass}>
                <NavLinks routes={adminRoutes} />
              </div>

              <Profile />
            </div>
            <Separator orientation="horizontal" />
          </div>
          <div class="w-full h-full p-2">
            {@render children?.()}
          </div>
        </main>
      {/if}
    {:else}
      <div class="w-screen">
        <div class={navContainerClass}>
          <div class={cn(navClass)}>
            <a
              class="flex flex-row items-center gap-2 cursor-pointer"
              href={publicHomepage}
            >
              <img src="/favicon.png" alt="" class="w-7 h-7" />
              <div
                class="flex flex-row items-baseline gap-2 hover:text-muted-foreground"
              >
                <p class="text-lg transition-colors">Finanzmanager</p>
                <p class="text-sm transition-colors">v0.1</p>
              </div>
            </a>

            <NavLinks variant="minimal" routes={homepageRoutes} />

            <div class="flex flex-row items-baseline">
              <a
                href={loginPage}
                class="hover:text-muted-foreground transition-colors text-sm font-bold"
              >Login</a
              >
              <p class="mx-3 ml-2" style="font-size: 0.9rem">or</p>
              <Button href={registerPage}>Create an Account</Button>
            </div>
          </div>
        </div>
        <div class="w-full h-full p-2">
          {@render children?.()}
        </div>
        <div class="fixed bottom-4 right-4 z-20">
          <ThemeSwitcher />
        </div>
      </div>
    {/if}
  </ContextMenu.Trigger>
  <ContextMenu.Content class="w-64">
    <ContextMenu.Item inset onclick={not_implemented}>
      Back
      <ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Item inset onclick={not_implemented}>
      Forward
      <ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Item inset onclick={not_implemented}>
      Reload
      <ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Sub>
      <ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
      <ContextMenu.SubContent class="w-48">
        <ContextMenu.Item onclick={not_implemented}>
          Save Page
          <ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Item onclick={not_implemented}
        >Inspect Element
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item onclick={not_implemented}
        >Developer Tools
        </ContextMenu.Item>
      </ContextMenu.SubContent>
    </ContextMenu.Sub>
  </ContextMenu.Content>
</ContextMenu.Root>
