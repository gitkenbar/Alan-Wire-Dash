import { Component, OnInit, Pipe } from '@angular/core';
import { HttpDataService } from '../../../core/services/http-data.service';
import { CurrencyPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-metal-price',
  standalone: true,
  imports: [NgIf, NgClass, CurrencyPipe],
  templateUrl: './metal-price.component.html',
  styleUrl: './metal-price.component.scss'
})
export class MetalPriceComponent implements OnInit{
  metalPrice: any;

  constructor(private http:HttpDataService) {}

  ngOnInit() {
    this.http.getMetalPrices().subscribe({
      next: (data:any) => {
        this.metalPrice = data;
        console.log(data)
      },
      error: (error:any) => {
        console.error(error)
      }
    })
  }
}
