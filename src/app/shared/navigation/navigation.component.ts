import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  isSidebarVisible:boolean = false;


  toggleSidebar(){
    let mySVG = document.getElementById('mySVG')
    console.log(mySVG?.getAttribute("margin-right"))
    this.isSidebarVisible = !this.isSidebarVisible
    if(this.isSidebarVisible){
      mySVG?.setAttribute("width", "-150")

    } else {
      mySVG?.setAttribute("viewBox", "0")

    }
  }
}
