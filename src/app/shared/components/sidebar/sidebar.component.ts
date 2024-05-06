import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentService } from '../../../core/services/department.service';
import { Subscription } from 'rxjs';
import { Department } from '../../models/department.model';
import { UserChart } from '../../models/user-chart.model';
import { ChartService } from '../../../core/services/chart.service';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy{
  displayingCharts:string | null = null;
  menuDepartments:Department[] | null = [];
  private userDepartmentSubscription!: Subscription;

  constructor(
    private departmentService:DepartmentService,
    private sidebarService:SidebarService,
    private chartService:ChartService
  ) {}

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
    // Expands the sidebar, if it is minimized
    if(!this.sidebarService.isSidebarVisible){
      this.sidebarService.toggleSidebar()
    }
    //Passes in the department_name as matchValue and checks for a match
    if(this.displayingCharts == matchValue) {
      //If it does match (meaning menu is open) it resets it to null
      this.displayingCharts = null;
    } else {
      //Else it sets it equal so the menu opens
    this.displayingCharts = matchValue;
    }
  }

  //Adds the selected chart
  addChart(chart:UserChart) {
    this.chartService.addChart(chart);
  }

  checkChartStatus(chart:UserChart){
    return this.chartService.checkChartPresence(chart);
  }

  //Seems a bit redundant....
  isSideBarVisible(){
    return this.sidebarService.isSidebarVisible;
  }

  toggleSidebar(){
    this.sidebarService.toggleSidebar();
  }

}
