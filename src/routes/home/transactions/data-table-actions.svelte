<script lang="ts">
  import Ellipsis from "lucide-svelte/icons/ellipsis";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  // noinspection ES6UnusedImports
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  // noinspection ES6UnusedImports
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  let { id }: { id: string } = $props();
</script>

<div class="flex justify-between">
  <div></div>
  <div class="flex gap-2 items-center">
    <div>
      <Dialog.Root>
        <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Edit</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Edit Transaction</Dialog.Title>
            <Dialog.Description>
              Edit the current transaction
            </Dialog.Description>
          </Dialog.Header>
        </Dialog.Content>
      </Dialog.Root>
    </div>
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <Button
              {...props}
              variant="outline"
              size="icon"
            >
              <span class="sr-only">Open menu</span>
              <Ellipsis />
            </Button>
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-56 mx-1">
          <DropdownMenu.Group>
            <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
            <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
              Copy payment ID
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>View customer</DropdownMenu.Item>
          <DropdownMenu.Item>View payment details</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  </div>
</div>
