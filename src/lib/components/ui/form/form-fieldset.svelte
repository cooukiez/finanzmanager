<script lang="ts" module>
  import type { FormPath as _FormPath } from "sveltekit-superforms";

  type T = Record<string, unknown>;
  type U = _FormPath<T>;
</script>

<script
  generics="T extends Record<string, unknown>, U extends _FormPath<T>"
  lang="ts"
>
  import * as FormPrimitive from "formsnap";
  import type { WithoutChild } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    form,
    name,
    ...restProps
  }: WithoutChild<FormPrimitive.FieldsetProps<T, U>> = $props();
</script>

<FormPrimitive.Fieldset
  {...restProps}
  bind:ref
  class={cn("space-y-2", className)}
  {form}
  {name}
/>
