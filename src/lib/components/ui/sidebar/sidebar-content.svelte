<script lang="ts">
    import type {HTMLAttributes} from "svelte/elements";
    import type {WithElementRef} from "bits-ui";
    import {cn} from "$lib/utils.js";

    let {
        ref = $bindable(null),
        class: className,
        children,
        ...restProps
    }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<div
        {...restProps}
        bind:this={ref}
        class={cn(
		"flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
		className
	)}
        data-sidebar="content"
>
    {@render children?.()}
</div>
