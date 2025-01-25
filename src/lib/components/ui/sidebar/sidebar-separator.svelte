<script lang="ts">
    import {Separator} from "$lib/components/ui/separator/index.js";
    import {cn} from "$lib/utils.js";
    import type {ComponentProps} from "svelte";

    let {
        ref = $bindable(null),
        class: className,
        ...restProps
    }: ComponentProps<typeof Separator> = $props();
</script>

<Separator
        {...restProps}
        bind:ref
        class={cn("bg-sidebar-border mx-2 w-auto", className)}
        data-sidebar="separator"
/>
