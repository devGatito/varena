import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGalleryComponent } from './modal-gallery.component';

describe('ModalGalleryComponent', () => {
  let component: ModalGalleryComponent;
  let fixture: ComponentFixture<ModalGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
