import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../../shared/models/department.model';
import { Observable, catchError, throwError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AlanChart } from '../../shared/models/alan-chart.model';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  constructor(private http:HttpClient) { };

  getUserDepartments(id:number): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.apiUrl}/profile/${id}/departments/`).pipe(
      catchError(this.handleError)
    )
  }

  //Make this Work
  getUserCharts(id:number): Observable<AlanChart[]> {
    let res = this.http.get<any>(`${environment.apiUrl}/profile/${id}/charts`)
    .pipe(
      catchError(this.handleError)
    );
    return res;
  }

  addUserCharts(id:number, data:any) {
    return this.http.post<AlanChart[]>(`${environment.apiUrl}/profile/${id}/charts`, data).pipe(
      catchError(this.handleError)
    )
  }

  getMetalPrices(): Observable<any> {
    const staticMetalPrices = {
      "status": "success",
      "timestamp": "2024-05-16T18:51:01.430Z",
      "currency": "USD",
      "unit": "mt",
      "metal": "copper",
      "rate": {
        "price": 10726.5049,
        "ask": 10727.7024,
        "bid": 10721.7059,
        "high": 10966.5955,
        "low": 10625.011,
        "change": -69.0268,
        "change_percent": -0.64
      }
    };

    // Return the static object wrapped in an Observable
    return of(staticMetalPrices);

    //Comment In when Live
    // return this.http.get(`${environment.metalApiUrl}?api_key=${environment.metalApiKey}&metal=copper&currency=USD&unit=g`).pipe(
    //   catchError(this.handleError)
    // )
  }




  // ADMIN ONLY

  // WORKING HERE
  getAllDepartments(): Observable<any> {
    let res = this.http.get<any>(`${environment.apiUrl}/departments`)
    .pipe(
      catchError(this.handleError)
    );
    return res;
  }

  addUserDepartments(id:number, data:any) {
    return this.http.post<AlanChart[]>(`${environment.apiUrl}/profile/${id}/department`, data).pipe(
      catchError(this.handleError)
    )
  }



  getAuth() {

  }

  private handleError(error: any) {
    console.error('FAIL, client side', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
