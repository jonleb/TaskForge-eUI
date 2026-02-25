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
