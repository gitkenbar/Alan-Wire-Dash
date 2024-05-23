import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { AlanChart } from '../../../models/alan-chart.model';
import { ChartService } from '../../../../core/services/chart.service';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss'
})
export class ChartCardComponent implements AfterViewInit {
  @Input() chartFromParent!: AlanChart;
  @Input() cardIndex!: number;
  @Output() fullscreenChart = new EventEmitter<AlanChart>();

  constructor(
    private chartService:ChartService,
  ){}

  //In order for the cardIndex binding work properly, we have to use ngAfterViewInit
  //This renders the charts after the components are built, which is important here
  ngAfterViewInit(): void {
    //This unpacks the chart_data from our AlanChart as an object
    let chartConfig:ChartConfiguration = JSON.parse(this.chartFromParent.chart_data);
    //We have to check for fullscreen since charts rerender on enlarging
    if (this.isFullscreen()) {
      //in fullscreen mode, the canvas identifier is simply 'ctx'
      let chartItem = "ctx";
      //chartItem is a reference to the canvas to render in, chartConfig is a configuration object for ChartJS
      new Chart(chartItem, chartConfig);
    } else {
      //when displaying multiple charts we have to procedurally count up for each canvas rendered and match its id
      let chartItem = "ctx" + this.cardIndex.toString();
      new Chart(chartItem, chartConfig);
    }
  }

  removeChart(chart:AlanChart | null){
    //Checks for truthy to enforce type safety
    if(chart){
    this.chartService.removeChart(chart);
    }
  }


  makeFullscreen(){
    console.log('makeFullscreen() Activated')
    this.chartService.toggleFullscreen()
    this.fullscreenChart.emit(this.chartFromParent)
  }

  //We needed a check here to render fullscreen correctly
  isFullscreen(){
    return this.chartService.checkFullscreen()
  }

}

