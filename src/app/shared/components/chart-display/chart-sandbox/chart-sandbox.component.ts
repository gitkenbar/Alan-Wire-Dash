import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chart-sandbox',
  standalone: true,
  imports: [],
  templateUrl: './chart-sandbox.component.html',
  styleUrl: './chart-sandbox.component.scss'
})
export class ChartSandboxComponent implements OnInit {

  constructor (){}

  ngOnInit(): void {
    new Chart("displayChart", {
      type: 'line',
      data: {
        labels: ["R", "O", "Y", "G", "B", "I", "V"],
        datasets: [{
          label: 'An Example Data',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    })
  // new Chart("myChart", {
  //     type: 'bar',
  //     data: {
  //       labels: ['Widgets', 'Bobbles', 'Bells', 'Whistles', 'Purple', 'Orange'],
  //       datasets: [{
  //         label: '# of Votes',
  //         data: [12, 19, 3, 5, 2, 3],
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }

}
}

