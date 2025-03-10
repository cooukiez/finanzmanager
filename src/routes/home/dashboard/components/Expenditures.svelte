<script lang="ts">
  // Importiere notwendige Komponenten und Bibliotheken
  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card"; // Layout-Komponenten für Karten
  import { PieChart, Text } from "layerchart"; // Bibliothek für Pie-Charts
  import { sum } from "d3-array"; // Funktion, um Summen zu berechnen
  import { format } from "@layerstack/utils"; // Formatierungs-Hilfen, z.B. für Währungen

  // Expenditures enthält eine Liste von Ausgaben mit deren Typ und Betrag
  export let Expenditures: {
    expenditureType: string;
    expenditureAmount: number;
  }[];

  // Berechnet die Summe aller Ausgaben
  let expenditureSum = sum(Expenditures, (d) => d.expenditureAmount);
</script>

<Card.Root class="w-full">
  <Card.Header>
    <!-- Überschrift und Beschreibung -->
    <Card.Title>Your Expenditures</Card.Title>
    <!-- Titel der Karte -->
    <Card.Description>
      Here you can see an analysis of all your expenditures. <!-- Beschreibungstext -->
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="w-full h-[300px] p-4 rounded">
      {#if expenditureSum === 0}
        <!-- Falls keine Ausgaben existieren, zeige eine Nachricht an -->
        <div class="flex items-center justify-center h-full">
          <span class="text-muted-foreground">There are no expenditures</span>
        </div>
      {:else}
        <!-- Erstelle ein Pie-Chart, wenn Ausgaben vorhanden sind -->
        <PieChart
          cRange={[
            "hsl(var(--g1))", // Farbe 1
            "hsl(var(--g2))", // Farbe 2
            "hsl(var(--g3))", // Farbe 3
            "hsl(var(--g4))", // Farbe 4
            "hsl(var(--g5))", // Farbe 5
          ]}
          cornerRadius={5}
          data={Expenditures}
          innerRadius={-30}
          key="expenditureType"
          legend={{ placement: "top-left", orientation: "vertical" }}
          padAngle={0.02}
          value="expenditureAmount"
        >
          <svelte:fragment slot="aboveMarks">
            <!-- Anzeige der Gesamtausgaben in der Mitte des Diagramms -->
            <Text
              class="text-4xl"
              dy={4}
              textAnchor="middle"
              value={format(expenditureSum) + "€"}
              verticalAnchor="middle"
            />
            <!-- Zeigt das Label "total" unterhalb des Betrags -->
            <Text
              class="text-sm fill-surface-content/50"
              dy={26}
              textAnchor="middle"
              value="total"
              verticalAnchor="middle"
            />
          </svelte:fragment>
        </PieChart>
      {/if}
    </div>
  </Card.Content>
</Card.Root>
