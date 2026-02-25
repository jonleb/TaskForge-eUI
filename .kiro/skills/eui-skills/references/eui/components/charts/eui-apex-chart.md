# eui-apex-chart

## Overview

<p class="eui-u-text-paragraph">
    Charts library based on <a href="https://github.com/apexcharts/ng-apexcharts">ng-apexcharts</a>
    and <a href="https://apexcharts.com/">Apex Charts</a>.
</p>
<p class="eui-u-text-paragraph">
    Refer to the samples here : https://apexcharts.com/angular-chart-demos/, replace apx-chart by eui-apex-chart, we kept the same
    input parameters to make it easy.
</p>

<eui-alert euiInfo class="eui-u-mt-m">
    <eui-alert-title>Setup instructions</eui-alert-title>

    <ul>
        <li>1. import : <code class="eui-u-text-code">import &#123; EUI_CHARTS &#125; from '&#64;eui/components/externals/charts';</code> inside the component you want to use the chart</li>
        <li>2. follow the code of this demo page for <code class="eui-u-text-code">eui-apex-chart</code> component usage</li>
    </ul>
</eui-alert>

## Samples

### [Default](samples/eui-apex-chart/Default)

```html
<div class="doc-sample-section-title">Minimal options</div>

<eui-apex-chart
    [series]="chartOptions.series"
    [chart]="chartOptions.chart">
</eui-apex-chart>


<div class="doc-sample-section-title">All options set</div>

<eui-apex-chart
    [series]="chartOptions.series"
    [chart]="chartOptions.chart"
    [colors]="chartOptions.colors"
    [stroke]="chartOptions.stroke"
    [dataLabels]="chartOptions.dataLabels"
    [tooltip]="chartOptions.tooltip"
    [responsive]="chartOptions.responsive"
    [legend]="chartOptions.legend"
    [xaxis]="chartOptions.xaxis"
    [yaxis]="chartOptions.yaxis"
    [stroke]="chartOptions.stroke"
    [markers]="chartOptions.markers">
</eui-apex-chart>


<div class="doc-sample-section-title">Within eui-card</div>

<eui-card euiNoContentPadding>
    <eui-card-header>
        <eui-card-header-title>Chart title</eui-card-header-title>
    </eui-card-header>
    <eui-card-content>
        <eui-apex-chart
            [series]="chartOptions.series"
            [chart]="chartOptions.chart">
        </eui-apex-chart>
    </eui-card-content>
</eui-card>


<div class="doc-sample-section-title">Within an eui-dialog</div>

<button euiButton
        (click)="openDialog()">Open Dialog</button>
<eui-dialog #dialog
            [title]="'Dialog title'" 
            (dialogOpen)="onDialogOpen()">
    
        @if (isdialogOpen) {
            <p class="eui-u-text-paragraph">
                <eui-apex-chart #dialogChart [series]="chartOptions.series"
                                [chart]="chartOptions.chart">
                </eui-apex-chart>
            </p>
        }
</eui-dialog>
```

```typescript
import { Component, ViewChild } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_DIALOG, EuiDialogComponent, EuiDialogService } from '@eui/components/eui-dialog';
import { ApexChart, ApexStroke, EuiApexChartComponent, EUI_CHARTS } from '@eui/components/externals/charts';
import { EuiAppShellService } from '@eui/core';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_CHARTS, ...EUI_CARD, ...EUI_BUTTON, ...EUI_DIALOG],
    providers: [EuiAppShellService, EuiDialogService],
})
export class DefaultComponent {
    @ViewChild('dialog') dialog: EuiDialogComponent;
    isdialogOpen:boolean;

    chartOptions: {chart: ApexChart; stroke: ApexStroke; [key: string]: any} = {
        chart: {
            height: 380,
            type: 'line',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ['#5369f8', '#43d39e'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            width: [3, 3],
            curve: 'smooth',
        },
        series: [{
                name: 'High - 2018',
                data: [28, 29, 33, 36, 32, 32, 33],
            },
            {
                name: 'Low - 2018',
                data: [12, 11, 14, 18, 17, 13, 13],
            },
        ],
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: '#e9ecef',
        },
        markers: {
            style: 'inverted',
            size: 6,
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
                text: 'Month',
            },
            axisBorder: {
                color: '#d6ddea',
            },
            axisTicks: {
                color: '#d6ddea',
            },
        },
        yaxis: {
            title: {
                text: 'Temperature',
            },
            min: 5,
            max: 40,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
        tooltip: {
            theme: 'dark',
            x: { show: false },
        },
        responsive: [{
            breakpoint: 600,
            options: {
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                legend: {
                    show: false,
                },
            },
        }],
    };

    @ViewChild('dialogChart') chartDialog: EuiApexChartComponent;

    constructor( public asService: EuiAppShellService ) { }

    public openDialog(): void {
        this.isdialogOpen=true;
        this.dialog.openDialog();
    }

    onDialogOpen(): void {
        this.chartDialog.chartInstance.update((chart) => {
            if(chart) {
                chart.render();
                return chart;
            }
        });
    }
}
```

### Other examples

- [Options: Pie with legend](samples/eui-apex-chart/pie-with-legend)
- [Options: Stacked Chart](samples/eui-apex-chart/stacked)
- [Misc: Clock UI Timeline PoC](samples/eui-apex-chart/timeline-poc)
- [Misc: Miscelaneous](samples/eui-apex-chart/misc)
