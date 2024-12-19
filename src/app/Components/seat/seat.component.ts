import { Component } from '@angular/core';
import { BookingService } from '../../Services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.css'
})
export class SeatComponent {
  constructor(public bookingService: BookingService) {}
    toggleSeat(row: string, column: number): void {
      this.bookingService.toggleSeat(row, column);
    }
    getSelectedSeats():string[]{
      return this.bookingService.getSelectedSeats();
    }
    calculateTotalCost():number{
      return this.bookingService.calculateTotalCost();
    }
    confirmBooking(){
      this.bookingService.confirmBooking();
    }
    resetSelection() {
      this.bookingService.seats.forEach(row => {
        row.forEach(seat => {
          if (seat.status === 'selected') {
            seat.status = 'available';
          }
        });
      });
    }
    
}
