import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentService } from '../../../core/services/department.service';
import { Subscription } from 'rxjs';
import { Department } from '../../models/department.model';
import { Chart } from '../../models/chart.model';
import { ChartService } from '../../../core/services/chart.service';
import { SidebarService } from '../../../core/services/sidebar.service';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, OnDestroy{
  displayingCharts:string | null = null;
  menuDepartments:Department[] | null = [];
  private userDepartmentSubscription!: Subscription;

  constructor(
    private departmentService:DepartmentService,
    private sidebar:SidebarService, 
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
  addChart(chart:Chart) {
    this.chartService.addChart(chart);
  }

  checkChartStatus(chart:Chart){
    return this.chartService.checkChartPresence(chart);
  }



  toggleSidebar(){
    let mySVG = document.getElementById('mySVG')
    console.log(mySVG?.getAttribute("margin-right"))
    this.isSidebarVisible = !this.isSidebarVisible
    if(this.isSidebarVisible){
      mySVG?.setAttribute("width", "-150")

  checkSidebar(): boolean{
    return this.sidebar.isSidebarVisible
  }

  toggleSidebar(){
    this.sidebar.toggleSidebar()
  }

}
