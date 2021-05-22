import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionActivateProdComponent } from './instruction-activate-prod.component';

describe('InstuctionActivateProdComponent', () => {
  let component: InstructionActivateProdComponent;
  let fixture: ComponentFixture<InstructionActivateProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructionActivateProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionActivateProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
