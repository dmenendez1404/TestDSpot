import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeksDetailsCaruselComponent } from './weeks-details-carusel.component';

describe('WeeksDetailsCaruselComponent', () => {
  let component: WeeksDetailsCaruselComponent;
  let fixture: ComponentFixture<WeeksDetailsCaruselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeksDetailsCaruselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeksDetailsCaruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
