import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from '../../../models/chart.model';
import { ChartService } from '../../../../core/services/chart.service';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss'
})
export class ChartCardComponent implements OnInit {
  @Input() chartFromParent: Chart | null = null;

  constructor(private chartService:ChartService){}

  removeChart(chart:Chart | null){
    //Checks for truthy to enforce type safety
    if(chart){
    this.chartService.removeChart(chart);
  }
}

  ngOnInit(): void {
    //We are going to need some fancy code here to get this to render anything other than raw HTML
    //But it can be done.
  }

}

