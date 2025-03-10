<script lang="ts" module>
  import type { IndexedRoute } from "$lib";

  // Definiert Varianten für Navigationslinks
  const navLinksVariants = {
    default: {
      navLinksGroupClass: "flex items-center overflow-y-auto pb-3 md:pb-0",
      navLinkClass:
        "relative flex items-center justify-center px-4 h-7 rounded-full hover:text-primary transition-colors text-center text-sm",

      inactiveLink: "text-muted-foreground",
      activeLink: "text-primary font-medium",

      activeBackgroundClass: "bg-muted absolute inset-0 rounded-full",

      linkLabelClass:
        "ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline",
    },
    minimal: {
      navLinksGroupClass: "flex items-center overflow-y-auto pb-3 md:pb-0",
      navLinkClass:
        "flex items-center justify-center px-4 h-7 hover:text-primary transition-colors text-center text-sm",

      inactiveLink: "text-muted-foreground",
      activeLink: "text-primary font-medium",

      activeBackgroundClass: "",

      linkLabelClass:
        "ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline",
    },
  };

  export type NavLinksVariant = keyof typeof navLinksVariants;

  export type NavLinksProps = {
    class?: string;
    variant?: NavLinksVariant;
    routes: IndexedRoute[];
  };
</script>

<script lang="ts">
  import { page } from "$app/state";

  import { cn } from "$lib/utils.js";

  import { ScrollArea } from "$lib/components/ui/scroll-area";

  import { cubicInOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";

  // Definiert Animationen für das Ein- und Ausblenden aktiver Tabs
  const [send, receive] = crossfade({ duration: 250, easing: cubicInOut });

  // Setzt Standardwerte für die Eigenschaften
  let {
    class: className,
    variant = "default",
    routes,
    ...restProps
  }: NavLinksProps = $props();
</script>

<ScrollArea>
  <!-- Erstellt die Navigationslinks basierend auf der Variante -->
  <div
    {...restProps}
    class={cn(navLinksVariants[variant].navLinksGroupClass, className)}
  >
    {#each routes as route, index (index)}
      {@const isActive = page.url.pathname.startsWith(route.href)}
      <a
        href={route.href}
        data-sveltekit-noscroll
        class={cn(
          navLinksVariants[variant].navLinkClass,
          isActive
            ? navLinksVariants[variant].activeLink
            : navLinksVariants[variant].inactiveLink,
        )}
      >
        {#if isActive}
          <!-- Hintergrund für aktiven Link -->
          <div
            class={navLinksVariants[variant].activeBackgroundClass}
            in:send={{ key: "activetab" }}
            out:receive={{ key: "activetab" }}
          ></div>
        {/if}
        <div class="relative">
          {route.name}
          {#if route.label}
            <!-- Zusätzlicher Label für Links -->
            <span class={navLinksVariants[variant].linkLabelClass}
            >{route.label}</span
            >
          {/if}
        </div>
      </a>
    {/each}
  </div>
</ScrollArea>
