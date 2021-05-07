import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.model';
import { LocalstorageService } from '../../services/localstorage.service';
import { UserService } from '../../services/user.service';
import { PortfolioService } from '../../services/portfolio.service';
import { delay } from 'utils-decorators';


@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss'],
})
export class PersonalAreaComponent implements OnInit {

  user: User;
  currency: any;
  sum: any;
  mode: boolean;
  showSaveLoader: boolean;

  constructor(
    private localStorageService: LocalstorageService,
    private userService: UserService,
    private portfolioService: PortfolioService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.localStorageService.get('user');
    if (!this.user) {
      this.user = {};
    }
  }

  save(): void {
    this.showSaveLoader = true;
    this.userService.saveUser(this.user)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          this.showSaveLoader = false;
        }, 1000);
      });
  }

  addSumToSandbox() {
    const res: any = this.userService.addSumToSandbox(this.sum, this.currency);
    if (res) {
      this.portfolioService.updateBalanceEvent.next();
    }
  }

  @delay(100)
  modeChange() {
    this.userService.changeMode(this.mode);
  }
}
