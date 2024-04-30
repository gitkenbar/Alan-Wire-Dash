import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentService } from '../../../core/services/department.service';
import { Subscription } from 'rxjs';
import { Department } from '../../models/department.model';
import { Chart } from '../../models/chart.model';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, OnDestroy{
  isSidebarVisible:boolean = false;
  displayingCharts:string | null = null;
  menuDepartments:Department[] | null = [];
  private userDepartmentSubscription!: Subscription;

  constructor(
    private departmentService:DepartmentService,
    private sidebar:SidebarService
  ) {
  }

  ngOnInit(): void {
    this.userDepartmentSubscription = this.departmentService.userDepartments.subscribe(departments => {
      this.menuDepartments = departments;
    });
  }

  ngOnDestroy(): void {
    this.userDepartmentSubscription.unsubscribe();
  }

  // This method will toggle the display of charts within a given department in the sidebar
  displayCharts(matchValue:string){
    //Passes in the department_name as matchValue and checks for a match
    if(this.displayingCharts == matchValue) {
      //If it does match (meaning menu is open) it resets it to null
      this.displayingCharts = null;
    } else {
      //Else it sets it equal so the menu opens
    this.displayingCharts = matchValue;
    }
  }


  checkSidebar(): boolean{
    return this.sidebar.isSidebarVisible
  }

  toggleSidebar(){
    this.sidebar.toggleSidebar()
    setTimeout(() => {
      const sidebarTexts = document.querySelectorAll('.sidebar-text');
      sidebarTexts.forEach((element: Element) => {
        const text = element as HTMLElement;
        text.style.opacity = this.isSidebarVisible ? '1' : '0';
      });
    }, 100);
  }

}
