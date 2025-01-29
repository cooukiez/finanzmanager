<script lang="ts">
  import * as Button from "$lib/components/ui/button/index.js";

  let { ref = $bindable(null), ...restProps }: Button.Props = $props();
</script>

<Button.Root {...restProps} bind:ref type="submit" />
