import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CanActivateService } from '../services/can-activate.service';
import { LocalstorageService } from '../../services/localstorage.service';


@Directive({
  selector: '[iikoUserAuth]',
})
export class UserAuthDirective implements OnInit, OnDestroy {
  user: User;
  @Output() userChange = new EventEmitter();

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private authService: AuthService,
    private canActivateService: CanActivateService,
    private localstorageService: LocalstorageService,
  ) {
    this.authService.userChange
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((user: any) => {
        this.user = new User(user.code, user.login, user.name, user.mainRoleCode);
        this.userChange.emit(this.user);
      });
  }

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  async getUser(): Promise<void> {
    await this.canActivateService.canActivate();
    this.user = this.localstorageService.get('user');

  }


}
