import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartCardComponent } from './chart-card/chart-card.component';
import { Chart } from '../../models/chart.model';
import { ChartService } from '../../../core/services/chart.service';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-chart-display',
  standalone: true,
  imports: [ChartCardComponent],
  templateUrl: './chart-display.component.html',
  styleUrl: './chart-display.component.scss'
})
export class ChartDisplayComponent implements OnInit, OnDestroy {
  private userChartSubscription!:Subscription;
  //filler data until set with behavior subject
  charts!:Chart[]| null;

  constructor(
    private chartService:ChartService,
    private sidebar:SidebarService){}

  //EXPIREMENTAL NONSENSE
  // setSize(number:number){
  //     let bootstrapSize = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
  //     return `col-${bootstrapSize}`
  // }


  ngOnInit(): void {
    // Populates localcomponent charts[] to be rendered in this component's for loop
    this.userChartSubscription = this.chartService.userCharts.subscribe(charts => {
      this.charts = charts
    });
  }

  ngOnDestroy(): void {
    this.userChartSubscription.unsubscribe();
  }

  checkSidebar(): boolean{
    return this.sidebar.isSidebarVisible
  }
}
