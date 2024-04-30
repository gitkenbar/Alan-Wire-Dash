import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../../shared/models/department.model';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  constructor(private http:HttpClient) { };

  getUserDepartments(id:number): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.apiUrl}/user/${id}/user_departments/`)
  }

  // ADMIN ONLY
  getAllDepartments() {
    return this.http.get<Department[]>(`${environment.apiUrl}/departments`)
  }

  getUserCharts(id:number) {
    return this.http.get<Department[]>(`${environment.apiUrl}/user/${id}/user_charts`)
  }

  getAuth() {

  }

  private handleError(error: any) {
    console.error('FAIL, client side', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
