import { Component } from '@angular/core';
import { ChartCardComponent } from './chart-card/chart-card.component';

@Component({
  selector: 'app-chart-display',
  standalone: true,
  imports: [ChartCardComponent],
  templateUrl: './chart-display.component.html',
  styleUrl: './chart-display.component.scss'
})
export class ChartDisplayComponent {

}
