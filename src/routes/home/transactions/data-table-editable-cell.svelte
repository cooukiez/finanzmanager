<script lang="ts">
  import { cellEditStore } from "./stores";

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
  const state = $state({
    editing: false,
    inputValue: isNumber ? Number(value) : String(value)
  });

  let inputElement: HTMLInputElement;

  // Enable editing
  function startEditing() {
    state.editing = true;
    console.log("startEditing");
    // Focus the input after the DOM updates
    setTimeout(() => {
      inputElement?.focus();
      inputElement?.select();
    }, 0);
  }

  // Save changes
  function saveChanges() {
    state.editing = false;
    // Ensure numbers are stored as numbers
    const finalValue = isNumber ? Number(state.inputValue) : state.inputValue;
    cellEditStore.set({ rowId, fieldName, value: finalValue });
  }

  // Handle Enter key press
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      saveChanges();
    } else if (event.key === "Escape") {
      // Reset value and cancel editing
      state.inputValue = isNumber ? Number(value) : String(value);
      state.editing = false;
    }
  }

  // Handle blur event
  function handleBlur() {
    saveChanges();
  }
</script>

{#if state.editing}
  <input
    type={isNumber ? "number" : "text"}
    bind:value={state.inputValue}
    bind:this={inputElement}
    onkeydown={handleKeyDown}
    onblur={handleBlur}
    class="h-12 w-full p-1 border rounded focus:outline-none focus:ring-1 focus:ring-primary bg-secondary"
    step={isNumber ? "0.01" : undefined}
  />
{:else}
  <button
    class="h-12 w-full cursor-pointer p-1 hover:bg-secondary rounded text-left"
    onclick={startEditing}
  >
    {value}
  </button>
{/if}