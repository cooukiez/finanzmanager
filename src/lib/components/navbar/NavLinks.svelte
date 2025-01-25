<script lang="ts">
    import {cubicInOut} from "svelte/easing";
    import {crossfade} from "svelte/transition";
    import {cn} from "$lib/utils.js";
    import {ScrollArea} from "$lib/components/ui/scroll-area";
    import {page} from "$app/state";
    import {routes} from "$lib/config/user";

    const [send, receive] = crossfade({
        duration: 250,
        easing: cubicInOut,
    });

    let className: string | undefined | null = undefined;
    export {className as class};
</script>

<ScrollArea>
    <div class="flex flex-row items-center gap-4">
        <div
                {...$$restProps}
                class={cn("flex items-center overflow-y-auto pb-3 md:pb-0", className)}
        >
            {#each routes as route, index (index)}
                {@const isActive =
                page.url.pathname.startsWith(route.href) ||
                (page.url.pathname === "/" && index === 0)}

                <a
                        href={route.href}
                        data-sveltekit-noscroll
                        class={cn(
							"hover:text-primary relative flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors",
							isActive ? "text-primary font-medium" : "text-muted-foreground"
						)}
                >
                    {#if isActive}
                        <div
                                class="bg-muted absolute inset-0 rounded-full"
                                in:send={{ key: "activetab" }}
                                out:receive={{ key: "activetab" }}
                        ></div>
                    {/if}
                    <div class="relative">
                        {route.name}
                        {#if route.label}
								<span
                                        class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline"
                                >
									{route.label}
								</span>
                        {/if}
                    </div>
                </a>
            {/each}
        </div>
    </div>
</ScrollArea>