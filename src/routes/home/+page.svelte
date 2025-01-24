<script lang="ts">
    import type {PageData} from "./$types";
    import {A, Button, Card, Chart, Dropdown, DropdownItem, Popover} from 'flowbite-svelte';
    import {
        ChevronDownOutline,
        ChevronRightOutline,
        DotsHorizontalOutline,
        DownloadSolid,
        InfoCircleSolid,
        PenSolid,
        ShareNodesSolid,
        TrashBinSolid
    } from 'flowbite-svelte-icons';

    export let data: PageData;

    const options = {
        series: [52.8, 26.8, 20.4],
        colors: ['#1C64F2', '#16BDCA', '#9061F9'],
        chart: {
            height: 420,
            width: '100%',
            type: 'pie'
        },
        stroke: {
            colors: ['white'],
            lineCap: ''
        },
        plotOptions: {
            pie: {
                labels: {
                    show: true
                },
                size: '100%',
                dataLabels: {
                    offset: -25
                }
            }
        },
        labels: ['Direct', 'Organic search', 'Referrals'],
        dataLabels: {
            enabled: true,
            style: {
                fontFamily: 'Inter, sans-serif'
            }
        },
        legend: {
            position: 'bottom',
            fontFamily: 'Inter, sans-serif'
        },
        yaxis: {
            labels: {
                formatter: function (value: number) {
                    return value + '%';
                }
            }
        },
        xaxis: {
            labels: {
                formatter: function (value: number) {
                    return value + '%';
                }
            },
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        }
    };
</script>

<h1>Hi, {data.user?.name}!</h1>
<p>Your user ID is {data.user?.id}.</p>

<Card>
    <div class="flex justify-between items-start w-full">
        <div class="flex-col items-center">
            <div class="flex items-center mb-1">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Website traffic</h5>
                <InfoCircleSolid class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
                                 id="pie1"/>
                <Popover class="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-10"
                         triggeredBy="#pie1">
                    <div class="p-3 space-y-2">
                        <h3 class="font-semibold text-gray-900 dark:text-white">Activity growth - Incremental</h3>
                        <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should
                            have a growing trend, as stagnating chart signifies a significant decrease of community
                            activity.</p>
                        <h3 class="font-semibold text-gray-900 dark:text-white">Calculation</h3>
                        <p>For each date bucket, the all-time volume of activities is calculated. This means that
                            activities in period n contain all activities up to period n, plus the activities generated
                            by your community in period.</p>
                        <A href="/">Read more
                            <ChevronRightOutline class="w-2 h-2 ms-1.5"/>
                        </A>
                    </div>
                </Popover>
            </div>
        </div>
        <div class="flex justify-end items-center">
            <DotsHorizontalOutline class="dots-menu dark:text-white" id="dots-menu"/>
            <Dropdown class="w-44" triggeredBy="#dots-menu">
                <DropdownItem>
                    <PenSolid class="inline w-3 h-3 me-2"/>
                    Edit widget
                </DropdownItem>
                <DropdownItem>
                    <DownloadSolid class="inline w-3 h-3 me-2"/>
                    Dropdown data
                </DropdownItem>
                <DropdownItem>
                    <ShareNodesSolid class="inline w-3 h-3 me-2"/>
                    Add to repository
                </DropdownItem>
                <DropdownItem>
                    <TrashBinSolid class="inline w-3 h-3 me-2"/>
                    Delete widget
                </DropdownItem>
            </Dropdown>
        </div>
    </div>

    <Chart class="py-6" {options}/>

    <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div class="flex justify-between items-center pt-5">
            <Button class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0">
                Last 7 days
                <ChevronDownOutline class="w-2.5 m-2.5 ms-1.5"/>
            </Button>
            <Dropdown class="w-40">
                <DropdownItem>Yesterday</DropdownItem>
                <DropdownItem>Today</DropdownItem>
                <DropdownItem>Last 7 days</DropdownItem>
                <DropdownItem>Last 30 days</DropdownItem>
                <DropdownItem>Last 90 days</DropdownItem>
            </Dropdown>
            <A class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline"
               href="/">
                Traffic analysis
                <ChevronRightOutline class="w-2.5 h-2.5 ms-1.5"/>
            </A>
        </div>
    </div>
</Card>