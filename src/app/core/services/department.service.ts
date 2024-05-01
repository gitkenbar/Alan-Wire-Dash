import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Department } from '../../shared/models/department.model';
import { Chart } from '../../shared/models/chart.model';
import { HttpDataService } from './http-data.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  // This is used to locally store the value to be emitted
  private myUserDepartments: String[] = ["Production", "Quality", "Inventory", "Material Cost", "Sales", "Wires", "Irrigation", "Bobbles"];

  //BehaviorSubject holds and emits an array of departments the user has access to
  userDepartments = new BehaviorSubject<String[] | null>(this.myUserDepartments);

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
