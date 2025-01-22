import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StockCardComponent } from '../card/stock-card';
import { StockService } from '../facade/stock.service';

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
  stockService = inject(StockService);
  stocks$ = this.stockService.stocks$;
}
