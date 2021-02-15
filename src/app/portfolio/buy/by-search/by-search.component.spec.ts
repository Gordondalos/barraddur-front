import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BySearchComponent } from './by-search.component';

describe('BySearchComponent', () => {
  let component: BySearchComponent;
  let fixture: ComponentFixture<BySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BySearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
