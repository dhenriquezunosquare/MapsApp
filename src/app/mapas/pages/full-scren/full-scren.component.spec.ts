import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScrenComponent } from './full-scren.component';

describe('FullScrenComponent', () => {
  let component: FullScrenComponent;
  let fixture: ComponentFixture<FullScrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullScrenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullScrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
