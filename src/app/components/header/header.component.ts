import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: User = {
    _id: '',
    firstName: '',
    lastName: '',
    avatar: '',
    email: ''
  };
  currentRoute: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    console.log('OOO YA YEBU');
    this.currentRoute = this.router.url;
    const token = this.authService.getToken();
    if (token && token.length > 0) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
    
  }

  getToken() {
    const token = this.authService.getToken();
    return token && token.length > 0;
  }

  logout() {
    this.authService.logout();
  }

  

}
