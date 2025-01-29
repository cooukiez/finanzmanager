<script lang="ts">
  import { Avatar as AvatarPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let {
    class: className,
    src,
    alt,
    ref = $bindable(null),
    ...restProps
  }: AvatarPrimitive.ImageProps = $props();
</script>

<AvatarPrimitive.Image
  {...restProps}
  {alt}
  bind:ref
  class={cn("aspect-square h-full w-full", className)}
  {src}
/>
