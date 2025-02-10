<script>
  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card";
  // noinspection ES6UnusedImports
  import { PieChart, Text } from "layerchart";

  import { sum } from "d3-array";
  import { format } from "@layerstack/utils";

  export let accountExpenditures;
</script>

<Card.Root class="w-full">
  <Card.Header>
    <Card.Title>Dein Ausgaben</Card.Title>
    <Card.Description
    >Hier siehst du eine Analyse der Ausgaben deines Kontos
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <div class=" w-[800px] h-[300px] p-4 rounded">
      <PieChart
        cRange={[
                "hsl(var(--g1))",
                "hsl(var(--g2))",
                "hsl(var(--g3))",
                "hsl(var(--g4))",
                "hsl(var(--g5))",
              ]}
        cornerRadius={5}
        data={accountExpenditures}
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
            value={format(sum(accountExpenditures, (d) => d.expenditureAmount)) + "€"}
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
    </div>
  </Card.Content>
</Card.Root>