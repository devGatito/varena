import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrochureComponent } from './brochure.component';

describe('BrochureComponent', () => {
  let component: BrochureComponent;
  let fixture: ComponentFixture<BrochureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrochureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrochureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
