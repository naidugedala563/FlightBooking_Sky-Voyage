import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isAdmin = false
  adminToken = false
  passengerToken= false
  ownerToken = false

  constructor(private route: Router) {
    const jwtToken = localStorage.getItem('adminJwtToken')
    if (jwtToken) {
      this.adminToken = true
    }
    const token = localStorage.getItem("jwtToken")
    if (token) {
      this.passengerToken = true
    }
    const agentToken = localStorage.getItem("ownerToken")
    if (agentToken) {
      this.ownerToken = true
    }
  }
  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      this.isAdmin = false
      localStorage.removeItem('adminJwtToken')
    }
    const jwtToken = localStorage.getItem("adminJwtToken")
    if (jwtToken) {
      localStorage.removeItem('jwtToken')
      this.isAdmin = true
    }
  }

  onLogout() {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('adminJwtToken')
    window.alert("Logout Successful!")
    this.route.navigate(['/'])
    this.isAdmin = false
  }
}
