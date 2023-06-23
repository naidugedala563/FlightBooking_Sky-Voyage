import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  isLoading = false
  bookings: any[] = []
  constructor(private http:HttpClient){
    const userId = localStorage.getItem('userId')
    console.log(userId)
    this.isLoading = true
    this.http.get<any[]>(`http://localhost:5100/bookings/user/${userId}`).subscribe((res) => {
      this.bookings = res
      console.log(res)
      this.isLoading = false
    })
  }
}
