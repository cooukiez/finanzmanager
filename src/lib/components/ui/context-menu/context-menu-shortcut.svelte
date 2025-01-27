<script lang="ts">
    import type {WithElementRef} from "bits-ui";
    import type {HTMLAttributes} from "svelte/elements";
    import {cn} from "$lib/utils.js";

    let {
        ref = $bindable(null),
        class: className,
        children,
        ...restProps
    }: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
        {...restProps}
        bind:this={ref}
        class={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
>
	{@render children?.()}
</span>
