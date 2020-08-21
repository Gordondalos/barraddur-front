import { User } from './user.model';

export class Auth {
  appversion?: string;
  authorized?: boolean;
  domain?: string;
  store?: string;
  storeId?: string;
  user?: User;

  constructor(appversion: string, authorized: boolean, domain: string, store: string, storeId: string, user: User) {
    this.appversion = appversion;
    this.authorized = authorized;
    this.domain = domain;
    this.store = store;
    this.storeId = storeId;
    this.user = user;
  }
}
