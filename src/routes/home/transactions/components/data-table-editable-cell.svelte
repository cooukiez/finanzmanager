<script lang="ts">
  import { cellEditStore } from "../stores";

  // Definiere die Props
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

  // Lokaler Zustand für die Bearbeitung
  const state = $state({
    editing: false,  // Gibt an, ob sich das Feld im Bearbeitungsmodus befindet
    inputValue: isNumber ? Number(value) : String(value)  // Initialwert des Eingabefeldes, je nach Typ
  });

  let inputElement: HTMLInputElement;  // Referenz zum Input-Element

  // Funktion zum Starten der Bearbeitung
  function startEditing() {
    state.editing = true;  // Setze den Bearbeitungsmodus auf 'true'
    console.log("startEditing");  // Ausgabe in der Konsole zu Debugging-Zwecken

    // Fokus auf das Eingabefeld setzen, nachdem der DOM aktualisiert wurde
    setTimeout(() => {
      inputElement?.focus();  // Setzt den Fokus auf das Eingabefeld
      inputElement?.select();  // Markiert den gesamten Text im Eingabefeld
    }, 0);
  }

  // Funktion zum Speichern der Änderungen
  function saveChanges() {
    state.editing = false;  // Beende den Bearbeitungsmodus
    // Stelle sicher, dass Zahlen als Zahlen gespeichert werden
    const finalValue = isNumber ? Number(state.inputValue) : state.inputValue;
    // Setze den neuen Wert im globalen Zustand (cellEditStore)
    cellEditStore.set({ rowId, fieldName, value: finalValue });
  }

  // Event-Handler für das Drücken der Enter-Taste
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      saveChanges();  // Speichern der Änderungen, wenn die Enter-Taste gedrückt wird
    } else if (event.key === "Escape") {
      // Wenn Escape gedrückt wird, zurücksetzen des Wertes und Beenden des Bearbeitungsmodus
      state.inputValue = isNumber ? Number(value) : String(value);  // Setzt den ursprünglichen Wert zurück
      state.editing = false;  // Beende den Bearbeitungsmodus
    }
  }

  // Event-Handler für den Blur-Ereignis (Feld verliert den Fokus)
  function handleBlur() {
    saveChanges();  // Speichern der Änderungen, wenn das Eingabefeld den Fokus verliert
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