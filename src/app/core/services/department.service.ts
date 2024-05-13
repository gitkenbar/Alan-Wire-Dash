import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Department } from '../../shared/models/department.model';
import { AlanChart } from '../../shared/models/alan-chart.model';
import { HttpDataService } from './http-data.service';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  //Currently this is holding hardcoded data for the sake of engaging the app. We will populate this data with an HTTP request

  // This is used to locally store the value to be emitted
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
            "borderColor": "rgb(255, 0, 0)",
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
            "backgroundColor": "#d0d0d0",
            "borderColor": "#d0d0d0",
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
  )];

  //BehaviorSubject holds and emits an array of departments the user has access to
  userDepartments = new BehaviorSubject<Department[] | null>(this.myUserDepartments);

  constructor(private httpService:HttpDataService) { }

  //Uses HTTP Service to retrieve array and emit through userDepartments BehaviorSubject
  fetchUserDepartments(id:number) {
    this.httpService.getUserDepartments(id).subscribe({
      next: (data:any) => {
        this.userDepartments.next(data);
      },
      error: (error:any) => {
        console.error('Error fetching departments', error);
      }
    })
    return true;
  }

  //Can be called to emit the value stored in myUserDepartments
  populateUserDepartments(){
    this.userDepartments.next(this.myUserDepartments);
  }
}
