import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolletoModalComponent } from './folleto-modal.component';

describe('FolletoModalComponent', () => {
  let component: FolletoModalComponent;
  let fixture: ComponentFixture<FolletoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolletoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FolletoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
