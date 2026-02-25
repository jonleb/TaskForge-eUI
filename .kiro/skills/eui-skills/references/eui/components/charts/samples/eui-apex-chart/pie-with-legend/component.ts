import { Component } from '@angular/core';

import { ApexChart, EUI_CHARTS } from '@eui/components/externals/charts';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'pie-with-legend',
    templateUrl: 'component.html',
    imports: [...EUI_CHARTS],
})
export class PieWithLegendComponent {
    public simplePieChart: {chart: ApexChart; [key: string]: any} = {
        chart: {
            width: '100%',
            type: 'pie',
        },
        series: [44, 55, 41, 17, 15],
        labels: ['Series 1', 'Series long title', 'Series 3', 'Series 4', 'Series 5'],
        colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3'],
        legend: {
            show: true,
            floating: true,
        },
        plotOptions: {
            pie: {
                customScale: 0.8,
                offsetX: -50,
            },
        },
        dataLabels: {
            enabled: true,
        },
        responsive: [{
            breakpoint: 600,
            options: {
                chart: {
                    height: 240,
                },
                legend: {
                    show: false,
                },
            },
        }],
    };

    constructor() { }

}
