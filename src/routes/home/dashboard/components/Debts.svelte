<script lang="ts">
  // Importiere notwendige Komponenten und Funktionen
  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card"; // Karten-Komponenten für das Layout
  import { PieChart, Text } from "layerchart"; // PieChart-Bibliothek
  import { sum } from "d3-array"; // Funktion für Summenberechnungen
  import { format } from "@layerstack/utils"; // Zum Formatieren von Zahlen (z.B. Währungen)

  // Akzeptierte Schulden, die an die Komponente übergeben werden
  export let acceptedDebts: {
    creditorId: string;
    debtorId: string;
    amount: number;
  }[]; // Liste der akzeptierten Schulden

  // Benutzerinformationen, die übergeben werden
  export let user: {
    id: string;
    name: string;
    email: string;
  }; // Daten des aktuellen Benutzers

  // Prüft, ob der Benutzer Gläubiger (Creditor) einer Schuld ist
  const isCreditor = (debt: { creditorId: string; debtorId: string }) =>
    debt.creditorId === user.id;

  // Prüft, ob der Benutzer Schuldner (Debtor) ist
  const isDebtor = (debt: { creditorId: string; debtorId: string }) =>
    debt.debtorId === user.id;

  // Daten für das Pie-Chart vorbereiten (Summen für jede Kategorie errechnen)
  const debtData = [
    {
      type: "Owed to you", // Schulden, die andere dem Benutzer schulden
      amount: sum(acceptedDebts.filter(isCreditor), (d) => d.amount),
    },
    {
      type: "Owed by you", // Schulden, die der Benutzer anderen schuldet
      amount: sum(acceptedDebts.filter(isDebtor), (d) => d.amount),
    },
  ];

  // Berechnet den Gesamtsaldo des Benutzers
  const overallBalance = acceptedDebts.reduce((total, debt) => {
    if (isCreditor(debt)) return total + debt.amount; // Schulden, die dem Benutzer zustehen (positiv)
    if (isDebtor(debt)) return total - debt.amount; // Schulden, die der Benutzer schuldet (negativ)
    return total;
  }, 0);

  // Prüft, ob es akzeptierte Schulden gibt
  const hasDebts = acceptedDebts.length > 0;
</script>

<Card.Root class="w-full">
  <Card.Header>
    <!-- Überschrift für die Schuldenübersicht -->
    <Card.Title>Your Debts</Card.Title>
    <Card.Description>
      Here you can see an analysis of your debt. <!-- Kurzbeschreibung -->
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="w-full h-[300px] p-4 rounded">
      {#if !hasDebts}
        <!-- Zeigt eine Nachricht an, wenn es keine Schulden gibt -->
        <div class="flex items-center justify-center h-full">
          <span class="text-muted-foreground">No outstanding debts</span>
        </div>
      {:else}
        <!-- Zeigt das PieChart an, wenn Schulden existieren -->
        <PieChart
          cRange={[
            "hsl(120, 70%, 50%)", // Grün: Schulden, die dem Benutzer zustehen
            "hsl(0, 70%, 50%)",   // Rot: Schulden, die der Benutzer schuldet
          ]}
          cornerRadius={5}
          data={debtData}
          innerRadius={-30}
          padAngle={0.02}
          key="type"
          legend={{ placement: "top-left", orientation: "vertical" }}
          tooltip={true}
          value="amount"
        >
          <!-- Text, der über dem Diagramm angezeigt wird -->
          <svelte:fragment slot="aboveMarks">
            <!-- Anzeige des Gesamtsaldos in der Charts-Mitte -->
            <Text
              class="text-4xl"
              dy={4}
              textAnchor="middle"
              value={format(Math.abs(overallBalance)) + "€"}
              verticalAnchor="middle"
            />
            <!-- Zeigt an, ob der Gesamtbetrag "Owed to you" oder "Owed by you" ist -->
            <Text
              class="text-sm fill-surface-content/50"
              dy={26}
              textAnchor="middle"
              value={overallBalance > 0 ? "Owed to you" : "Owed by you"}
              verticalAnchor="middle"
            />
          </svelte:fragment>
        </PieChart>
      {/if}
    </div>
  </Card.Content>
</Card.Root>