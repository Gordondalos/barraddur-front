export class User {
  id?: number;
  code?: string;
  login?: string;
  name?: string;
  mainRoleCode?: string;
  tToken?: string;
  phone?: string;
  email?: string;
  surename?: string;
  fathers_name?: string;
  passport?: string;

  constructor(code: string, login: string, name: string, mainRoleCode: string) {
    this.code = code;
    this.login = login;
    this.name = name;
    this.mainRoleCode = mainRoleCode;
  }
}
