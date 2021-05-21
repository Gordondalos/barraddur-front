import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-get-token',
  templateUrl: './how-get-token.component.html',
  styleUrls: ['./how-get-token.component.scss']
})
export class HowGetTokenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToMain() {
    window.location.href = '#/auth/login';
    // window.location.reload();
  }
}
