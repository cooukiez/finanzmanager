<script lang="ts">
    import "../app.css";
    import type {Snippet} from "svelte";
    import type {LayoutData} from "./$types";

    import {ModeWatcher} from "mode-watcher";

    // noinspection ES6UnusedImports
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    // noinspection ES6UnusedImports
    import {Separator} from "$lib/components/ui/separator/index.js";

    import AppSidebar from "$lib/components/navigation/Sidebar.svelte";
    import NavLinks from "$lib/components/navigation/navlinks/NavLinks.svelte";
    import Profile from "$lib/components/navigation/Profile.svelte";

    import {userRoutes} from "$lib/config/user";
    import {adminRoutes} from "$lib/config/admin";

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
    {@render children?.()}
{/if}