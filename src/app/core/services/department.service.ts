import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Department } from '../../shared/models/department.model';
import { Chart } from '../../shared/models/chart.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  // This is used to locally store the value to be emitted
  private myUserDepartments:Department[] = [
    new Department("Bobbles", [
      new Chart("Bobble Sales", `
        <body>
          <canvas id="myChart" width="400" height="400"></canvas>
        </body>
    `),
      new Chart("Bobble Futures", `
        <body>
          <canvas id="myChart" width="400" height="400"></canvas>
        </body>
    `),
    ]),
    new Department("Widgets", []),
    new Department("Wires", [
      new Chart("Wire Shenanigans", `
      <body>
        <canvas id="myChart" width="400" height="400"></canvas>
      </body>
  `)]
  )];

  //BehaviorSubject holds and emits an array of departments the user has access to
  userDepartments = new BehaviorSubject<Department[] | null>(this.myUserDepartments);

  constructor() { }

  //Uses HTTP Service to retrieve array and emit through userDepartments BehaviorSubject
  fetchUserDepartments() {
    return true;
  }

  //Can be called to emit the value stored in myUserDepartments
  populateUserDepartments(){
    this.userDepartments.next(this.myUserDepartments);
  }


}
