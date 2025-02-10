<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Card from "$lib/components/ui/card";
  // noinspection ES6UnusedImports
  import { PieChart, Text } from "layerchart";

  import type { PageData } from "./$types";
  import Expenditures from "./components/Expenditures.svelte";

  let { data }: { data: PageData } = $props();
  let accountData = data.accountData;
</script>

<div class="flex flex-col gap-2">
  {#each accountData as account}
    <div class="flex flex-row w-full gap-2">
      <Expenditures accountExpenditures={account.expenditures} />

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
