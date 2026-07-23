import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isSearchOpen = signal(false);
  activeMenu = signal('Consultation');

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  toggleSearch() {
    this.isSearchOpen.update(v => !v);
  }

  setActiveMenu(menu: string) {
    this.activeMenu.set(menu);
  }
}
