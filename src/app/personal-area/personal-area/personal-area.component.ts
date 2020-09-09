import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.model';
import { LocalstorageService } from '../../services/localstorage.service';
import { UserService } from '../../services/user.service';
import { PortfolioService } from '../../services/portfolio.service';


@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss'],
})
export class PersonalAreaComponent implements OnInit {

  user: User;
  currency: any;
  sum: any;

  constructor(
    private localStorageService: LocalstorageService,
    private userService: UserService,
    private portfolioService: PortfolioService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.localStorageService.get('user');
  }

  save(): void {
    console.log(this.user);
    this.userService.saveUser(this.user);
  }

  addSumToSandbox() {
    const res: any = this.userService.addSumToSandbox(this.sum, this.currency);
    if (res) {
      this.portfolioService.updateBalanceEvent.next();
    }
  }
}
