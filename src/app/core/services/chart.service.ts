import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Department } from '../../shared/models/department.model';
import { AlanChart } from '../../shared/models/alan-chart.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private myUserCharts:AlanChart[] = []

  cardIsFullscreen: boolean = false;

  //BehaviorSubject holds and emits an array of charts the user has access to
  userCharts = new BehaviorSubject<AlanChart[] | null>(this.myUserCharts);

  constructor() { }

  addChart(chart:AlanChart){
    //if block prevents redundant chart addition
    if (!this.checkChartPresence(chart)){
      this.myUserCharts.push(chart);
    };
  }

  removeChart(chart: AlanChart) {
    const index = this.myUserCharts.indexOf(chart);
    if (index !== -1) {
      this.myUserCharts.splice(index, 1);
    }
  }

  checkChartPresence(chart:AlanChart){
    //returns true or false depending on whether chart is currently in array
    return this.myUserCharts.includes(chart);
  }

  //Uses HTTP Service to retrieve array and emit through userCharts BehaviorSubject
  fetchUserCharts() {
    return true;
  }


  toggleFullscreen(){
    this.cardIsFullscreen = !this.cardIsFullscreen
  }

  checkFullscreen(): boolean{
    return this.cardIsFullscreen
  }

  /* DEBUG

  //Can be called to emit the value stored in myUserCharts
  populateUserCharts(){
    this.userCharts.next(this.myUserCharts);
  } */

}
