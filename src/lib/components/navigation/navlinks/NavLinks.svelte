<script lang="ts">
    import {cn} from "$lib/utils.js";
    import {page} from "$app/state";

    import {ScrollArea} from "$lib/components/ui/scroll-area";

    import {cubicInOut} from "svelte/easing";
    import {crossfade} from "svelte/transition";

    import type {IndexedRoute} from "$lib";


    const [send, receive] = crossfade({
        duration: 250,
        easing: cubicInOut,
    });

    let navLinksGroupClass = "flex items-center overflow-y-auto pb-3 md:pb-0";
    let navLinkClass = "relative flex items-center justify-center px-4 h-7 rounded-full hover:text-primary transition-colors text-center text-sm";

    let inactiveLink = "text-muted-foreground";
    let activeLink = "text-primary font-medium";

    let activeBackgroundClass = "bg-muted absolute inset-0 rounded-full";

    let linkLabelClass = "ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline";

    export type NavLinksProps = {
        class?: string;
        routes: IndexedRoute[];
    };

    let {
        class: className,
        routes: routes,
        ...restProps
    }: NavLinksProps = $props();
</script>

<ScrollArea>
    <div {...restProps} class={cn(navLinksGroupClass, className)}>
        {#each routes as route, index (index)}
            {@const isActive =
            page.url.pathname.startsWith(route.href) ||
            (page.url.pathname === "/" && index === 0)}

            <a href={route.href}
               data-sveltekit-noscroll
               class={cn(navLinkClass,
                  isActive ? activeLink : inactiveLink
               )}
            >
                {#if isActive}
                    <div class={activeBackgroundClass}
                         in:send={{ key: "activetab" }}
                         out:receive={{ key: "activetab" }}
                    ></div>
                {/if}
                <div class="relative">
                    {route.name}
                    {#if route.label}
                        <span class={linkLabelClass}>
                            {route.label}
                        </span>
                    {/if}
                </div>
            </a>
        {/each}
    </div>
</ScrollArea>