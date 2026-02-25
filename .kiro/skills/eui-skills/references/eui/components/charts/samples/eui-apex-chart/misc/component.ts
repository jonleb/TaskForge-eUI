import { Component, OnInit } from '@angular/core';

import { ApexChart, EUI_CHARTS } from '@eui/components/externals/charts';
import { EUI_ALERT } from '@eui/components/eui-alert';

import { ChartType } from './charts.model';
import {
    linewithDataChart, gradientLineChart, stackedAreaChart, basicColumChart, columnlabelChart, mixedChart, basicBarChart,
    nagativeValueBarChart, lineColumAreaChart, multipleYAxisChart, simpleBubbleChart, dBubbleChart, scatterXYChart, scatterChart,
    gradientDonutChart, patternedDonutChart, basicRadialBarChart, multipleRadialBars, strokedCircularGuage,
} from './data';

@Component({
    // eslint-disable-next-line
    selector: 'misc',
    templateUrl: 'component.html',
    imports: [...EUI_CHARTS, ...EUI_ALERT],
    styleUrls: ['./component.scss'],
})
export class MiscComponent implements OnInit {
    linewithDataChart: ChartType;
    gradientLineChart: ChartType;
    stackedAreaChart: ChartType;
    basicColumChart: ChartType;
    columnlabelChart: ChartType;
    mixedChart: ChartType;
    basicBarChart: ChartType;
    nagativeValueBarChart: ChartType;
    lineColumAreaChart: ChartType;
    multipleYAxisChart: ChartType;
    simpleBubbleChart: ChartType;
    dBubbleChart: ChartType;
    scatterXYChart: ChartType;
    scatterChart: ChartType;
    gradientDonutChart: ChartType;
    patternedDonutChart: ChartType;
    basicRadialBarChart: ChartType;
    multipleRadialBars: ChartType;
    strokedCircularGuage: ChartType;


    ngOnInit() {
        this._fetchData();
    }

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

    public simplePieChart1: {chart: ApexChart; [key: string]: any} = {
        chart: {
            width: '100%',
            type: 'pie',
        },
        series: [44, 55, 72],
        labels: ['Series 1', 'Series 2', 'Series long title 3'],
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
    public chartOptions: {chart: ApexChart; [key: string]: any} = {
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
                data: [],
            },
            {
                name: 'Low - 2018',
                data: [],
            },
        ],
        noData: {
            text: 'No data to display',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: 'red',
              fontSize: '14px',
            },
        },
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
                breakpoint: 768,
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

    private _fetchData() {
        this.linewithDataChart = linewithDataChart;
        this.gradientLineChart = gradientLineChart;
        this.stackedAreaChart = stackedAreaChart;
        this.basicColumChart = basicColumChart;
        this.columnlabelChart = columnlabelChart;
        this.mixedChart = mixedChart;
        this.basicBarChart = basicBarChart;
        this.nagativeValueBarChart = nagativeValueBarChart;
        this.lineColumAreaChart = lineColumAreaChart;
        this.multipleYAxisChart = multipleYAxisChart;
        this.simpleBubbleChart = simpleBubbleChart;
        this.dBubbleChart = dBubbleChart;
        this.scatterXYChart = scatterXYChart;
        this.scatterChart = scatterChart;
        // this.simplePieChart = simplePieChart;
        this.gradientDonutChart = gradientDonutChart;
        this.patternedDonutChart = patternedDonutChart;
        this.basicRadialBarChart = basicRadialBarChart;
        this.multipleRadialBars = multipleRadialBars;
        this.strokedCircularGuage = strokedCircularGuage;
    }


}
