import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  showSteps = false;

  toggleSteps(event: Event) {
    event.preventDefault();
    this.showSteps = !this.showSteps;
  }
}
