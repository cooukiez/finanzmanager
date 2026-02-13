<script lang="ts">
  import type { PageData } from "./$types";
  import Expenditures from "./components/Expenditures.svelte";
  import Debts from "./components/Debts.svelte";

  // Die Daten aus dem Serverladen (`+page.server.ts`) werden als `props` übergeben.
  let { data }: { data: PageData } = $props();

  // Extrahieren der relevanten Daten aus den Server-Ergebnissen.
  let accountData = data.accountData; // Ausgaben des Benutzers
  let acceptedDebts = data.acceptedDebts; // Akzeptierte Schulden des Benutzers
  let user = data.user; // Informationen über den eingeloggten Benutzer
</script>

<div class="flex flex-col w-full m-0">
  <div class="flex flex-row w-full gap-2">
    <div class="flex-[3]">
      <!-- Komponente zur Anzeige der Benutzerausgaben -->
      <Expenditures Expenditures={accountData} />
    </div>

    <div class="flex-[3]">
      <div class="w-[100%] mx-auto">
        <!-- Komponente zur Anzeige der akzeptierten Schulden -->
        <Debts {acceptedDebts} user={user ?? { id: "", name: "", email: "" }} />
      </div>
    </div>
  </div>
</div>
