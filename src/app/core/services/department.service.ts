import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Department } from '../../shared/models/department.model';
import { AlanChart } from '../../shared/models/alan-chart.model';
import { HttpDataService } from './http-data.service';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  //The following two variables only exist for debug. They are relevant when the backend is not running. Eventually they can be safely deleted.
  private myUserDepartments:Department[] = [
    new Department("Bobbles", [
      new AlanChart("Bobble Sales", `
      {
        "type": "line",
        "data": {
          "labels": ["R", "O", "Y", "G", "B", "I", "V"],
          "datasets": [{
            "label": "An Example Data",
            "data": [65, 59, 80, 81, 90, 92, 96],
            "fill": false,
            "borderColor": "rgb(0, 255, 0)",
            "tension": 0.1
          }]
        }
      }
    `),
      new AlanChart("Bobble Futures", `
      {
        "type": "line",
        "data": {
          "labels": ["R", "O", "Y", "G", "B", "I", "V"],
          "datasets": [{
            "label": "An Example Data",
            "data": [12, 35, 75, 81, 55, 67, 99],
            "fill": false,
            "borderColor": "green",
            "tension": 0.1
          }]
        }
      }
    `),
    ]),
    new Department("Widgets", []),
    new Department("Wires", [
      new AlanChart("Wire Shenanigans", `
      {
        "type": "bar",
        "data": {
          "labels": ["January", "February", "March", "April", "May", "June", "July"],
          "datasets": [{
            "label": "Monthly Sales",
            "data": [65, 59, 80, 81, 56, 55, 40],
            "backgroundColor": "red",
            "borderColor": "red",
            "borderWidth": 1
          }]
        },
        "options": {
          "scales": {
            "y": {
              "beginAtZero": true
            }
          }
        }
      }
  `)]
  )
  ];
  userDepartments = <Department[] | null> (this.myUserDepartments);

  constructor(private httpService:HttpDataService) {  }

  //Uses HTTP Service to retrieve array and emit through userDepartments BehaviorSubject
  // fetchAllDepartments() : Observable<Department[]>{
  //   return this.httpService.getAllDepartments().pipe(
  //     map((responseData) => {
  //       const departments: Department[] = responseData.data.departments.map((departmentData:any) => {
  //         return new Department(
  //           departmentData.department_name,
  //           //WORK GOES HERE
  //           //This should map the charts with each department
  //           []
  //         );
  //       });
  //       return departments;
  //     }),
  //     catchError((error) => {
  //       console.error('Error fetching departments', error);
  //       return throwError(() => error);
  //     })
  //   );
  // }


  fetchUserDepartments(): Observable<Department[]>{
    return this.httpService.getUserDepartments().pipe(
      map((responseData) => {
        const departments: Department[] = responseData.data.profile.map((departmentData:any) => {
          return new Department(
            departmentData.department_name,
            //WORK GOES HERE
            //This should map the charts with each department
            []
          );
        });
        return departments;
      }),
      catchError((error) => {
        console.error('Error fetching departments', error);
        return throwError(() => error);
      })
    );
  }


}
