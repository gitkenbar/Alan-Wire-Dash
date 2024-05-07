import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  constructor(private sidebarService:SidebarService, private authService: AuthenticationService, private router: Router) { }

  isSideBarVisible(){
    return this.sidebarService.isSidebarVisible;
  }

  toggleSidebar(){
    this.sidebarService.toggleSidebar();
  }

  onLogout() {
    this.authService.logout().subscribe(({
      next: (res: any) => {
        console.log('logout response ', res)
        this.router.navigate(['/login']);
        this.authService.deleteToken()
      },
      error: (error: any) => {
        console.error("logout error", error)
      }
    }))
  }
}
  //Remnants of outsourcing this to SideBar. Can be deleted on next merge:

  // ngOnInit(): void {
    //   this.userDepartmentSubscription = this.departmentService.userDepartments.subscribe(departments => {
  //     this.menuDepartments = departments;
  //   });
  // }

  // ngOnDestroy(): void {
  //   this.userDepartmentSubscription.unsubscribe();
  // }

  // // This method will toggle the display of charts within a given department in the sidebar
  // displayCharts(matchValue:string){
  //   //Passes in the department_name as matchValue and checks for a match
  //   if(this.displayingCharts == matchValue) {
  //     //If it does match (meaning menu is open) it resets it to null
  //     this.displayingCharts = null;
  //   } else {
  //     //Else it sets it equal so the menu opens
  //   this.displayingCharts = matchValue;
  //   }
  // }

  // //Adds the selected chart
  // addChart(chart:Chart) {
  //   this.chartService.addChart(chart);
  // }

  // checkChartStatus(chart:Chart){
  //   return this.chartService.checkChartPresence(chart);
  // }

  //Seems a bit redundant....

  //   let mySVG = document.getElementById('mySVG')
  //   console.log(mySVG?.getAttribute("margin-right"))
  //   this.isSidebarVisible = !this.isSidebarVisible
  //   if(this.isSidebarVisible){
  //     mySVG?.setAttribute("width", "-150")

  // checkSidebar(): boolean{
  //   return this.sidebar.isSidebarVisible
  // }

  // toggleSidebar(){
  //   this.sidebar.toggleSidebar()
  // }
  //}

