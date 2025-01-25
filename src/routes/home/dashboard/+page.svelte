<script lang="ts">
    import type {PageData} from "../../../../.svelte-kit/types/src/routes";

    // noinspection ES6UnusedImports
    import * as Card from "$lib/components/ui/card";
    import {PieChart} from "layerchart";

    import {longData} from "layerchart/utils/genData";
    import {group} from "d3-array";

    export let pageData: PageData;

    const dataByYear = group(longData, (d) => d.year);
    const data = dataByYear.get(2019) ?? [];
    $: dataWithColor =
        data?.map((d, i) => {
            return {
                ...d,
                color: [
                    'hsl(var(--color-danger))',
                    'hsl(var(--color-warning))',
                    'hsl(var(--color-success))',
                    'hsl(var(--color-info))',
                ][i],
            };
        }) ?? [];

    const exerciseData = [
        {key: 'move', value: 400, maxValue: 1000, color: '#ef4444'},
        {key: 'exercise', value: 20, maxValue: 30, color: '#a3e635'},
        {key: 'stand', value: 10, maxValue: 12, color: '#22d3ee'},
    ];

    let renderContext: 'svg' | 'canvas' = 'svg';
</script>

<Card.Root class="mb-2">
    <Card.Header>
        <Card.Title>Hi.</Card.Title>
        <Card.Description></Card.Description>
    </Card.Header>
    <Card.Content>
        <div class="h-[300px] p-4 border rounded">
            <PieChart {data} key="fruit" value="value"/>
        </div>
        data

    </Card.Content>
</Card.Root>

<Card.Root>
    <Card.Header>
        <Card.Title>Konto</Card.Title>
        <Card.Description>Dein Konto</Card.Description>
    </Card.Header>
    <Card.Content>

    </Card.Content>
</Card.Root>