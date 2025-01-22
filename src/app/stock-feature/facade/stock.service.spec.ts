import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { initialStocks, Stock } from '../stock.model';
import { StockService } from './stock.service';

describe('StockService', () => {
  let service: StockService;
  let stocksSubject: BehaviorSubject<Stock[]>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [StockService] });
    service = TestBed.inject(StockService);
    stocksSubject = service['stocksSubject'] as BehaviorSubject<Stock[]>; // Access private property for testing
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose stocks$ as an observable of initialStocks', () => {
    const expectedStocks = initialStocks;
    let actualStocks: Stock[] | undefined;

    service.stocks$.subscribe((stocks) => (actualStocks = stocks));

    expect(actualStocks).toEqual(expectedStocks);
  });

  it('updatePrice should update the currentPrice of the matching stock', () => {
    const symbolToUpdate = 'AAPL';
    const newPrice = 120;

    const initialStock = initialStocks.find(
      (stock) => stock.symbol === symbolToUpdate
    );
    if (!initialStock) {
      fail('Initial stock with symbol "AAPL" not found in initialStocks');
    }

    const updatedStocks = [...initialStocks];
    const updatedStockIndex = updatedStocks.findIndex(
      (stock) => stock.symbol === symbolToUpdate
    );
    updatedStocks[updatedStockIndex].currentPrice = newPrice;

    stocksSubject.next(initialStocks); // Set initial state

    service.updatePrice(symbolToUpdate, newPrice);

    expect(stocksSubject.getValue()).toEqual(updatedStocks);
  });

  it('updatePrice should not modify stocks if symbol is not found', () => {
    const symbolToUpdate = 'UNKNOWN';
    const newPrice = 150;

    stocksSubject.next(initialStocks); // Set initial state

    service.updatePrice(symbolToUpdate, newPrice);

    expect(stocksSubject.getValue()).toEqual(initialStocks);
  });

  it('togglePriceUpdates should toggle isPriceUpdating of the matching stock', () => {
    const symbolToUpdate = 'GOOG';

    const initialStock = initialStocks.find(
      (stock) => stock.symbol === symbolToUpdate
    );
    if (!initialStock) {
      fail('Initial stock with symbol "GOOG" not found in initialStocks');
    }

    const updatedStocks = [...initialStocks];
    const updatedStockIndex = updatedStocks.findIndex(
      (stock) => stock.symbol === symbolToUpdate
    );
    updatedStocks[updatedStockIndex].isPriceUpdating =
      !initialStock.isPriceUpdating;

    stocksSubject.next(initialStocks); // Set initial state

    service.togglePriceUpdates(symbolToUpdate);

    expect(stocksSubject.getValue()).toEqual(updatedStocks);
  });

  it('togglePriceUpdates should not modify stocks if symbol is not found', () => {
    const symbolToUpdate = 'UNKNOWN';

    stocksSubject.next(initialStocks); // Set initial state

    service.togglePriceUpdates(symbolToUpdate);

    expect(stocksSubject.getValue()).toEqual(initialStocks);
  });
});
