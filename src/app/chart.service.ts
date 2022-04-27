import { ControlPanelData, Filters } from './../utils/interface';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as XLSX from "xlsx";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
    constructor() { }
    private rawData: any
	
    getData = async(file?: File) => {
        if(!file) {
			throw new Error('Please Select a file')
		}
		const data =  await this.readExcel(file)
		this.rawData = data

		return this.getControlPanelData()
    }
	
    userTrendChart(filters: Filters) {
		if(!this.rawData) throw new Error('Please select a file')
        
        const data: any = _.groupBy(this.filterData(filters),'Date')
        const result: any = {}
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const e = data[key];
                result[key] = e.length
            }
        }
		
        return result
    }
    newUserVsOldUserChart(filters: Filters) {
        if(!this.rawData) throw new Error('Please select a file')
        
        const data: any = _.groupBy(this.filterData(filters),'Date')
        const result: any = {}
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const e = data[key];
                result[key] = e.length
            }
        }
		
        return result
    }
    regionWiseChart(filters: Filters) {
        if(!this.rawData) throw new Error('Please select a file')

        const data: any = _.groupBy(this.filterData(filters),'Region')
        
        const result: any = {}
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const e = data[key];
                result[key] = e.length
            }
        }
        result['undefined'] && delete result['undefined']
		
        return result
    }

    utilizationTime(filters: Filters) {
        if(!this.rawData) throw new Error('Please select a file')
        const result:any = {}
        const data = this.filterData(filters);
        
        for (let index = 0; index < 8; index++) {
            const element: any = data[index];
            result[element['TrainerName']] = (element['TrainerUtilization']*100).toFixed(0)
        }

        return result
    }

    
    trainerThroughput(filters: Filters) {
        if(!this.rawData) throw new Error('Please select a file')
        const result:any = {}
        const data = this.filterData(filters);
        
        for (let index = 0; index < 8; index++) {
            const element: any = data[index];
            result[element['TrainerName']] = (element['TrainingThroughPut']*100).toFixed(0)
        }

        return result
    }

    mobileVsWebChart(filters: Filters){
        if(!this.rawData) throw new Error('Please select a file')

        const data: any = _.groupBy(this.filterData(filters),'Device')
        
        const result: any = {}
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const e = data[key];
                result[key] = e.length
            }
        }
        result['undefined'] && delete result['undefined']
		
        return result
    }

    departmentWiseChart(filters: Filters) {
        if(!this.rawData) throw new Error('Please select a file')

        const data: any = _.groupBy(this.filterData(filters),'Department')
        
        const result: any = {}
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const e = data[key];
                result[key] = e.length
            }
        }
        result['undefined'] && delete result['undefined']
		
        return result
    }

    private filterData(filters: Filters) {
        const result:Array<object> = []
        let counter = 0;
        this.rawData.forEach((element: any) => {
            if(
                moment(element.Date, 'DD-MM-YYYY').isSameOrAfter(moment(filters.startDate)) &&
                moment(element.Date,'DD-MM-YYYY').isSameOrBefore(moment(filters.endDate)) && 
                (filters.department=='All' || element.Department == filters.department) &&
                (filters.region=='All' || element.Region == filters.region) &&
                (filters.device=='All' || element.Device    == filters.device )
            ){
                const Date = moment(element.Date,'DD-MM-YYYY').format('D-MMM,YY').toString()
                element = {...element,Date }
                result.push(element)
                counter+=1
            }
        });
        console.log(`Total no of records ${counter}`);
        
        return result
    }

	private getControlPanelData() {
		if(!this.rawData) throw new Error('Please select a file')
		const controlPanelData: ControlPanelData = {
			department: [],
			device: [],
			region: [],
            maxDate: '',
            minDate: ''
		}
		const department:any = _.groupBy(this.rawData, 'Department')
		const region:any = _.groupBy(this.rawData, 'Region')
		const device:any = _.groupBy(this.rawData, 'Device')

        let moments = Object.keys(_.groupBy(this.rawData,'Date')).map(d => moment(d,'DD-MM-YYYY'))
        const minDate = moment.min(moments).format('YYYY-MM-DD').toString()
        const maxDate = moment.max(moments).format('YYYY-MM-DD').toString()

		department['undefined'] && delete department['undefined']
		region['undefined'] && delete region['undefined']
		device['undefined'] && delete device['undefined']

		controlPanelData.department =  ['All',...Object.keys(department)]
		controlPanelData.region =  ['All',...Object.keys(region)]
		controlPanelData.device =  ['All',...Object.keys(device)]
		controlPanelData.minDate =  minDate
		controlPanelData.maxDate =  maxDate

		return controlPanelData
	}

	private readExcel = (file: any) => {
		console.log('Reading file');
		return new Promise((resolve, reject) => {
		
			const fileReader = new FileReader()
			fileReader.readAsArrayBuffer(file)
		
			fileReader.onload = (e: any) => {
				const bufferArray = e?.target.result
				const wb = XLSX.read(bufferArray, { type: "buffer" })
				const wsname = wb.SheetNames[0]
				const ws = wb.Sheets[wsname]
		
				const data = XLSX.utils.sheet_to_json(ws)
				const fileName = file.name.split(".")[0]
		
				resolve(data)
				
			}
		})
	}

 
}
