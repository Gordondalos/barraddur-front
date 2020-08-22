import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.model';
import { LocalstorageService } from '../../services/localstorage.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss'],
})
export class PersonalAreaComponent implements OnInit {

  user: User;

  constructor(
    private localStorageService: LocalstorageService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.localStorageService.get('user');
  }

  save(): void {
    console.log(this.user);
    this.userService.saveUser(this.user);
  }
}
