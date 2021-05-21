import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowGetTokenComponent } from './how-get-token.component';

describe('HowGetTockenComponent', () => {
  let component: HowGetTokenComponent;
  let fixture: ComponentFixture<HowGetTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowGetTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowGetTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
