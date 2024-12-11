import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MoreInformationComponent } from '../../components/more-information/more-information.component';
import { LocationComponent } from '../../components/location/location.component';
import { BrochureComponent } from '../../components/brochure/brochure.component';
import { CommonModule } from '@angular/common';
import { modelsComponent } from '../../components/models/models.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { ModalGalleryComponent } from '../../components/modal-gallery/modal-gallery.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { PromoModalComponent } from '../../components/promo-modal/promo-modal.component';
import { FormComponent } from '../../components/form/form.component';
import { FolletoModalComponent } from '../../components/folleto-modal/folleto-modal.component';
import { WhatsappFormComponent } from '../../components/whatsapp-form/whatsapp-form.component';
import { PopupComponent } from '../../components/popup/popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HeaderComponent,
    MoreInformationComponent,
    LocationComponent,
    BrochureComponent,
    CommonModule,
    modelsComponent,
    BannerComponent,
    GalleryComponent,
    ModalGalleryComponent,
    PromoModalComponent,
    FormComponent,
    FolletoModalComponent,
    WhatsappFormComponent,
    PopupComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
