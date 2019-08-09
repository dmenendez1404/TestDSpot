import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeksPeriodsCaruselComponent } from './weeks-periods-carusel.component';

describe('WeeksPeriodsCaruselComponent', () => {
  let component: WeeksPeriodsCaruselComponent;
  let fixture: ComponentFixture<WeeksPeriodsCaruselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeksPeriodsCaruselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeksPeriodsCaruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
