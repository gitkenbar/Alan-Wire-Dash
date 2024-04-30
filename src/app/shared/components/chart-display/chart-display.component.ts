import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartCardComponent } from './chart-card/chart-card.component';
import { Chart } from '../../models/chart.model';

@Component({
  selector: 'app-chart-display',
  standalone: true,
  imports: [ChartCardComponent],
  templateUrl: './chart-display.component.html',
  styleUrl: './chart-display.component.scss'
})
export class ChartDisplayComponent implements OnInit, OnDestroy {

  //filler data until set with behavior subject
  charts:Chart[] = [
    new Chart("Bobble Sales", `
      <body>
        <h5>Injected HTML:</h5>
      </body>
  `),
    new Chart("Bobble Futures", `
      <body>
        <p style="color: red;">Literally stick a whole webpage in here</p>
      </body>
  `),
  ];

  ngOnInit(): void {
      //Call user-chart.service.ts
  }

  ngOnDestroy(): void {
      //unsubscribe
  }

}
