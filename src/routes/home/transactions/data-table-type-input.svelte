<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let {
    transactionType,
    rowId
  }: {
    transactionType: string,
    rowId: string
  } = $props();

  // Local state
  let editing = false;
  let inputValue = transactionType;
  let inputElement: HTMLInputElement;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
    change: { rowId: string, fieldName: string, value: string }
  }>();

  // Enable editing
  function startEditing() {
    editing = true;
    // Focus the input after the DOM updates
    setTimeout(() => {
      inputElement?.focus();
      inputElement?.select();
    }, 0);
  }

  // Save changes
  function saveChanges() {
    editing = false;
    dispatch("change", { rowId, fieldName: "type", value: inputValue });
  }

  // Handle Enter key press
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      saveChanges();
    } else if (event.key === "Escape") {
      // Reset value and cancel editing
      inputValue = transactionType;
      editing = false;
    }
  }

  // Handle blur event
  function handleBlur() {
    saveChanges();
  }
</script>

{#if editing}
  <input
    type="text"
    bind:value={inputValue}
    bind:this={inputElement}
    onkeydown={handleKeyDown}
    onblur={handleBlur}
    class="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
  />
{:else}
  <button
    class="w-full cursor-pointer p-1 rounded"
    onclick={startEditing}
  >
    {transactionType}
  </button>
{/if}