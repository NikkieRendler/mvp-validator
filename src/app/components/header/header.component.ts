import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo = null;
  currentRoute: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.currentRoute = this.router.url;
    const token = this.authService.getToken();
    if (token && token.length > 0) {
      this.authService.getUserInfo().subscribe(res => {
        this.userInfo = res.user;
      })
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
