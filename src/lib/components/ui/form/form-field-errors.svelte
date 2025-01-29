<script lang="ts">
  import * as FormPrimitive from "formsnap";
  import type { WithoutChild } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    errorClasses,
    children: childrenProp,
    ...restProps
  }: WithoutChild<FormPrimitive.FieldErrorsProps> & {
    errorClasses?: string | undefined | null;
  } = $props();
</script>

<FormPrimitive.FieldErrors
  {...restProps}
  class={cn("text-destructive text-[0.8rem] font-medium", className)}
>
  {#snippet children({ errors, errorProps })}
    {#if childrenProp}
      {@render childrenProp({ errors, errorProps })}
    {:else}
      {#each errors as error}
        <div {...errorProps} class={cn(errorClasses)}>{error}</div>
      {/each}
    {/if}
  {/snippet}
</FormPrimitive.FieldErrors>
