import { ComponentFixture, TestBed } from '@angular/core/testing';

import { modelsComponent } from './models.component';

describe('modelsComponent', () => {
  let component: modelsComponent;
  let fixture: ComponentFixture<modelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [modelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(modelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
