import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {


  constructor(private sidebar:SidebarService){}

  checkSidebar(): boolean{
    return this.sidebar.isSidebarVisible
  }

  toggleSidebar(){
    this.sidebar.toggleSidebar()
  }
}
