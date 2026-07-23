import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { TrustBannerComponent } from './components/trust-banner/trust-banner.component';
import { WhyChooseComponent } from './components/why-choose/why-choose.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { BookingInfoComponent } from './components/booking-info/booking-info.component';
import { AstrologersComponent } from './components/astrologers/astrologers.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FaqComponent } from './components/faq/faq.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-live-astrology-consultation',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    NavbarComponent,
    BannerComponent,
    TrustBannerComponent,
    WhyChooseComponent,
    QuestionsComponent,
    HowItWorksComponent,
    BookingInfoComponent,
    AstrologersComponent,
    TestimonialsComponent,
    FaqComponent,
    FooterComponent
  ],
  templateUrl: './live-astrology-consultation.html',
  styleUrl: './live-astrology-consultation.css',
})
export class LiveAstrologyConsultation {}
