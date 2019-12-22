import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.scss']
})
export class ProjectPreviewComponent implements OnInit {
  modalView: boolean;
  isUserLogged: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isUserLogged = localStorage.getItem('token') !== null;
  }

  showModal(): void {
    this.modalView = true;
  }

  handleOk(): void {
    this.modalView = false;
  }

  handleCancel(): void {
    this.modalView = false;
  }

  signUp() {
    this.authService.signUp().subscribe(res => {
      console.log(res);
    })
  }

}
