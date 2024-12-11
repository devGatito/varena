import { ComponentFixture, TestBed } from '@angular/core/testing';

import { modelLinaria } from './model-linaria.component';

describe('modelLinaria', () => {
  let component: modelLinaria;
  let fixture: ComponentFixture<modelLinaria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [modelLinaria]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(modelLinaria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
