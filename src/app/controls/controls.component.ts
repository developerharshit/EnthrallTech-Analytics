import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  isOpen = true
  @Output() submitted = new EventEmitter() 
  
  constructor() { }

  onFilterSelected(flag: string, file:any) {
    this.submitted.emit(file)
  }

  ngOnInit(): void {
  }

}
