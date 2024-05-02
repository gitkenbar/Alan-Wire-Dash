import { Component } from '@angular/core';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { ChartDisplayComponent } from '../../shared/components/chart-display/chart-display.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavigationComponent, ChartDisplayComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  title = ' Dashboard - Alan Wire ';
}
