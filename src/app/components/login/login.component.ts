import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private service: DashboardService) { }

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    localStorage.setItem('token', token);
    if (token) {
      this.router.navigateByUrl('/dashboard');
    }
    this.service.createProject('').subscribe(res => {
      console.log(res);
    })
  }

}
