import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalPriceComponent } from './metal-price.component';

describe('MetalPriceComponent', () => {
  let component: MetalPriceComponent;
  let fixture: ComponentFixture<MetalPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetalPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetalPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
