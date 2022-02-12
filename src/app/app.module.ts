import { ChartService } from './chart.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlsComponent } from './controls/controls.component';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
    declarations: [
        AppComponent,
        ControlsComponent,
        ChartsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [ChartService],
    bootstrap: [AppComponent]
})
export class AppModule { }
