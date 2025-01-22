import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { initialStocks, Stock } from '../stock.model';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stocksSubject = new BehaviorSubject<Stock[]>(initialStocks);
  stocks$: Observable<Stock[]> = this.stocksSubject.asObservable();

  updatePrice(symbol: string, newPrice: number): void {
    this.stocksSubject.getValue().forEach((stock) => {
      if (stock.symbol === symbol) {
        stock.currentPrice = newPrice;
      }
    });
    this.stocksSubject.next(this.stocksSubject.getValue()); // Emit updated data
  }

  togglePriceUpdates(symbol: string): void {
    this.stocksSubject.getValue().forEach((stock) => {
      if (stock.symbol === symbol) {
        stock.isPriceUpdating = !stock.isPriceUpdating;
      }
    });
    this.stocksSubject.next(this.stocksSubject.getValue());
  }
}
