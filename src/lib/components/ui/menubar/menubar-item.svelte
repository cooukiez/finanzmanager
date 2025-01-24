<script lang="ts">
    import {Menubar as MenubarPrimitive} from "bits-ui";
    import {cn} from "$lib/utils.js";

    type $$Props = MenubarPrimitive.ItemProps & {
        inset?: boolean;
    };
    type $$Events = MenubarPrimitive.ItemEvents;

    let className: $$Props["class"] = undefined;
    export let inset: $$Props["inset"] = undefined;
    export {className as class};
</script>

<MenubarPrimitive.Item
        {...$$restProps}
        class={cn(
		"data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		inset && "pl-8",
		className
	)}
        on:click
        on:focusin
        on:focusout
        on:keydown
        on:pointerdown
        on:pointerleave
        on:pointermove
>
    <slot/>
</MenubarPrimitive.Item>
