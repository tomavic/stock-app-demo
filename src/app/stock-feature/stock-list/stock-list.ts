import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StockCardComponent } from '../stock-card/stock-card';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, StockCardComponent],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">Stock App</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        @for (stock of stocks$ | async; track $index) {
        <app-stock-card [stock]="stock"></app-stock-card>
        }
      </div>
    </div>
  `,
})
export class StockListComponent {
  stocks$: Observable<Stock[]> | undefined;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stocks$ = this.stockService.stocks$;
  }
}
