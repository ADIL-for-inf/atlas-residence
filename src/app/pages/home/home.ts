import { Component, OnDestroy, ChangeDetectorRef, HostListener, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnDestroy, AfterViewInit {
  rooms = [
    {
      id: 'studio', name: 'Studio with Terrace', badge: 'Populaire', badgeStyle: '',
      images: [
        'assets/studios/1.jpeg','assets/studios/2.jpeg','assets/studios/3.jpeg','assets/studios/4.jpeg',
        'assets/studios/5.jpeg','assets/studios/6.jpeg','assets/studios/7.jpeg','assets/studios/8.jpeg',
        'assets/studios/9.jpeg','assets/studios/10.jpeg'
      ],
      currentIndex: 0, interval: null as any,
      shortDesc: 'Élégant studio de 46m² avec terrasse privée et vue sur la ville.',
      longDesc: 'Notre Studio with Terrace est un véritable havre de paix de 46m², pensé pour offrir confort et élégance au cœur de Rabat Agdal. Doté d\'une terrasse privée avec vue sur la ville, il allie mobilier contemporain de qualité et touches décoratives marocaines authentiques. Literie hypoallergénique, TV 48" Smart, kitchenette équipée, Wi-Fi fibre haut débit, climatisation silencieuse et coffre-fort.',
      features: ['46 m²','Terrasse privée','Lit King Size','TV 48" Smart','Wi-Fi fibre','Kitchenette équipée','Climatisation','Coffre-fort','Room service 24/7']
    },
    {
      id: 'executive', name: 'Executive Suite', badge: 'Luxe', badgeStyle: '',
      images: ['assets/ambassadeur/1.jpeg','assets/ambassadeur/2.jpeg','assets/ambassadeur/3.jpeg','assets/ambassadeur/4.jpeg','assets/ambassadeur/5.jpeg','assets/ambassadeur/6.jpeg','assets/ambassadeur/7.jpeg','assets/ambassadeur/8.jpeg','assets/ambassadeur/9.jpeg'],
      currentIndex: 0, interval: null as any,
      shortDesc: 'Spacieuse suite de 46m² avec salon séparé, espace de travail.',
      longDesc: 'L\'Executive Suite de 46m² est conçue pour les voyageurs d\'affaires les plus exigeants séjournant à Rabat. Elle comprend un salon séparé avec espace de travail ergonomique, une chambre privée sécurisable, TV Smart 48", cuisine équipée, salle de bain luxueuse, Wi-Fi fibré, climatisation et peignoir & chaussons inclus. Accès privilégié au Business Center.',
      features: ['46 m²','Salon séparé','Espace de travail','TV Smart','Wi-Fi fibré','Cuisine équipée','Machine à café','Peignoir & chaussons','Business Center']
    },
    {
      id: 'suite-terrace', name: 'Suite with Terrace', badge: 'Premium', badgeStyle: '',
      images: ['assets/ambassadeurT/2.jpeg','assets/ambassadeurT/3.jpeg','assets/ambassadeurT/4.jpeg','assets/ambassadeurT/5.jpeg','assets/ambassadeurT/6.jpeg','assets/ambassadeurT/7.jpeg','assets/ambassadeurT/8.jpeg','assets/ambassadeurT/9.jpeg'],
      currentIndex: 0, interval: null as any,
      shortDesc: 'Spacieuse suite de 65m² avec grand salon, terrasse panoramique.',
      longDesc: 'Notre Suite with Terrace de 65m² est le summum du luxe à Atlas Résidence. Avec son grand salon élégant, sa chambre king-size et sa terrasse panoramique offrant une vue imprenable sur Rabat, elle offre une expérience hôtelière d\'exception. Deux salles de bain, baignoire balnéo, TV Smart, cuisine équipée, Wi-Fi fibre, climatisation et service butler dédié.',
      features: ['65 m²','Terrasse panoramique','Grand salon','Lit King Size','Deux salles de bain','Baignoire balnéo','TV Smart','Cuisine équipée','Butler service']
    },
    {
      id: '2queens', name: '2 Queen Beds', badge: 'Famille', badgeStyle: '',
      images: ['assets/2queen/1.jpeg','assets/2queen/2.jpeg','assets/2queen/3.jpeg','assets/2queen/4.jpeg','assets/2queen/5.jpeg','assets/2queen/6.jpeg','assets/2queen/7.jpeg','assets/2queen/8.jpeg','assets/2queen/9.jpeg'],
      currentIndex: 0, interval: null as any,
      shortDesc: 'Chambre spacieuse avec deux lits queen size, idéale pour les familles.',
      longDesc: 'La chambre 2 Queen Beds a été pensée pour maximiser le confort de plusieurs occupants sans aucun compromis sur l\'élégance. Deux lits queen size confortables, un espace de vie généreux, TV Smart, cuisine équipée, deux salles de bain, climatisation, Wi-Fi haut débit et coffre-fort.',
      features: ['2 lits Queen Size','Idéal familles','Grand espace','Deux salles de bain','TV Smart','Wi-Fi haut débit','Cuisine équipée','Machine à café','Climatisation']
    },
    {
      id: 'balcon', name: 'Suite avec Balcon', badge: 'Vue panoramique', badgeStyle: 'outline',
      images: ['assets/BALCON/1.jpeg','assets/BALCON/2.jpeg','assets/BALCON/3.jpeg','assets/BALCON/4.jpeg','assets/BALCON/5.jpeg','assets/BALCON/6.jpeg','assets/BALCON/7.jpeg','assets/BALCON/8.jpeg','assets/BALCON/9.jpeg'],
      currentIndex: 0, interval: null as any,
      shortDesc: 'Suite luxueuse avec grand balcon privé offrant une vue imprenable sur Rabat.',
      longDesc: 'La Suite avec Balcon est notre chambre la plus photographiée. Son grand balcon privé s\'ouvre sur un panorama à 180° des toits de Rabat, du minaret Hassan jusqu\'à l\'horizon océan Atlantique. Lit king-size, salon lumineux, kitchenette complète, TV Smart, Wi-Fi fibre, climatisation, coffre-fort et champagne offert à l\'arrivée.',
      features: ['Grand balcon privé','Vue 180° Rabat','Lit King Size','Salon lumineux','TV Smart','Wi-Fi fibre','Kitchenette complète','Climatisation','Champagne à l\'arrivée']
    }
  ];

  reviews = [
    { score: 10.0, platform: 'Trip.com', roomType: 'Studio with Terrace', text: 'J\'ai réservé un magnifique studio cosy, moderne et très propre avec terrasse. Cuisine entièrement équipée. Excellent emplacement. Le personnel est excellent.', author: 'Voyageur vérifié', location: 'International', flag: '✈️', date: 'Septembre 2023' },
    { score: 10.0, platform: 'Trip.com', roomType: 'Suite', text: 'Parfait. Un séjour sans la moindre ombre au tableau. Service impeccable, chambre somptueuse, emplacement idéal.', author: 'Bassem', location: 'Maroc', flag: '🇲🇦', date: 'Novembre 2023' },
    { score: 9.0, platform: 'Booking.com', roomType: 'Suite', text: 'This place offered great value for the price. Although some taxi drivers had difficulty locating it, the suites were comfortable and impeccably clean.', author: 'Voyageur vérifié', location: 'International', flag: '✈️', date: '2024' },
    { score: 8.0, platform: 'Trip.com', roomType: '2 Queen Beds', text: 'Nous avons vraiment apprécié la taille de l\'appartement et le fait qu\'il disposait d\'un lave-linge. Le check-in était très simple.', author: 'Voyageur vérifié', location: 'International', flag: '✈️', date: 'Juin 2023' },
    { score: 8.0, platform: 'Hotelmix', roomType: 'Studio with Terrace', text: 'Excellent séjour. L\'accueil chaleureux et le personnel attentionné ont rendu mon séjour très agréable.', author: 'Voyageur vérifié', location: 'Maroc', flag: '🇲🇦', date: '2024' }
  ];

  carouselIdx = 0;
  carouselCardWidth = 0;
  autoplayRunning = true;
  autoplayTimer: any = null;
  autoplayOffset = 50.27;
  private readonly AUTOPLAY_INTERVAL = 5000;

  selectedRoom: any = null;
  modalIndex = 0;
  booking = { checkin: '', checkout: '', guests: '2 adultes', roomType: '' };
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private cdr: ChangeDetectorRef ,private sanitizer: DomSanitizer) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.updateCardWidth();
      this.startAutoplay();
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      this.rooms.forEach(room => { if (room.interval) clearInterval(room.interval); });
      if (this.autoplayTimer) clearInterval(this.autoplayTimer);
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) this.updateCardWidth();
  }

  updateCardWidth() {
    if (!this.isBrowser) return;
    const track = document.querySelector('.carousel-track');
    if (track) {
      const w = track.parentElement?.clientWidth || 1200;
      this.carouselCardWidth = (w - 24) / 2;
      this.cdr.detectChanges();
    }
  }

  maxCarouselIdx() { return Math.max(0, this.reviews.length - 2); }

  startSlide(roomId: string) {
    if (!this.isBrowser) return;
    const room = this.rooms.find(r => r.id === roomId);
    if (!room || room.interval) return;
    room.currentIndex = 0;
    room.interval = setInterval(() => {
      room.currentIndex = (room.currentIndex + 1) % room.images.length;
      this.cdr.detectChanges();
    }, 900);
  }

  stopSlide(roomId: string) {
    if (!this.isBrowser) return;
    const room = this.rooms.find(r => r.id === roomId);
    if (room && room.interval) {
      clearInterval(room.interval);
      room.interval = null;
      room.currentIndex = 0;
      this.cdr.detectChanges();
    }
  }

  openDetail(room: any) {
    if (!this.isBrowser) return;
    if (room.interval) { clearInterval(room.interval); room.interval = null; }
    this.selectedRoom = room;
    this.modalIndex = 0;
    document.body.style.overflow = 'hidden';
  }

  closeDetail() {
    if (!this.isBrowser) return;
    this.selectedRoom = null;
    document.body.style.overflow = '';
  }

  modalPrev() {
    if (this.selectedRoom) {
      this.modalIndex = (this.modalIndex - 1 + this.selectedRoom.images.length) % this.selectedRoom.images.length;
    }
  }

  modalNext() {
    if (this.selectedRoom) {
      this.modalIndex = (this.modalIndex + 1) % this.selectedRoom.images.length;
    }
  }

  /////////////////////////////////

  openHotelRunner() {
    if (!this.isBrowser) return;

    const hrBtn = document.querySelector('.hr-booking-button') as HTMLElement;
    if (hrBtn) {
      hrBtn.click();
      return;
    }

    const baseUrl =
      'https://residence-atlas-by-rent-inn.hotelrunner.com/bv3/search';

    const params = new URLSearchParams();

    if (this.booking.checkin) {
      params.append('checkin', this.booking.checkin);
    }

    if (this.booking.checkout) {
      params.append('checkout', this.booking.checkout);
    }

    if (this.booking.guests) {
      params.append('adults', this.booking.guests);
    }

    const finalUrl = `${baseUrl}?${params.toString()}`;

    const win = window.open(finalUrl, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.href = finalUrl;
    }
  }

  callPhone() {
    if (!this.isBrowser) return;
    window.location.href = 'tel:+212537377798';
  }

  sendEmail() {
    if (!this.isBrowser) return;
    window.location.href = 'mailto:atlasresidence01@gmail.com?subject=Demande%20de%20renseignements%20—%20Atlas%20Résidence';
  }

  openMap() {
    if (!this.isBrowser) return;
    window.open('https://maps.google.com/?q=Angle+Rue+Oued+Ziz+et+Rue+Oued+Sebou,+Rabat+10080', '_blank');
  }

  scrollTo(sectionId: string) {
    if (!this.isBrowser) return;
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToTop() {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  carouselMove(direction: number) {
    if (!this.isBrowser) return;
    const newIdx = this.carouselIdx + direction;
    if (newIdx >= 0 && newIdx <= this.maxCarouselIdx()) {
      this.carouselIdx = newIdx;
      if (this.autoplayRunning) this.restartAutoplay();
    }
  }

  goToSlide(index: number) {
    if (!this.isBrowser) return;
    this.carouselIdx = index;
    if (this.autoplayRunning) this.restartAutoplay();
  }

  startAutoplay() {
    if (!this.isBrowser) return;
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);
    this.autoplayTimer = setInterval(() => {
      if (this.carouselIdx < this.maxCarouselIdx()) this.carouselIdx++;
      else this.carouselIdx = 0;
      this.cdr.detectChanges();
    }, this.AUTOPLAY_INTERVAL);
    this.autoplayRunning = true;
    this.animateRing();
  }

  restartAutoplay() {
    if (!this.isBrowser) return;
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);
    this.startAutoplay();
  }

  toggleAutoplay() {
    if (!this.isBrowser) return;
    if (this.autoplayRunning) {
      if (this.autoplayTimer) clearInterval(this.autoplayTimer);
      this.autoplayRunning = false;
      this.autoplayOffset = 50.27;
    } else {
      this.startAutoplay();
    }
  }

  animateRing() {
    if (!this.isBrowser) return;
    let startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / this.AUTOPLAY_INTERVAL, 1);
      this.autoplayOffset = 50.27 * (1 - progress);
      this.cdr.detectChanges();
      if (progress < 1 && this.autoplayRunning) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
  
getStarsHTML(score: number): SafeHtml {
  const full = Math.round(score / 2);
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += `<div class="rev-star"><svg viewBox="0 0 10 10"><polygon points="5,1 6.5,3.8 9.5,4.2 7.5,6.2 8,9.2 5,7.5 2,9.2 2.5,6.2 0.5,4.2 3.5,3.8" fill="${i < full ? '#B8965A' : 'rgba(184,150,90,0.2)'}" stroke="none"/></svg></div>`;
  }
  return this.sanitizer.bypassSecurityTrustHtml(stars);
}

// Ajoutez ces propriétés dans votre classe HomeComponent
menuOpen: boolean = false;
isScrolled: boolean = false;

// Ajoutez ces méthodes
toggleMenu() {
  this.menuOpen = !this.menuOpen;
  if (this.menuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

closeMenu() {
  this.menuOpen = false;
  document.body.style.overflow = '';
}

// Dans ngOnInit ou constructor, écoutez le scroll pour la classe scrolled
// Si vous avez déjà un HostListener('window:scroll'), ajoutez-y :
@HostListener('window:scroll', [])
onWindowScroll() {
  this.isScrolled = window.scrollY > 50;
}
// Sinon, ajoutez ce HostListener
  
}