import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentService } from '../../../core/services/department.service';
import { Subscription } from 'rxjs';
import { Department } from '../../models/department.model';
import { AlanChart } from '../../models/alan-chart.model';
import { ChartService } from '../../../core/services/chart.service';
import { SidebarService } from '../../../core/services/sidebar.service';
import { MetalPriceService } from '../../../core/services/metal-price.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy{

  universalDepartments: Department[] = [new Department("Expenses", [this.metalPriceService.metalPriceChart!])];
  displayingCharts:string | null = null;
  menuDepartments:Department[] | null = null;
  private userDepartmentSubscription!: Subscription;

  constructor(
    private departmentService:DepartmentService,
    private sidebarService:SidebarService,
    private chartService:ChartService,
    private metalPriceService:MetalPriceService
  ) {}

  ngOnInit(): void {
    this.userDepartmentSubscription = this.departmentService.fetchUserDepartments().subscribe({
      next: (departments: Department[]) => {
        this.menuDepartments = departments;
        this.appendUniversalDepartments();
      },
      error: (error) => {
        //In the event that the server fails (or is not running) it populates menu with the debug values
        this.menuDepartments = this.departmentService.userDepartments;
        console.error('Error fetching departments', error);
        this.appendUniversalDepartments();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userDepartmentSubscription) {
      this.userDepartmentSubscription.unsubscribe();
    }
  }

  appendUniversalDepartments(){
    if(this.menuDepartments) {
      this.menuDepartments.push(...this.universalDepartments);
      };
  }

  // This method will toggle the display of charts within a given department in the sidebar
  displayCharts(department:Department){
    //WORKING HERE
    //WORKING HERE
    //WORKING HERE
  this.departmentService.appendCharts(department);
    // Expands the sidebar, if it is minimized
    if(!this.sidebarService.isSidebarVisible){
      this.sidebarService.toggleSidebar()
    }
    //Passes in the department_name as matchValue and checks for a match
    if(this.displayingCharts == department.department_name) {
      //If it does match (meaning menu is open) it resets it to null
      this.displayingCharts = null;
    } else {
      //Else it sets it equal so the menu opens
    this.displayingCharts = department.department_name;
    }
  }

  //Adds the selected chart
  addChart(chart:AlanChart) {
    this.chartService.toggleChart(chart);
  }

  checkChartStatus(chart:AlanChart){
    return this.chartService.checkChartPresence(chart);
  }

  //Seems a bit redundant....
  isSideBarVisible(){
    return this.sidebarService.isSidebarVisible;
  }

  toggleSidebar(){
    this.sidebarService.toggleSidebar();
  }

  toggleChart(chart:AlanChart){
    this.chartService.toggleChart(chart);
  }
}
