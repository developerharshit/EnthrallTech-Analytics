import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as XLSX from "xlsx";

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() { }
  private rawData: any

  getData = async(file?: File) => {
    if(!this.rawData){
      if(!file) throw new Error('Please Select a file')
      
      const data =  await this.readExcel(file)
      this.rawData = data
      return this.rawData
    }
    else {
      return this.rawData
    }
  }

  userTrendChart() {
    if(!this.rawData) throw new Error('Please select a file')

    const ans: any = {}
    this.rawData.forEach((e: { Date: string; }) => {
        const date = moment(e.Date, 'DD-MM-YYYY').format('D-MMM-YY').toString()
        if(date in ans){
            ans[date]+=1
        }
        else {
            ans[date] = 1
        }
    });

    return ans
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
