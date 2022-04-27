import { ControlPanelData, Filters, chartTypes } from './../utils/interface';
import { ChartService } from './chart.service';
import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	
    constructor(public chartService: ChartService){
        
    }
	
    filters: Filters = {
        startDate: '',
        endDate: '',
        chartType: chartTypes[0], 
        department: 'All',
        region: 'All',
        device: 'All',
    };
    chartData: any = {
        type: '',
        data : {
            labels: [],
            datasets: []
        }
    }
    controlPanelData: ControlPanelData = {
        department: [],
        device: [],
        region: [],
        minDate: '',
        maxDate: ''
    }

    setFilters(value: Filters) {
        console.log(value);
        this.filters = value

        switch(this.filters.chartType){
            case chartTypes[0]: // Active Users Trend
                this.userTrendChart()
                break; 
            case chartTypes[1]: // Region Wise Active User
                this.regionWiseChart()
                break;
            case chartTypes[2]: // Mobile Vs Web
                this.mobileVsWebChart()
                break;
            case chartTypes[3]: // Department Wise Active User
                this.departmentWiseChart()
                break;
            case chartTypes[4]: // Utilization Time
                this.utilizationTime()
                break
            case chartTypes[5]: // Throughput Time
                this.trainerThroughput()
                break
        }
    }
    
	async processData(file:any) {
        this.controlPanelData = await this.chartService.getData(file);
        this.filters.startDate = this.controlPanelData.minDate
        this.filters.endDate = this.controlPanelData.maxDate
        this.setFilters(this.filters)
	}

    userTrendChart = () => {
        const data = this.chartService.userTrendChart(this.filters)
        console.log(data);
        
		let x = {
            label: '# of active users',
			fill: false,
			backgroundColor: '#833e8080',
			borderColor: '#833e80',
			data: Object.values(data),
			pointRadius: 2,
			pointHoverRadius: 5,
			tension: 0.2,
            datalabels: {
                display: false
            }
		}
        const chartData:any = { datasets: [], labels: []}
        chartData.datasets.push(x)
        chartData.labels = Object.keys(data)
        
        this.chartData = {
            type: 'line', 
            data: chartData,
            title: this.filters.chartType,
            tickX: 'Time',
            tickY: 'Number of Users'
        }
        
    }

    utilizationTime() {
        const data = this.chartService.utilizationTime(this.filters)
        console.log(data);

        let x = {
            label: '# of active users',
			fill: false,
			backgroundColor: '#269f64',
			borderColor: '#269f6480',
			data: Object.values(data),
			pointRadius: 2,
			pointHoverRadius: 5,
			tension: 0.2,
            datalabels: {
                color: 'black',
                labels: {
                    title: {
                      font: {
                        size: 15,  
                      }
                    },
                },
                anchor: 'end',
                align: 'end'
            }
		}
        const chartData:any = { datasets: [], labels: [], }
        chartData.datasets.push(x)
        chartData.labels = Object.keys(data)
        
        this.chartData = {
            type: 'bar', 
            data: chartData,
            title: this.filters.chartType, 
            horizotal: true, 
            tickX: 'Trainer Utilization in %', 
            tickY: 'Trainer Name'
        }
    }

    
    trainerThroughput() {
        const data = this.chartService.trainerThroughput(this.filters)
        console.log(data);

        let x = {
            label: '# of active users',
			fill: false,
			backgroundColor: '#269f64',
			borderColor: '#269f6480',
			data: Object.values(data),
			pointRadius: 2,
			pointHoverRadius: 5,
			tension: 0.2,
            datalabels: {
                color: 'black',
                labels: {
                    title: {
                      font: {
                        size: 15,  
                      }
                    },
                },
                anchor: 'end',
                align: 'end'
            }
		}
        const chartData:any = { datasets: [], labels: [], }
        chartData.datasets.push(x)
        chartData.labels = Object.keys(data)
        
        this.chartData = {
            type: 'bar', 
            data: chartData,
            title: this.filters.chartType, 
            tickX: 'Trainer Name', 
            tickY: 'Trainer Throughput in %'
        }
    }

    
    
    regionWiseChart = () => {
        const data = this.chartService.regionWiseChart(this.filters)
        console.log(data);
        
		let x = {
            label: '# of active users',
			fill: false,
			borderColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(201, 203, 207, 0.5)'
            ],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
			data: Object.values(data),
			pointRadius: 2,
			pointHoverRadius: 5,
			tension: 0.2,
            datalabels: {
                display: false
            }
		}
        const chartData:any = { datasets: [], labels: []}
        chartData.datasets.push(x)
        chartData.labels = Object.keys(data)
        
        this.chartData = {
            type: 'pie', 
            data: chartData,
            title: this.filters.chartType
        }
    }
    
    mobileVsWebChart = () => {
        const data = this.chartService.mobileVsWebChart(this.filters)
        console.log(data);
        
		let x = {
            label: '# of active users',
			fill: false,
			backgroundColor: ['rgb(54, 162, 235)','rgb(255, 205, 86)'],
			borderColor: ['rgb(54, 162, 235)','rgb(255, 205, 86)'],
			data: Object.values(data),
			pointRadius: 2,
			pointHoverRadius: 5,
			tension: 0.2,
            datalabels: {
                display: false
            }
		}
        const chartData:any = { datasets: [], labels: []}
        chartData.datasets.push(x)
        chartData.labels = Object.keys(data)
        
        this.chartData = {
            type: 'pie', 
            data: chartData, 
            title: this.filters.chartType
        }
    }
    
    departmentWiseChart = () => {
        const data = this.chartService.departmentWiseChart(this.filters)
        console.log(data);
        
		let x = {
            label: '# of active users',
			fill: false,
			backgroundColor: '#269f64',
			borderColor: '#269f6480',
			data: Object.values(data),
			pointRadius: 2,
			pointHoverRadius: 5,
			tension: 0.2,
            datalabels: {
                color: 'black',
                labels: {
                    title: {
                      font: {
                        size: 15,  
                      }
                    },
                },
                anchor: 'end',
                align: 'end'
            }
		}
        const chartData:any = { datasets: [], labels: [], }
        chartData.datasets.push(x)
        chartData.labels = Object.keys(data)
        
        this.chartData = {
            type: 'bar', 
            data: chartData,
            title: this.filters.chartType, 
            horizotal: true, 
            tickX: 'Number of Active Users', 
            tickY: 'Department'
        }
    }
    

}

