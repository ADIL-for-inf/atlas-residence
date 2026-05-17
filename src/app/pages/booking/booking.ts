import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class BookingComponent implements OnInit {
  room: any;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  checkIn: string = '';
  checkOut: string = '';
  guests: string = '2 adultes';
  totalPrice: number = 0;
  nights: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    const state = history.state;

    // Chambre reçue depuis home
    this.room = state.selectedRoom;

    // Dates pré-remplies depuis la booking bar
    if (state.checkIn) {
      this.checkIn = state.checkIn;
    }
    if (state.checkOut) {
      this.checkOut = state.checkOut;
    }
    if (state.guests) {
      this.guests = state.guests;
    }

    // Calcul automatique si les deux dates sont déjà remplies
    if (this.checkIn && this.checkOut) {
      this.calculateTotal();
    }

    // Si aucune chambre, retour accueil
    if (!this.room) {
      this.router.navigate(['/']);
    }
  }

  calculateTotal() {
    if (this.checkIn && this.checkOut) {
      const start = new Date(this.checkIn);
      const end = new Date(this.checkOut);
      const diffTime = end.getTime() - start.getTime();
      this.nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (this.nights > 0) {
        this.totalPrice = this.nights * this.room.price;
      } else {
        this.totalPrice = 0;
        this.nights = 0;
      }
    }
  }

  onConfirm() {
    if (!this.firstName || !this.lastName || !this.email || !this.phone || !this.checkIn || !this.checkOut) {
      return;
    }

    const bookingDetails = {
      customer: {
        name: `${this.firstName} ${this.lastName}`,
        email: this.email,
        phone: this.phone
      },
      stay: {
        checkIn: this.checkIn,
        checkOut: this.checkOut,
        nights: this.nights,
        guests: this.guests
      },
      room: this.room,
      total: this.totalPrice
    };

    this.router.navigate(['/payment'], { state: { booking: bookingDetails } });
  }
}