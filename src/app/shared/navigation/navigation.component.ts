import { Component } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  constructor(private sidebar:SidebarService){}

  checkSidebar(): boolean{
    return this.sidebar.isSidebarVisible
  }

  toggleSidebar(){
    this.sidebar.toggleSidebar()
  }
}
