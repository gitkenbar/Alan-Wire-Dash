import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../../shared/models/department.model';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AlanChart } from '../../shared/models/alan-chart.model';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  constructor(private http:HttpClient) { };

  getUserDepartments(id:number): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.apiUrl}/user/${id}/user_departments/`).pipe(
      catchError(this.handleError)
    )
  }

  getUserCharts(id:number): Observable<AlanChart[]> {
    return this.http.get<AlanChart[]>(`${environment.apiUrl}/user/${id}/user_charts`).pipe(
      catchError(this.handleError)
    )
  }

  addUserCharts(id:number, data:any) {
    return this.http.post<AlanChart[]>(`${environment.apiUrl}/user/${id}/user_charts`, data).pipe(
      catchError(this.handleError)
    )
  }

  getMetalPrices(): Observable<any>{
    return this.http.get(`${environment.metalApiUrl}?api_key=${environment.metalApiKey}`).pipe(
      catchError(this.handleError)
    )
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
    return this.http.post<AlanChart[]>(`${environment.apiUrl}/user/${id}/user_department`, data).pipe(
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
