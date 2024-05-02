import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartCardComponent } from './chart-card/chart-card.component';
import { Chart } from '../../models/chart.model';
import { ChartService } from '../../../core/services/chart.service';
import { Subscription } from 'rxjs';

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
  charts:Chart[] | null = [
    new Chart("Bobble Sales", `
      <body>
        <h5>Injected HTML:</h5>
      </body>
  `),
    new Chart("Bobble Futures", `
      <body>
        <p style="color: red;">Literally stick a whole webpage in here</p>
      </body>
  `),
  ];

  constructor(private chartService:ChartService){}

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

}
