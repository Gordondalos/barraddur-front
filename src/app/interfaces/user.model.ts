export class User {
  id?: number;
  code: string;
  login: string;
  name: string;
  mainRoleCode: string;

  constructor(code: string, login: string, name: string, mainRoleCode: string) {
    this.code = code;
    this.login = login;
    this.name = name;
    this.mainRoleCode = mainRoleCode;
  }
}
