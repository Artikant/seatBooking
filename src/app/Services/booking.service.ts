import { Injectable } from '@angular/core';
export interface Seat {
  row: string;
  column: number;
  status: 'available' | 'selected' | 'booked',
  type: 'VIP' | 'Regular';
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  rows: string[] = ['A', 'B', 'C', 'D', 'E'];
  columns: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  seats: Seat[][] = [];
  VIPPrice = 20;
  RegularPrice = 10;
  constructor() {
    this.seats = this.rows.map(row =>
      this.columns.map(col => ({
        row,
        column: col,
        status: 'available',
        type: (row === 'A' || row === 'B') ? 'VIP' : 'Regular',
      }))
    );
  }
  getSeats(): Seat[][] {
    return this.seats;
  }
  toggleSeat(row: string, col: number) {
    const seat = this.seats.find(r => r[0].row === row)?.find(c => c.column === col);
    if (seat && seat.status === 'available') {
      seat.status = 'selected';
    } else if (seat && seat.status === 'selected') {
      seat.status = 'available';
    }
  }
  getstatus(row: string, col: number): string {
    const seat = <Seat>this.seats.find(r => r[0].row === row)?.find(c => c.column === col);
    return seat.status;
  }
  getSelectedSeats(): string[] {
    const selectedSeats: string[] = [];
    this.seats.forEach(row => {
      row.forEach(seat => {
        if (seat.status === 'selected') {
          selectedSeats.push(`${seat.row}${seat.column}`);
        }
      });
    });
    return selectedSeats;
  }
  getSeattype(row: string, col: number): 'VIP' | 'Regular' {
    return <'VIP' | 'Regular'>this.seats.find(r => r[0].row === row)?.find(c => c.column === col)?.type
  }
  calculateTotalCost(): number {
    let totalCost = 0;
    this.seats.forEach(row => {
      row.forEach(seat => {
        if (seat.status === 'selected') {
          totalCost += seat.type === 'VIP' ? this.VIPPrice : this.RegularPrice;
        }
      });
    });
    return totalCost;
  }
  confirmBooking() {
    this.seats.forEach(row => {
      row.forEach(seat => {
        if (seat.status === 'selected') {
          seat.status = 'booked';
        }
      });
    });
  } 
  
}
