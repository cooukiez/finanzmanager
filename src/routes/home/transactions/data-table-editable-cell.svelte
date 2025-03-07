<script lang="ts">
  import { createEventDispatcher } from "svelte";

  // Define props
  let {
    value,
    fieldName,
    rowId,
    isNumber = false
  }: {
    value: string | number,
    fieldName: string,
    rowId: string,
    isNumber?: boolean
  } = $props();

  // Local state
  let editing = false;
  let inputValue = isNumber ? Number(value) : String(value);
  let inputElement: HTMLInputElement;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
    change: { rowId: string, fieldName: string, value: string | number }
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
    // Ensure numbers are stored as numbers
    const finalValue = isNumber ? Number(inputValue) : inputValue;
    dispatch("change", { rowId, fieldName, value: finalValue });
  }

  // Handle Enter key press
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      saveChanges();
    } else if (event.key === "Escape") {
      // Reset value and cancel editing
      inputValue = isNumber ? Number(value) : String(value);
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
    type={isNumber ? "number" : "text"}
    bind:value={inputValue}
    bind:this={inputElement}
    on:keydown={handleKeyDown}
    on:blur={handleBlur}
    class="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
    step={isNumber ? "0.01" : undefined}
  />
{:else}
  <div
    class="w-full cursor-pointer p-1 hover:bg-gray-100 rounded"
    on:click={startEditing}
  >
    {value}
  </div>
{/if}