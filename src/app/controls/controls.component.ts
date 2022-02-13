import { Filters, ControlPanelData, chartTypes } from './../../utils/interface';
import { Component, OnInit, EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

    isOpen = true
    chartTypes = chartTypes
    @Output() submitted = new EventEmitter() 
    @Output() filterChange = new EventEmitter()
    @Input() controlPanelData: ControlPanelData = {
        department: [],
        device: [],
        region: [],
        maxDate: '',
        minDate: ''
    }
    
    filters: Filters = {
        startDate: '',
        endDate: '',
        chartType: chartTypes[0], 
        department: 'All',
        region: 'All',
        device: 'All',
    };
    
    constructor() { }

    setFilters(value: string, flag: string) {
        this.filters = { ...this.filters,[flag]: value}
        this.filterChange.emit(this.filters)        
    }

    onFilterSelected(flag: string, file:any) {
        this.submitted.emit(file)
    }

    ngOnInit(): void {

    }

    ngOnChanges() {
        if(this.controlPanelData.minDate && this.filters.startDate==='' ) {
            this.filters = { ...this.filters,['startDate']: this.controlPanelData.minDate}
        }
        if(this.controlPanelData.maxDate && this.filters.endDate===''){
            this.filters = { ...this.filters,['endDate']: this.controlPanelData.maxDate}
        }
    }
}
