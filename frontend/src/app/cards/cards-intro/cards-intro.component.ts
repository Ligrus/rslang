import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-cards-intro',
  templateUrl: './cards-intro.component.html',
  styleUrls: ['./cards-intro.component.scss']
})
export class CardsIntroComponent implements OnInit {

  constructor(private http: HttpClient, private authService: AuthService) { }

  logout() {
    this.authService.logout()
  }

  ngOnInit(): void {
    let req = this.http.get(`http://localhost:3500/users/${localStorage.getItem('userId')}/words`)
    req.subscribe(
      data => { console.log('do stuff to data here', data); },
      err => { console.log("couldn't get data, maybe show error to user"); },
      () => { console.log('function that is called upon finish'); }
    )
  }

}
