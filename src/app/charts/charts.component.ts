import { Component, Input,  OnChanges } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import * as moment from 'moment'

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnChanges {

  constructor() { 
    Chart.register(...registerables);
  }

  @Input() dataForChart:any = {labels: [], datasets: []}
    myChart: any 


    ngOnChanges() {
        console.log("OnChanges");
        if (this.myChart) {
            this.myChart.destroy()
        }
    
        this.myChart = new Chart('myChart', {
            type: 'line',
            data: this.dataForChart,
            options: {
                scales: {
                    y: {
                        title: {
                            display: true, text: 'Number of Active Users',
                            font: {
                                size: 20,
                                weight: '25'
                            }
                        },
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 15,
                                weight: '25'
                            },
                        }
                    },
                    x: {
                        title: {
                            display: true, text: 'Time',
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
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'User Trend for Active Users',
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
