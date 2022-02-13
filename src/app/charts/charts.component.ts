import { Component, Input,  OnChanges } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import * as moment from 'moment'
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnChanges {

  constructor() { 
    Chart.register(...registerables);
  }

  @Input() dataForChart:any = {}
    myChart: any 


    ngOnChanges() {
        if (this.myChart) {
            this.myChart.destroy()
        }
        console.log(this.dataForChart);
       
        this.myChart = new Chart('myChart', {
            type: this.dataForChart.type,
            data: this.dataForChart.data,
            plugins: [ChartDataLabels],
            options: {
                responsive: true,
                indexAxis: this.dataForChart.horizotal && 'y',
                maintainAspectRatio: this.dataForChart.type !== 'pie' ,
                scales: {
                    y: {
                        title: {
                            display: true, text: this.dataForChart.tickY,
                            font: {
                                size: 20,
                                weight: '25'
                            },
                        },
                        ticks: {
                            font: {
                                size: 15,
                                weight: '25'
                            },
                            
                        }
                    },
                    x: {
                        title: {
                            display: true, text: this.dataForChart.tickX,
                            font: {
                                size: 20,
                                weight: '25'
                            }
                        },
                        ticks: {
                            font: {
                                size: 15,
                                weight: '25'
                            },
                        }
                    },
                },
                plugins: {
                    tooltip: {
                        bodyFont: {
                            size: 15
                        },
                        titleFont: {
                            size: 15
                        }
                    },
                    legend: {
                        labels: {
                            font: {
                                size: 15,
                                weight: '25'
                            },
                        },
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: this.dataForChart.title,
                        font: {
                            size: 18,
                            weight: '25'
                        }
                    }
                }
            },
            
        })
    }
    
}
