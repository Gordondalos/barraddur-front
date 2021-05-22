import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instruction-activate-prod',
  templateUrl: './instruction-activate-prod.component.html',
  styleUrls: ['./instruction-activate-prod.component.scss'],
})
export class InstructionActivateProdComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  goToMain() {
    window.location.href = '#/auth/login';
    // window.location.reload();
    setTimeout(() => {
      document.getElementById('head6').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      document.getElementById('show-registration').click();
    }, 500);
  }

}
