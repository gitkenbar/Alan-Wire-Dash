import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSandboxComponent } from './chart-sandbox.component';

describe('ChartSandboxComponent', () => {
  let component: ChartSandboxComponent;
  let fixture: ComponentFixture<ChartSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartSandboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
