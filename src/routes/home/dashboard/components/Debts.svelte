<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card";
  import { PieChart, Text } from "layerchart";
  import { sum } from "d3-array";
  import { format } from "@layerstack/utils";

  export let acceptedDebts: {
    creditorId: string;
    debtorId: string;
    amount: number;
  }[];

  export let user: {
    id: string;
    name: string;
    email: string;
  };

  const isCreditor = (debt: { creditorId: string; debtorId: string }) =>
    debt.creditorId === user.id;
  const isDebtor = (debt: { creditorId: string; debtorId: string }) =>
    debt.debtorId === user.id;

  const debtData = [
    {
      type: "Owed by others",
      amount: sum(acceptedDebts.filter(isCreditor), (d) => d.amount),
    },
    {
      type: "Owed to others",
      amount: sum(acceptedDebts.filter(isDebtor), (d) => d.amount),
    },
  ];

  const overallBalance = acceptedDebts.reduce((total, debt) => {
    if (isCreditor(debt)) return total + debt.amount;
    if (isDebtor(debt)) return total - debt.amount;
    return total;
  }, 0);
</script>

<Card.Root class="w-full">
  <Card.Header>
    <Card.Title>Your Debts</Card.Title>
    <Card.Description>
      Here you can see an analysis of your debt.
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="w-full h-[300px] p-4 rounded">
      <PieChart
        cRange={[
          "hsl(120, 70%, 50%)", // Green for "Owed by others"
          "hsl(0, 70%, 50%)", // Red for "Owed to others"
        ]}
        cornerRadius={5}
        data={debtData}
        innerRadius={-30}
        padAngle={0.05}
        key="type"
        legend={{ placement: "top-left", orientation: "vertical" }}
        tooltip={true}
        value="amount"
      >
        <svelte:fragment slot="aboveMarks">
          <Text
            class="text-4xl"
            dy={4}
            textAnchor="middle"
            value={format(Math.abs(overallBalance)) + "€"}
            verticalAnchor="middle"
          />
          <Text
            class="text-sm fill-surface-content/50"
            dy={26}
            textAnchor="middle"
            value={overallBalance > 0 ? "Owed to you" : "Owed by you"}
            verticalAnchor="middle"
          />
        </svelte:fragment>
      </PieChart>
    </div>
  </Card.Content>
</Card.Root>