import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError, throwError } from 'rxjs';
import { Department } from '../../shared/models/department.model';
import { AlanChart } from '../../shared/models/alan-chart.model';
import { HttpDataService } from './http-data.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private myUserCharts:AlanChart[] = []

  cardIsFullscreen: boolean = false;

  //BehaviorSubject holds and emits an array of charts the user has access to
  userCharts = new BehaviorSubject<AlanChart[] | null>(this.myUserCharts);

  constructor(private httpService:HttpDataService) { }

  toggleChart(chart:AlanChart){
    //if block prevents redundant chart addition
    if (!this.checkChartPresence(chart)){
      this.myUserCharts.push(chart);
    } else {
      let remove = this.myUserCharts.indexOf(chart)
      this.myUserCharts.splice(remove, 1)};
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
  fetchUserCharts() : Observable<any>{
    return this.httpService.getUserCharts().pipe(
      map((responseData) => {
        console.log('user_chart response data', responseData);
        const returnedUserCharts:AlanChart[] = responseData.data.user_charts.map((userChartData:any) => {
          return new AlanChart(
            userChartData.title,
            userChartData.chart_data
          );
        });
        this.userCharts.next(returnedUserCharts)
      }),
      catchError((error) => {
        console.error('Error fetching user_charts', error);
        return throwError(() => error);
      })
    );
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
