import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { Stock } from '../stock.model';

@Component({
  selector: 'app-stock-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-card.html',
})
export class StockCardComponent implements OnInit, OnDestroy {
  @Input() stock!: Stock;
  currentPrice = signal(0);
  previousPrice = signal(0);
  priceChange = signal(0);
  isUpdating = signal(false);
  isUpdatingInternal = false;
  private updateSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.currentPrice.set(this.stock.currentPrice);
    this.isUpdatingInternal = this.stock.isPriceUpdating;
    this.isUpdating.set(this.isUpdatingInternal);
    this.startPriceUpdates();
  }

  ngOnDestroy(): void {
    this.stopPriceUpdates();
  }

  onToggleChange() {
    this.isUpdating.set(this.isUpdatingInternal);
    if (this.isUpdating()) {
      this.startPriceUpdates();
    } else {
      this.stopPriceUpdates();
    }
  }

  private startPriceUpdates() {
    if (this.updateSubscription || !this.isUpdating()) {
      return;
    }

    this.updateSubscription = interval(3000).subscribe(() => {
      this.previousPrice.set(this.currentPrice());

      // Realistic price change simulation
      const currentPriceValue = this.currentPrice();
      const volatility = currentPriceValue * 0.02; // Volatility as a percentage of the current price (adjust as needed)
      const priceChange = generateNormalDistribution(0, volatility);

      this.currentPrice.update((value) => value + priceChange);
      this.priceChange.set(this.currentPrice() - this.previousPrice());
    });
  }

  private stopPriceUpdates() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
      this.updateSubscription = undefined;
    }
  }
}

// Function to generate normally distributed random numbers (Box-Muller transform)
export function generateNormalDistribution(
  mean: number,
  stdDev: number
): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return num * stdDev + mean;
}
