import { ComponentFixture, TestBed } from '@angular/core/testing';

import { modelOlivia } from './model-olivia.component';

describe('modelOlivia', () => {
  let component: modelOlivia;
  let fixture: ComponentFixture<modelOlivia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [modelOlivia]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(modelOlivia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
