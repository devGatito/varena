import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappFormComponent } from './whatsapp-form.component';

describe('WhatsappFormComponent', () => {
  let component: WhatsappFormComponent;
  let fixture: ComponentFixture<WhatsappFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsappFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhatsappFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
