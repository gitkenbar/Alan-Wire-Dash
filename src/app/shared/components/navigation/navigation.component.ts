import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentService } from '../../../core/services/department.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, OnDestroy{
  isSidebarVisible:boolean = false;
  menuDepartments:String[] | null = ["derp"];
  private userDepartmentSubscription!: Subscription;

  constructor(private departmentService:DepartmentService) {
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
  displayCharts(department:String){
    return true;
  }

  toggleSidebar(){
    let mySVG = document.getElementById('mySVG')
    console.log(mySVG?.getAttribute("margin-right"))
    this.isSidebarVisible = !this.isSidebarVisible
    if(this.isSidebarVisible){
      mySVG?.setAttribute("width", "-150")

    } else {
      mySVG?.setAttribute("viewBox", "0")
    };

    setTimeout(() => {
      const sidebarTexts = document.querySelectorAll('.sidebar-text');
      sidebarTexts.forEach((element: Element) => {
        const text = element as HTMLElement;
        text.style.opacity = this.isSidebarVisible ? '1' : '0';
      });
    }, 100);
  }
}
