import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Department } from '../../shared/models/department.model';
import { UserChart } from '../../shared/models/user-chart.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private myUserCharts:UserChart[] = []


  //BehaviorSubject holds and emits an array of charts the user has access to
  userCharts = new BehaviorSubject<UserChart[] | null>(this.myUserCharts);

  constructor() { }

  addChart(chart:UserChart){
    //if block prevents redundant chart addition
    if (!this.checkChartPresence(chart)){
      this.myUserCharts.push(chart);
    };
  }

  removeChart(chart: UserChart) {
    const index = this.myUserCharts.indexOf(chart);
    if (index !== -1) {
      this.myUserCharts.splice(index, 1);
    }
  }

  checkChartPresence(chart:UserChart){
    //returns true or false depending on whether chart is currently in array
    return this.myUserCharts.includes(chart);
  }


  //Uses HTTP Service to retrieve array and emit through userCharts BehaviorSubject
  fetchUserCharts() {
    return true;
  }

  //Can be called to emit the value stored in myUserCharts
  populateUserCharts(){
    this.userCharts.next(this.myUserCharts);
  }


}

