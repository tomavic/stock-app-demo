import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Stock } from '../stock.model';
import { generateNormalDistribution, StockCardComponent } from './stock-card';

describe('StockCardComponent', () => {
  let component: StockCardComponent;
  let fixture: ComponentFixture<StockCardComponent>;
  let stock: Stock;
  let checkboxDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCardComponent);
    component = fixture.componentInstance;

    stock = {
      symbol: 'AAPL',
      companyName: 'Apple',
      currentPrice: 100,
      dailyHigh: 102,
      dailyLow: 98,
      weeklyHigh: 105,
      weeklyLow: 95,
      isPriceUpdating: true,
    };

    component.stock = stock;
    fixture.detectChanges();

    checkboxDebugElement = fixture.debugElement.query(
      By.css('input[type="checkbox"]')
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display company name and symbol', () => {
    const h2Element = fixture.debugElement.query(By.css('h2'));
    expect(h2Element?.nativeElement.textContent).toContain(stock.companyName);
    expect(h2Element?.nativeElement.textContent).toContain(stock.symbol);
  });

  xit('should display current price', () => {
    const currentPriceElement = fixture.debugElement.query(
      By.css('.current-price-container')
    );

    expect(currentPriceElement?.nativeElement.textContent).toContain(
      stock.currentPrice.toString()
    );
  });

  xit('should display daily high', () => {
    const dailyHighElement = fixture.debugElement.query(
      By.css('p:contains("Daily High:")')
    );
    expect(dailyHighElement?.nativeElement.textContent).toContain(
      stock.dailyHigh.toString()
    );
  });

  xit('should display daily low', () => {
    const dailyLowElement = fixture.debugElement.query(
      By.css('p:contains("Daily Low:")')
    );
    expect(dailyLowElement?.nativeElement.textContent).toContain(
      stock.dailyLow.toString()
    );
  });

  xit('should display 52 week high and low for medium and larger screens', () => {
    const weeklyHighElement = fixture.debugElement.query(
      By.css('p:contains("52 Week High:")')
    );
    const weeklyLowElement = fixture.debugElement.query(
      By.css('p:contains("52 Week Low:")')
    );
    expect(weeklyHighElement).toBeTruthy();
    expect(weeklyLowElement).toBeTruthy();
  });

  xit('should apply green background when priceChange is positive', () => {
    component.priceChange.set(10);
    fixture.detectChanges();
    const cardElement = fixture.debugElement.query(
      By.css('.border.rounded-lg')
    );
    expect(cardElement?.nativeElement.classList).toContain('bg-green-500');
  });

  it('should apply red background when priceChange is negative', () => {
    component.priceChange.set(-10);
    fixture.detectChanges();
    const cardElement = fixture.debugElement.query(
      By.css('.border.rounded-lg')
    );
    expect(cardElement?.nativeElement.classList).toContain('bg-red-500');
  });

  it('should apply gray background and remove shadow when isUpdating is false', () => {
    component.isUpdating.set(false);
    fixture.detectChanges();

    const cardElement = fixture.debugElement.query(
      By.css('.border.rounded-lg')
    );
    expect(cardElement?.nativeElement.classList).toContain('bg-gray-100');
    expect(cardElement?.nativeElement.classList).toContain('shadow-none');
  });

  it('should toggle isUpdatingInternal and call onToggleChange on checkbox click', () => {
    expect(component.isUpdatingInternal).toBe(true); // Initial state

    // Check if the checkbox element was found
    if (!checkboxDebugElement) {
      fail('Checkbox element not found in the component');
    }

    checkboxDebugElement.triggerEventHandler('change', {
      target: { checked: false },
    });
    fixture.detectChanges();
    expect(component.isUpdatingInternal).toBe(false);

    checkboxDebugElement.triggerEventHandler('change', {
      target: { checked: true },
    });
    fixture.detectChanges();
    expect(component.isUpdatingInternal).toBe(true);
  });
});

describe('generateNormalDistribution', () => {
  it('should generate a number within a reasonable range', () => {
    const mean = 0;
    const stdDev = 1;
    const result = generateNormalDistribution(mean, stdDev);

    // This is a heuristic check, not a rigorous statistical test
    expect(result).toBeGreaterThanOrEqual(-3);
    expect(result).toBeLessThanOrEqual(3);
  });

  it('should generate different values on multiple calls', () => {
    const mean = 0;
    const stdDev = 1;
    const results = [];
    for (let i = 0; i < 10; i++) {
      results.push(generateNormalDistribution(mean, stdDev));
    }

    // Check if at least some of the results are different
    expect(new Set(results).size).toBeGreaterThan(1);
  });
});
