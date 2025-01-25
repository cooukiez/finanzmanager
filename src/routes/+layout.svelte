<script lang="ts">
    import "../app.css";
    import type {Snippet} from "svelte";
    import type {LayoutData} from "./$types";

    import {cn} from "$lib/utils";

    import {ModeWatcher} from "mode-watcher";

    // noinspection ES6UnusedImports
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    // noinspection ES6UnusedImports
    import {Separator} from "$lib/components/ui/separator/index.js";
    import {Button} from "$lib/components/ui/button";

    import AppSidebar from "$lib/components/navigation/Sidebar.svelte";
    import NavLinks from "$lib/components/navigation/navlinks/NavLinks.svelte";
    import Profile from "$lib/components/navigation/Profile.svelte";

    import {userRoutes} from "$lib/config/user";
    import {adminRoutes} from "$lib/config/admin";
    import {homepageRoutes} from "$lib/config/homepage";

    import {publicHomepage, registerPage} from "$lib/config/routes";

    let {data, children}: { data: LayoutData; children: Snippet } = $props();

    let navClass = "mx-4 my-2 flex flex-row items-center justify-between gap-4";
    let navItemClass = "flex flex-row items-center";
</script>

<ModeWatcher/>

{#if data.user}
    {#if data.user.role === "user"}
        <Sidebar.Provider>
            <AppSidebar/>
            <main class="w-full">
                <div class={navClass}>
                    <div class={navItemClass}>
                        <NavLinks routes={userRoutes}/>
                    </div>
                    <Profile/>
                </div>
                <Separator orientation="horizontal"/>
                <div>
                    {@render children?.()}
                </div>
            </main>
        </Sidebar.Provider>
    {:else}
        <div class={navClass}>
            <div class={navItemClass}>
                <NavLinks routes={adminRoutes}/>
            </div>

            <Profile/>
        </div>
        <Separator orientation="horizontal"/>
        <div>
            {@render children?.()}
        </div>
    {/if}
{:else}
    <div class={cn(navClass, "h-10")}>
        <a class="flex flex-row items-baseline gap-2 cursor-pointer hover:text-muted-foreground transition-colors"
           href={publicHomepage}>
            <p class="text-lg">Finanzmanager</p>
            <p class="text-sm">v0.1</p>
        </a>

        <NavLinks variant="minimal" routes={homepageRoutes}/>
        <Button href={registerPage}>Create an Account</Button>
    </div>
    {@render children?.()}
{/if}