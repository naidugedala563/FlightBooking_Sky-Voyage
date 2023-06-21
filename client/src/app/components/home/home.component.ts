import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface passengers {
  [seat: string]: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  @ViewChild('content', { static: false }) modalContent!: TemplateRef<any>; // Add "!" to indicate it will be initialized
  selectedFrom: string;
  selectedTo: string;
  selectedDate: string;
  selectedFlight: string;
  // passengers: any[] = ["Bharath"];
  // Declare an array to store passenger names
  passengers: passengers = {};

// Function to update the passenger name for a specific seat
updatePassengerName(seat: string, event: any) {
  const name: string = event.target.value;
  this.passengers[seat] = name;
}

  isSame = false;
  totalPrice = 0;
  flights: any[] = [];
  flightId: string = '';
  bookedSeats: any[] = [];

  constructor(private http: HttpClient, private modalService: NgbModal) {
    this.selectedFrom = '';
    this.selectedTo = '';
    this.selectedDate = '';
    this.selectedFlight = '';
    this.totalPrice = 0;
    this.generateSeatRows();
  }

  openModal(flight: any, id: string) {
    this.selectedFlight = flight;
    this.modalService.open(this.modalContent, { size: 'lg' });
    console.log(id)
    this.http.get<any[]>(`http://localhost:5100/flights/${id}`).subscribe((res: any) => {
      if (res) {
        this.bookedSeats = res.reservedSeats
      }else{
        this.bookedSeats = []
      }
    })
  }

  search(): void {
    if (this.selectedFrom === this.selectedTo) {
      this.isSame = true
    } else {
      this.isSame = false
    }
    this.http.get<any[]>('http://localhost:5100/flights').subscribe((res) => {
      this.flights = res.filter(flight => flight.origin === this.selectedFrom && flight.destination === this.selectedTo)
      // console.log(this.flights)
      this.flights = res
    })
  }

  selectedSeats: string[] = [];

  rows: any[] = [];

  generateSeatRows() {
    const numRows = 10; // Number of rows
    const seatsPerRow = 10; // Number of seats per row
    const startingRowCharCode = 65; // ASCII code for 'A'
    for (let i = 0; i < numRows; i++) {
      const rowNumber = String.fromCharCode(startingRowCharCode + i);
      const rowSeats = [];

      for (let j = 1; j <= seatsPerRow; j++) {
        const seatLabel = `${rowNumber}${j}`;
        rowSeats.push(seatLabel);
      }

      this.rows.push({ rowNumber, seats: rowSeats });
    }
  }

  selectSeat(seatNumber: string, price: number) {
    if (this.selectedSeats.includes(seatNumber)) {
      this.selectedSeats = this.selectedSeats.filter(seat => seat !== seatNumber);
    } else {
      this.selectedSeats.push(seatNumber);
    }
    this.totalPrice = price * this.selectedSeats.length
  }

  confirmBooking(id: string) {
    const userId = localStorage.getItem('userId')
    const bookingDetails = {
      user: userId,
      flight: id,
      passengers: this.passengers,
      totalPrice: this.totalPrice,
      seatNumbers: this.selectedSeats,
      paymentMethod: 'Credit Card'
    }
    this.http.post('http://localhost:5100/bookings', bookingDetails).subscribe((res) => {
      console.log(res)
    })
  }
}
