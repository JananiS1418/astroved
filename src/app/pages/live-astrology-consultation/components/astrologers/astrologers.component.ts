import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-astrologers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './astrologers.component.html',
  styleUrl: './astrologers.component.css'
})
export class AstrologersComponent {
  astrologers = [
    {
      name: 'VijayaPrabu',
      image: 'assets/fav-icon/image copy 3.png',
      rating: '4.9 (450+ reviews)',
      experience: '9 Years Exp.',
      skills: ['Vedic Astrology', 'Nadi Astrology', 'Medical Astrology', 'Degree system'],
      languages: 'Tamil, English, Hindi',
      price: '$45 / 30 min',
      status: 'active'
    },
    {
      name: 'Janardhanan',
      image: 'assets/fav-icon/image copy 2.png',
      rating: '5.0 (820+ reviews)',
      experience: '12 Years Exp.',
      skills: ['Vedic Astrology', 'KP Horary', 'Numerology', 'Vastu', 'Gemology', 'Astro-numerology'],
      languages: 'Tamil, English, Telugu, Malayalam, Kannada',
      price: '$55 / 30 min',
      status: 'active'
    },
    {
      name: 'Bala Murugan',
      image: 'assets/fav-icon/image copy.png',
      rating: '4.8 (310+ reviews)',
      experience: '5 Years Exp.',
      skills: ['Vedic Astrology', 'Prasana Method', 'KP Astrology', 'Tarot Reading'],
      languages: 'Tamil, English',
      price: '$35 / 30 min',
      status: 'busy'
    },
    {
      name: 'Senthil Nathan',
      image: 'assets/fav-icon/image.png',
      rating: '4.9 (500+ reviews)',
      experience: '9 Years Exp.',
      skills: ['Vedic Astrology', 'BNN', 'Tarot Card Reading', 'Samhitha', 'Prasnam', 'Tajika', 'Western Astrology', 'Vastu', 'Muhurtha'],
      languages: 'Tamil, English',
      price: '$40 / 30 min',
      status: 'active'
    }
  ];

  getVisibleSkills(skills: string[]): string {
    return skills.slice(0, 4).join(', ');
  }
}
