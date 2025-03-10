<script lang="ts">
  import { cellEditStore } from "../stores";

  let {
    transactionId,
    fieldName,
    value,
    isNumber = false
  }: {
    transactionId: string;
    fieldName: string;
    value: string | number;
    isNumber?: boolean;
  } = $props();

  // Lokaler Zustand für die Bearbeitung
  const state = $state({
    editing: false, // Bearbeitungsmodus
    inputValue: isNumber ? Number(value) : String(value)
  });

  let inputElement: HTMLInputElement; // Referenz zum Input-Element

  // Funktion zum Starten der Bearbeitung
  function startEditing() {
    state.editing = true;

    // Fokus auf das Eingabefeld setzen, nachdem der DOM aktualisiert wurde
    setTimeout(() => {
      inputElement?.focus(); // Setzt den Fokus auf das Eingabefeld
      inputElement?.select(); // Markiert den gesamten Text im Eingabefeld
    }, 0);
  }

  // Funktion zum Speichern der Änderungen
  function saveChanges() {
    state.editing = false;
    // Stelle sicher, dass Zahlen als Zahlen gespeichert werden
    const finalValue = isNumber ? Number(state.inputValue) : state.inputValue;

    cellEditStore.set({ transactionId, fieldName, value: finalValue });
  }

  // Event-Handler für das Drücken der Enter-Taste
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      saveChanges(); // Speichern der Änderungen, wenn die Enter-Taste gedrückt wird
    } else if (event.key === "Escape") {
      // Wenn Escape gedrückt wird, zurücksetzen des Wertes und Beenden des Bearbeitungsmodus
      state.inputValue = isNumber ? Number(value) : String(value);
      state.editing = false;
    }
  }

  // Event-Handler für den Blur-Ereignis (Feld verliert den Fokus)
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
