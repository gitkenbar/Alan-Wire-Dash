import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  // This is used to locally store the value to be emitted
  private myUserDepartments: String[] = ["Production", "Quality", "Inventory", "Material Cost", "Sales", "Wires", "Irrigation", "Bobbles"];

  //BehaviorSubject holds and emits an array of departments the user has access to
  userDepartments = new BehaviorSubject<String[] | null>(this.myUserDepartments);

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
