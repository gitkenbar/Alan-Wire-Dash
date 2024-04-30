import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public isSidebarVisible:boolean = false;

  constructor() { }

  toggleSidebar(){
    this.isSidebarVisible = !this.isSidebarVisible
    setTimeout(() => {
      const sidebarTexts = document.querySelectorAll('.sidebar-text');
      sidebarTexts.forEach((element: Element) => {
        const text = element as HTMLElement;
        text.style.opacity = this.isSidebarVisible ? '1' : '0';
      });
    }, 100);
  }
}
