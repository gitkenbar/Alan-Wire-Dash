import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlanChart } from '../../../models/alan-chart.model';
import { ChartService } from '../../../../core/services/chart.service';
import { SidebarService } from '../../../../core/services/sidebar.service';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss'
})
export class ChartCardComponent implements OnInit {
  @Input() chartFromParent!: AlanChart;
  @Input() cardIndex!: number;
  @Output() fullscreenChart = new EventEmitter<AlanChart>();

  constructor(
    private chartService:ChartService,
  ){}

  removeChart(chart:AlanChart | null){
    //Checks for truthy to enforce type safety
    if(chart){
    this.chartService.removeChart(chart);
    }
  }

  ngOnInit(): void {
    //We are going to need some fancy code here to get this to render anything other than raw HTML
    //But it can be done.
  }

  makeFullscreen(){
    this.chartService.toggleFullscreen()
    this.fullscreenChart.emit(this.chartFromParent)
  }

}

