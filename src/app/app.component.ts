import { Component } from '@angular/core';
import { SeatComponent } from "./Components/seat/seat.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ SeatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'seatBooking';
}
