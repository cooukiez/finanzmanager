<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card";
  // noinspection ES6UnusedImports
  import { PieChart, Text } from "layerchart";

  import { sum } from "d3-array";
  import { format } from "@layerstack/utils";

  export let Expenditures: { expenditureType: string; expenditureAmount: number }[];

  let expenditureSum = sum(Expenditures, (d) => d.expenditureAmount);
</script>

<Card.Root class="w-full">
  <Card.Header>
    <Card.Title>Your Expenditures</Card.Title>
    <Card.Description>
      Here you can see an analysis of all your expenditures.
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="w-full h-[300px] p-4 rounded">
      {#if expenditureSum === 0}
        <div class="flex items-center justify-center h-full">
          <span class="text-muted-foreground">There are no expenditures</span>
        </div>
      {:else}
        <PieChart
          cRange={[
          "hsl(var(--g1))",
          "hsl(var(--g2))",
          "hsl(var(--g3))",
          "hsl(var(--g4))",
          "hsl(var(--g5))",
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
            <Text
              class="text-4xl"
              dy={4}
              textAnchor="middle"
              value={format(expenditureSum) + "€"}
              verticalAnchor="middle"
            />
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