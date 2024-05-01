import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../../shared/models/department.model';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Chart } from '../../shared/models/chart.model';

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

  getUserCharts(id:number): Observable<Chart[]> {
    return this.http.get<Chart[]>(`${environment.apiUrl}/user/${id}/user_charts`).pipe(
      catchError(this.handleError)
    )
  }

  addUserCharts(id:number, data:any) {
    return this.http.post<Chart[]>(`${environment.apiUrl}/user/${id}/user_charts`, data).pipe(
      catchError(this.handleError)
    )
  }



  // ADMIN ONLY
  getAllDepartments() {
    return this.http.get<Department[]>(`${environment.apiUrl}/departments`).pipe(
      catchError(this.handleError)
    )
  }

  addUserDepartments(id:number, data:any) {
    return this.http.post<Chart[]>(`${environment.apiUrl}/user/${id}/user_department`, data).pipe(
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
