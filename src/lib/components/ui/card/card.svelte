<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  type $$Props = HTMLAttributes<HTMLDivElement>;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  {...$$restProps}
  class={cn("bg-card text-card-foreground rounded-xl border shadow", className)}
  on:click
  on:focusin
  on:focusout
  on:mouseenter
  on:mouseleave
>
  <slot />
</div>
