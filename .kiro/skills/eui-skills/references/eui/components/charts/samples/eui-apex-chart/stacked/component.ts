import { Component } from '@angular/core';

import { ApexChart, EUI_CHARTS } from '@eui/components/externals/charts';

@Component({
    // eslint-disable-next-line
    selector: 'stacked',
    templateUrl: 'component.html',
    imports: [...EUI_CHARTS],
})
export class StackedComponent {

    chartOptions: { chart: ApexChart; [key: string]: any } = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%',
        },
        series: [{
            name: 'Marine Sprite',
            data: [44, 55, 41, 37, 22, 43, 21],
        }, {
            name: 'Striking Calf',
            data: [53, 32, 33, 52, 13, 43, 32],
        }, {
            name: 'Tank Picture',
            data: [12, 17, 11, 9, 15, 11, 20],
        }, {
            name: 'Bucket Slope',
            data: [9, 7, 5, 8, 6, 9, 4],
        }, {
            name: 'Reborn Kid',
            data: [25, 12, 19, 32, 25, 24, 10],
        }],
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff'],
        },
        title: {
            text: '100% Stacked Bar',
        },
        xaxis: {
            categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        },
        tooltip: {
            y: {
                formatter: (val) => val + 'K',
            },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40,
        },
    };

    chartOptions1: { chart: ApexChart; [key: string]: any } = {
        series: [{
            name: 'Marine Sprite',
            data: [44, 55, 41, 37, 22, 43, 21],
        }, {
            name: 'Striking Calf',
            data: [53, 32, 33, 52, 13, 43, 32],
        }, {
            name: 'Tank Picture',
            data: [12, 17, 11, 9, 15, 11, 20],
        }, {
            name: 'Bucket Slope',
            data: [9, 7, 5, 8, 6, 9, 4],
        }, {
            name: 'Reborn Kid',
            data: [25, 12, 19, 32, 25, 24, 10],
        }],
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff'],
        },
        title: {
            text: 'Fiction Books Sales',
        },
        xaxis: {
            categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
            labels: {
                formatter: (val) => val + 'K',
            },
        },
        yaxis: {
            title: {
                text: undefined,
            },
        },
        tooltip: {
            y: {
                formatter: (val) => val + 'K',
            },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40,
        },
    };
}
