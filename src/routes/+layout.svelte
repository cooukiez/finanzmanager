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

    import {loginPage, publicHomepage, registerPage} from "$lib/config/routes";

    let {data, children}: { data: LayoutData; children: Snippet } = $props();

    let navContainerClass = "top-0 sticky bg-background bg-opacity-75 backdrop-blur z-20";
    let navContainerClassNoBlur = "top-0 sticky bg-background";
    let navClass = "flex flex-row items-center justify-between px-4 py-2 gap-4 h-12";
    let navItemClass = "flex flex-row items-center";
</script>

<ModeWatcher/>

{#if data.user}
    {#if data.user.role === "user"}
        <Sidebar.Provider>
            <AppSidebar/>
            <main class="w-full">
                <div class={navContainerClass}>
                    <div class={navClass}>
                        <div class={navItemClass}>
                            <NavLinks routes={userRoutes}/>
                        </div>
                        <Profile/>
                    </div>
                    <Separator orientation="horizontal"/>
                </div>
                <div class="p-2">
                    {@render children?.()}
                </div>
            </main>
        </Sidebar.Provider>
    {/if}
    {#if data.user.role === "admin"}
        <div class={navContainerClass}>
            <div class={navClass}>
                <div class={navItemClass}>
                    <NavLinks routes={adminRoutes}/>
                </div>

                <Profile/>
            </div>
            <Separator orientation="horizontal"/>
        </div>
        <div>
            {@render children?.()}
        </div>
    {/if}
{:else}
    <div class={navContainerClass}>
        <div class={cn(navClass)}>
            <a class="flex flex-row items-baseline gap-2 cursor-pointer hover:text-muted-foreground"
               href={publicHomepage}>
                <p class="text-lg transition-colors">Finanzmanager</p>
                <p class="text-sm transition-colors">v0.1</p>
            </a>

            <NavLinks variant="minimal" routes={homepageRoutes}/>
            <div class="flex flex-row items-baseline">
                <a href={loginPage} class="hover:text-muted-foreground transition-colors text-sm font-bold">Login</a>
                <p class="mx-3 ml-2" style="font-size: 0.9rem">or</p>
                <Button href={registerPage}>Create an Account</Button>
            </div>
        </div>
    </div>
    <div>
        {@render children?.()}
    </div>
{/if}