<script lang="ts">
    import "../app.css";
    import type {Snippet} from "svelte";
    import type {LayoutData} from "./$types";

    import {ModeWatcher} from "mode-watcher";

    // noinspection ES6UnusedImports
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";

    // noinspection ES6UnusedImports
    import {Separator} from "$lib/components/ui/separator/index.js";

    import AppSidebar from "$lib/components/Sidebar.svelte";
    import NavLinks from "$lib/components/navbar/NavLinks.svelte";
    import Profile from "$lib/components/navbar/Profile.svelte";

    let {data, children}: { data: LayoutData; children: Snippet } = $props();
</script>

{#if data.user}
    {#if data.user.role === "user"}
        <ModeWatcher/>
        <Sidebar.Provider>
            <AppSidebar/>
            <main class="w-full">
                <div class="mx-4 my-2 flex flex-row items-center justify-between gap-4">
                    <div class="flex flex-row">
                        <NavLinks/>
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
        <div class="mx-4 my-2 flex flex-row items-center justify-between gap-4">
            <div class="flex flex-row">
                <NavLinks/>
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