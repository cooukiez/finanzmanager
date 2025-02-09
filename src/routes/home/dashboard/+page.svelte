<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card";
  // noinspection ES6UnusedImports
  import { PieChart, Text } from "layerchart";

  import type { PageData } from "./$types";
  import { sum } from "d3-array";
  import { format } from "@layerstack/utils";

  let { data }: { data: PageData } = $props();
  let accountData = data.accountData;
</script>

<div class="flex flex-col gap-2">
  {#each accountData as account}
    <div class="flex flex-row w-full gap-2">
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
              data={account}
              key="expenditureType"
              legend={{ placement: "top-left", orientation: "vertical" }}
              cRange={[
                "hsl(var(--g1))",
                "hsl(var(--g2))",
                "hsl(var(--g3))",
                "hsl(var(--g4))",
                "hsl(var(--g5))",
              ]}
              cornerRadius={5}
              innerRadius={-30}
              padAngle={0.02}
              value="expenditureAmount"
            >
              <svelte:fragment slot="aboveMarks">
                <Text
                  class="text-4xl"
                  dy={4}
                  textAnchor="middle"
                  value={format(sum(account, (d) => d.expenditureAmount)) + "€"}
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

      <Card.Root class="w-full">
        <Card.Header>
          <Card.Title>Schulden</Card.Title>
          <Card.Description>Deine Schulden</Card.Description>
        </Card.Header>
        <Card.Content></Card.Content>
      </Card.Root>
    </div>
  {/each}
</div>
