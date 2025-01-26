<script lang="ts">
    // noinspection ES6UnusedImports
    import * as Card from "$lib/components/ui/card";
    import {PieChart, Text} from "layerchart";

    import {longData} from "layerchart/utils/genData";
    import {group, sum} from "d3-array";
    import {format} from '@layerstack/utils';

    // export let pageData: PageData;

    const dataByYear = group(longData, (d) => d.year);
    // const data = dataByYear.get(2019) ?? [];

    const datenLol = [
        {
            year: 1,
            basket: 1,
            fruit: "apfel",
            value: 5,
        },
        {
            year: 1,
            basket: 1,
            fruit: "kiwi",
            value: 7,
        },
        {
            year: 1,
            basket: 1,
            fruit: "kohl",
            value: 4,
        },
        {
            year: 1,
            basket: 1,
            fruit: "birne",
            value: 17,
        },
    ]
</script>

<div class="flex flex-row w-full gap-2">
    <Card.Root class="w-full">
        <Card.Header>
            <Card.Title>Dein Konto</Card.Title>
            <Card.Description>Hier siehst du eine Analyse der Ausgaben deines Kontos</Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="h-[300px] p-4 rounded">
                <PieChart
                        cRange={["hsl(var(--g1))", "hsl(var(--g2))", "hsl(var(--g3))", "hsl(var(--g4))", "hsl(var(--g5))"]}
                        cornerRadius={5}
                        data={datenLol}
                        innerRadius={-30}
                        key="fruit"
                        padAngle={0.02}
                        value="value"
                >
                    <svelte:fragment slot="aboveMarks">
                        <Text
                                class="text-4xl"
                                dy={4}
                                textAnchor="middle"
                                value={format(sum(datenLol, (d) => d.value)*1.32123) + " €"}
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
        <Card.Content>

        </Card.Content>

    </Card.Root>
</div>