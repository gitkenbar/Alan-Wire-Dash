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
