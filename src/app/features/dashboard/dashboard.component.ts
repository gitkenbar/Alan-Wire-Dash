import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { ChartDisplayComponent } from '../../shared/components/chart-display/chart-display.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { SidebarService } from '../../core/services/sidebar.service';
import { ChartSandboxComponent } from '../../shared/components/chart-display/chart-sandbox/chart-sandbox.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, ChartDisplayComponent, SidebarComponent, ChartSandboxComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  title = ' Dashboard - Alan Wire ';
  constructor(private sidebar:SidebarService){}

  checkSidebar(): boolean{
    return this.sidebar.isSidebarVisible
  }
}
