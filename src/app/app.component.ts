import { ChartService } from './chart.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
		constructor(public chartService: ChartService){
	}
	chartData: any = {
        labels: [],
        datasets: []
    }

	async processData(file:any) {
        await this.chartService.getData(file);
        const data = this.chartService.userTrendChart()
		let x = {
            label: '# of active users',
			fill: false,
			backgroundColor: 'rgb(54, 162, 235)',
			borderColor: 'rgb(54, 162, 235)',
			data: Object.values(data),
			pointRadius: 2,
			pointHoverRadius: 5,
			tension: 0.2
		}
        const chartData:any = { datasets: [], labels: []}
        chartData.datasets.push(x)
        chartData.labels = Object.keys(data)
        
        this.chartData = chartData
        
        console.log(this.chartData);
	}

}
