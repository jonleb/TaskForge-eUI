import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import {
    ApexAnnotations,
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexFill,
    ApexGrid,
    ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis, EUI_CHARTS, EuiApexChartComponent,
} from '@eui/components/externals/charts';
import { EuiAppShellService } from '@eui/core';
import { EUI_CARD } from '@eui/components/eui-card';

import { series } from './data';

export type ChartOptions = {
    annotations: ApexAnnotations;
    chart: ApexChart;
    colors: string[];
    dataLabels: ApexDataLabels;
    fill: ApexFill;
    grid: ApexGrid;
    labels: string[];
    legend: ApexLegend;
    plotOptions: ApexPlotOptions;
    series: ApexAxisChartSeries;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
    subtitle: ApexTitleSubtitle;
    tooltip: ApexTooltip;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
};

@Component({
    // eslint-disable-next-line
    selector: 'timeline-poc',
    templateUrl: 'component.html',
    imports: [...EUI_CHARTS, ...EUI_CARD],
    styleUrls: ['./component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [EuiAppShellService],
})
export class TimelinePocComponent implements OnInit {

    @ViewChild('chart') chart: EuiApexChartComponent;
    @ViewChild('chart1') chart1: EuiApexChartComponent;
    @ViewChild('chart2') chart2: EuiApexChartComponent;
    public chartOptions: Partial<ChartOptions>;
    public chartOptions1: Partial<ChartOptions>;
    public chartOptions2: Partial<ChartOptions>;

    chartOptions0 = {
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
        series: [
            {
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
        responsive: [
            {
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
            },
        ],
    };

    assetsPath = '';

    constructor( public asService: EuiAppShellService ) {

        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            this.assetsPath = '/assets';
        } else {
            this.assetsPath = '/eui-showcase-ux-10.x/assets';
        }

    }

    ngOnInit() {

        this.chartOptions = {
            series: [
                {
                    name: 'series',
                    data: series.monthDataSeries1.prices,
                },
            ],
            chart: {
                height: 120,
                type: 'line',
                toolbar: {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    tools: {
                        download: true,
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false,
                    },
                    autoSelected: 'selection',  // zoom | selection | pan
                },
            },
            annotations: {
                xaxis: [
                    {
                        x: new Date('13 Nov 2020').getTime(),
                        x2: new Date('21 Nov 2020').getTime(),
                        strokeDashArray: 0,
                        borderColor: '#4CAF50',
                        fillColor: '#4CAF50',
                        opacity: 1,
                        label: {
                            borderColor: undefined,
                            borderWidth: 0,
                            borderRadius: 0,
                            text: 'consumed: 9 days 10h',
                            textAnchor: 'start', // start | middle | end
                            // position: 'top', // left | right
                            orientation: 'horizontal',
                            offsetX: 20,
                            offsetY: 16,
                            style: {
                                background: '#4CAF50',
                                color: '#fff',
                                fontSize: '12px',
                                fontWeight: 400,
                                fontFamily: undefined,
                                cssClass: 'apexcharts-xaxis-annotation-label-consumed',
                                padding: {
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                },
                            },
                        },
                    },
                    {
                        x: new Date('21 Nov 2020').getTime(),
                        x2: new Date('22 Nov 2020').getTime(),
                        fillColor: '#C1F9D5',
                        opacity: 0.75,
                        label: {
                            borderColor: 'none',
                            borderWidth: 0,
                            borderRadius: 0,
                            text: '2 d',
                            textAnchor: 'start', // start | middle | end
                            orientation: 'vertical',
                            offsetX: 12,
                            offsetY: -10,
                            style: {
                                background: 'transparent',
                                color: '#000',
                                fontSize: '12px',
                                fontWeight: 400,
                                fontFamily: undefined,
                                cssClass: 'apexcharts-xaxis-annotation-label-paused',
                                padding: {
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                },
                            },
                        },
                    },
                    {
                        x: new Date('22 Nov 2020').getTime(),
                        x2: new Date('08 Dec 2020').getTime(),
                        fillColor: '#E0E0E0',
                        opacity: 0.5,
                        label: {
                            borderColor: 'none',
                            borderWidth: 0,
                            borderRadius: 0,
                            text: 'remaining: 25 days',
                            textAnchor: 'start', // start | middle | end
                            // position: 'top', // left | right
                            orientation: 'horizontal',
                            offsetX: 20,
                            offsetY: 16,
                            style: {
                                background: 'transparent',
                                color: '#333',
                                fontSize: '12px',
                                fontWeight: 400,
                                fontFamily: undefined,
                                cssClass: 'apexcharts-xaxis-annotation-label-remaining',
                                padding: {
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                },
                            },
                        },
                    },
                ],
                points: [
                    {
                        x: new Date('13 Nov 2020').getTime(),
                        y: 0,
                        marker: {
                            size: 0,
                            fillColor: '#fff',
                            strokeColor: '#004494',
                            shape: 'square',
                            cssClass: 'apexcharts-custom-class',
                        },
                        label: {
                            borderColor: '#c2c2c2',
                            borderWidth: 1,
                            borderRadius: 2,
                            text: 'Start',
                            textAnchor: 'middle',
                            offsetX: 0,
                            offsetY: 40,
                            style: {
                                background: '#fff',
                                color: '#777',
                                fontSize: '12px',
                                fontWeight: 400,
                                fontFamily: undefined,
                                cssClass: 'apexcharts-point-annotation-label-start',
                                padding: {
                                    left: 5,
                                    right: 5,
                                    top: 0,
                                    bottom: 2,
                                },
                            },
                        },
                        image: {
                            path: this.assetsPath + '/icons/started.png',
                            width: 25,
                            height: 25,
                            offsetX: 0,
                            offsetY: 12,
                        },
                    },
                    {
                        x: new Date('21 Nov 2020').getTime(),
                        y: 0,
                        marker: {
                            size: 0,
                            cssClass: 'my-custom-class',
                        },
                        label: {
                            // borderColor: '#FF4560',
                            offsetX: 10,
                            offsetY: 40,
                            style: {
                                background: '#fff',
                                color: '#777',
                                fontSize: '12px',
                                fontWeight: 400,
                                fontFamily: undefined,
                                cssClass: 'apexcharts-point-annotation-label-paused',
                            },
                            text: 'Paused',
                        },
                        image: {
                            path: this.assetsPath + '/icons/paused.png',
                            width: 25,
                            height: 25,
                            offsetX: 10,
                            offsetY: 12,
                        },
                    },
                    {
                        x: new Date('03 Dec 2020').getTime(),
                        y: 0,
                        marker: {
                            size: 0,
                            fillColor: '#fff',
                            strokeColor: '#004494',
                            cssClass: 'apexcharts-custom-class',
                        },
                        label: {
                            // borderColor: '#000',
                            offsetY: 40,
                            style: {
                                background: '#fff',
                                color: '#777',
                                fontSize: '12px',
                                fontWeight: 400,
                                fontFamily: undefined,
                                cssClass: 'apexcharts-point-annotation-label-estimated',
                            },
                            text: 'Estimated time',
                            textAnchor: 'middle',
                        },
                        image: {
                            path: this.assetsPath + '/icons/estimated.png',
                            width: 25,
                            height: 25,
                            offsetX: 0,
                            offsetY: 12,
                        },
                    },
                    {
                        x: new Date('07 Dec 2020').getTime(),
                        y: 0,
                        marker: {
                            size: 0,
                            cssClass: 'my-custom-class',
                        },
                        label: {
                            // borderColor: '#FF4560',
                            offsetX: 0,
                            offsetY: 40,
                            style: {
                                background: '#fff',
                                color: '#777',
                                fontSize: '12px',
                                fontWeight: 400,
                                fontFamily: undefined,
                                cssClass: 'apexcharts-point-annotation-label-end',
                            },
                            text: 'Final target',
                        },
                        image: {
                            path: this.assetsPath + '/icons/terminated.png',
                            width: 25,
                            height: 25,
                            offsetX: 0,
                            offsetY: 12,
                        },
                    },
                ],
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'straight',
                lineCap: 'butt',
                colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
                width: 1,
                dashArray: [0],
            },
            grid: {
                padding: {
                    right: 50,
                    left: 50,
                },
            },
            title: {
                text: undefined,    // 'Clock UI',
                align: 'left',
                floating: true,
                style: {
                    fontSize: '14px',
                    fontWeight: 400,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    color: '#004494',
                },
            },
            labels: series.monthDataSeries1.dates,
            xaxis: {
                type: 'datetime' /* category | datetime | numeric */,
                labels: {
                    show: false,
                    minHeight: 50,
                    maxHeight: 100,
                    style: {
                        colors: [],
                        fontSize: '12px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        fontWeight: 400,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
            },
            yaxis: {
                show: false,
                showAlways: false,
                showForNullSeries: false,
                tickAmount: 1,
            },
            tooltip: {
                enabled: false,
                marker: {
                    show: false,
                },
            },
            fill: {
                colors: undefined,
                opacity: 0.9,
                type: 'solid',
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 100],
                },
                image: {
                    src: [],
                    width: undefined,
                    height: undefined,
                },
                pattern: {
                    style: 'verticalLines',
                    width: 6,
                    height: 6,
                    strokeWidth: 2,
                },
            },
        };

        this.chartOptions1 = {
            series: [
                {
                    name: 'series1',
                    data: series.monthDataSeries1.prices,
                },
            ],
            chart: {
                height: 150,
                type: 'line',
                toolbar: {
                    show: false,
                    offsetX: 0,
                    offsetY: 0,
                    tools: {
                        download: true,
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false,
                    },
                    autoSelected: 'selection',  // zoom | selection | pan
                },
            },
            annotations: {
                xaxis: [
                    {
                        x: new Date('13 Nov 2020').getTime(),
                        x2: new Date('21 Nov 2020').getTime(),
                        strokeDashArray: 0,
                        borderColor: '#4CAF50',
                        fillColor: '#4CAF50',
                        opacity: 1,
                        label: {
                            borderColor: '#4CAF50',
                            borderWidth: 2,
                            borderRadius: 0,
                            text: 'consumed: 9 days 10h',
                            textAnchor: 'start', // start | middle | end
                            // position: 'top', // left | right
                            orientation: 'horizontal',
                            offsetX: 20,
                            offsetY: 20,
                            style: {
                                background: '#4CAF50',
                                color: '#fff',
                                fontSize: '12px',
                                fontWeight: 400,
                                fontFamily: undefined,
                                cssClass: 'apexcharts-xaxis-annotation-label-consumed',
                            },
                        },
                    },
                    {
                        x: new Date('21 Nov 2020').getTime(),
                        x2: new Date('22 Nov 2020').getTime(),
                        fillColor: '#C1F9D5',
                        opacity: 0.75,
                        label: {
                            borderColor: 'none',
                            style: {
                                fontSize: '12px',
                                color: '#fff',
                                background: 'transparent',
                                cssClass: 'apexcharts-xaxis-annotation-label-paused',
                                padding: {
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                },
                            },
                            offsetY: 0,
                            offsetX: 20,
                            text: '2 days',
                        },
                    },
                    {
                        x: new Date('22 Nov 2020').getTime(),
                        x2: new Date('08 Dec 2020').getTime(),
                        fillColor: '#E0E0E0',
                        opacity: 0.5,
                        label: {
                            borderColor: '#c2c2c2',
                            text: 'remaining: 25 days',
                            textAnchor: 'start', // start | middle | end
                            orientation: 'horizontal',
                            offsetX: 20,
                            offsetY: 20,
                            style: {
                                background: '#fff',
                                color: '#333333',
                                fontSize: '12px',
                                fontWeight: 400,
                                fontFamily: undefined,
                                cssClass: 'apexcharts-xaxis-annotation-label-remaining',
                            },
                        },
                    },
                ],
                points: [
                    {
                        x: new Date('13 Nov 2020').getTime(),
                        y: 0,
                        marker: {
                            size: 0,
                            fillColor: '#fff',
                            strokeColor: '#004494',

                            shape: 'square',
                            cssClass: 'apexcharts-custom-class',
                        },
                        image: {
                            path: this.assetsPath + '/icons/material/2x/baseline_run_circle_black_18dp.png',
                            width: 30,
                            height: 30,
                            offsetX: 0,
                            offsetY: 20,
                        },
                    },
                    {
                        x: new Date('21 Nov 2020').getTime(),
                        y: 0,
                        marker: {
                            size: 0,
                            cssClass: 'my-custom-class',
                        },
                        image: {
                            path: this.assetsPath + '/icons/material/2x/baseline_pause_circle_black_18dp.png',
                            width: 30,
                            height: 30,
                            offsetX: 10,
                            offsetY: 20,
                        },
                    },
                    {
                        x: new Date('03 Dec 2020').getTime(),
                        y: 0,
                        marker: {
                            size: 0,
                            fillColor: '#fff',
                            strokeColor: '#004494',

                            cssClass: 'apexcharts-custom-class',
                        },
                        image: {
                            path: this.assetsPath + '/icons/material/2x/baseline_stars_black_18dp.png',
                            width: 30,
                            height: 30,
                            offsetX: 20,
                            offsetY: 20,
                        },
                    },
                    {
                        x: new Date('07 Dec 2020').getTime(),
                        y: 0,
                        marker: {
                            size: 0,
                            cssClass: 'my-custom-class',
                        },
                        image: {
                            path: this.assetsPath + '/icons/material/2x/baseline_tour_black_18dp.png',
                            width: 30,
                            height: 30,
                            offsetX: 20,
                            offsetY: 20,
                        },
                    },
                ],
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'straight',
                colors: [
                    '#C0C0C0',
                    '#004494',
                    '#66DA26',
                    '#546E7A',
                    '#E91E63',
                    '#FF9800',
                ],
                width: 1,
                dashArray: [0],
            },
            grid: {
                padding: {
                    right: 50,
                    left: 50,
                },
            },
            title: {
                text: undefined,    // 'Using Material design icons',
                align: 'left',
                floating: true,
                style: {
                    fontSize: '14px',
                    fontWeight: 400,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    color: '#004494',
                },
            },
            labels: series.monthDataSeries1.dates,
            xaxis: {
                type: 'datetime' /* category | datetime | numeric */,
                labels: {
                    show: false,
                    minHeight: 50,
                    maxHeight: 100,
                },
            },
            yaxis: {
                show: false,
                showAlways: false,
                showForNullSeries: false,
                tickAmount: 1,
            },
            tooltip: {
                enabled: false,
                marker: {
                    show: false,
                },
            },
        };

        this.chartOptions2 = {
            series: [
                {
                    name: 'series',
                    data: series.monthDataSeries1.prices,
                },
            ],
            chart: {
                height: 180,
                type: 'line',
            },
            annotations: {
                xaxis: [
                    {
                        x: new Date('13 Nov 2020').getTime(),
                        x2: new Date('22 Nov 2020').getTime(),
                        strokeDashArray: 0,
                        borderColor: '#4CAF50',
                        fillColor: '#4CAF50',
                        opacity: 1,
                        label: {
                            borderColor: '#4CAF50',
                            style: {
                                fontSize: '12px',
                                color: '#fff',
                                background: '#4CAF50',
                                cssClass: 'apexcharts-xaxis-annotation-label-consumed',
                            },
                            orientation: 'horizontal',
                            offsetX: 10,
                            offsetY: 20,
                            text: 'Consumed: 9d 10h',
                            textAnchor: 'start', // start | middle | end
                        },
                    },
                    {
                        x: new Date('22 Nov 2020').getTime(),
                        x2: new Date('24 Nov 2020').getTime(),
                        fillColor: '#B3F7CA',
                        opacity: 0.5,
                        label: {
                            borderColor: '#B3F7CA',
                            style: {
                                fontSize: '12px',
                                color: '#333',
                                background: '#00E396',
                                cssClass: 'apexcharts-xaxis-annotation-label-paused',
                            },
                            orientation: 'vertical',
                            offsetX: 30,
                            offsetY: -6,
                            text: 'Paused: 2d',
                            // textAnchor: 'start', // start | middle | end
                        },
                    },
                    {
                        x: new Date('24 Nov 2020').getTime(),
                        x2: new Date('08 Dec 2020').getTime(),
                        fillColor: '#E0E0E0',
                        opacity: 0.5,
                        label: {
                            borderColor: 'silver',
                            style: {
                                fontSize: '12px',
                                color: '#333',
                                background: '#fff',
                                cssClass: 'apexcharts-xaxis-annotation-label-remaining',
                            },
                            orientation: 'horizontal',
                            offsetX: 15,
                            offsetY: 20,
                            text: 'Remaining: 25d',
                            textAnchor: 'start', // start | middle | end
                        },
                    },
                ],
                points: [
                    {
                        x: new Date('13 Nov 2020').getTime(),
                        y: 0,
                        marker: {
                            size: 10,
                            fillColor: '#fff',
                            strokeColor: '#03A9F4',
                            shape: 'square',
                            cssClass: 'apexcharts-custom-class',
                        },
                        label: {
                            borderColor: '#03A9F4',
                            offsetY: 0,
                            style: {
                                color: '#fff',
                                background: '#03A9F4',
                                cssClass: 'apexcharts-point-annotation-label',
                            },
                            text: 'Start',
                        },
                    },
                    {
                        x: new Date('02 Dec 2020').getTime(),
                        y: 0,
                        marker: {
                            size: 8,
                            fillColor: '#fff',
                            strokeColor: '#03A9F4',
                            cssClass: 'apexcharts-custom-class',
                        },
                        label: {
                            borderColor: '#03A9F4',
                            offsetY: 0,
                            style: {
                                color: '#fff',
                                background: '#03A9F4',
                                cssClass: 'apexcharts-point-annotation-label',
                            },
                            text: 'ETA',
                        },
                    },
                    {
                        x: new Date('05 Dec 2020').getTime(),
                        y: 0,
                        marker: {
                            size: 8,
                            fillColor: '#fff',
                            strokeColor: '#03A9F4',
                            cssClass: 'apexcharts-custom-class',
                        },
                        label: {
                            borderColor: '#03A9F4',
                            offsetY: 0,
                            style: {
                                color: '#fff',
                                background: '#03A9F4',
                                cssClass: 'apexcharts-point-annotation-label',
                            },
                            text: 'Target date',
                        },
                    },
                    {
                        x: new Date('08 Dec 2020').getTime(),
                        y: 0,
                        marker: {
                            size: 10,
                            fillColor: '#fff',
                            strokeColor: '#03A9F4',
                            shape: 'square',
                            cssClass: 'apexcharts-custom-class',
                        },
                        label: {
                            borderColor: '#03A9F4',
                            offsetY: 0,
                            style: {
                                color: '#fff',
                                background: '#03A9F4',
                                cssClass: 'apexcharts-point-annotation-label',
                            },
                            text: 'End',
                        },
                    },
                ],
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'straight',
                lineCap: 'butt',
                colors: undefined,
                width: 1,
                dashArray: 0,
            },
            grid: {
                padding: {
                    right: 30,
                    left: 20,
                },
            },
            title: {
                text: undefined,    // 'Responsive using annotation's points',
                align: 'left',
            },
            labels: series.monthDataSeries1.dates,
            xaxis: {
                type: 'datetime' /* category | datetime | numeric */,
                labels: {
                    show: false,
                    minHeight: 50,
                    maxHeight: 100,
                },
            },
            yaxis: {
                show: false,
                showAlways: false,
                showForNullSeries: false,
                tickAmount: 1,
            },
            tooltip: {
                enabled: false,
                marker: {
                    show: false,
                },
            },
        };
    }
}
