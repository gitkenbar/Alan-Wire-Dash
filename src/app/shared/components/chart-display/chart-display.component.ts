import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartCardComponent } from './chart-card/chart-card.component';
import { UserChart } from '../../models/user-chart.model';
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
  charts:UserChart[] | null = null
  // [
  //   //Under Construction to implement chart.js
  //   // new UserChart("Bobble Sales", new Chart()),
  //   // new UserChart("Bobble Futures", new Chart())
  // ];

  constructor(
    private chartService:ChartService,
    private sidebar:SidebarService){}

  //EXPIREMNTAL NONSENSE
  // setSize(number:number){
  //     let bootstrapSize = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
  //     return `col-${bootstrapSize}`
  // }


  ngOnInit(): void {
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
