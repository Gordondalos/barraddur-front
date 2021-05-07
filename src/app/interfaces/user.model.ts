export class User {
  id?: number;
  code?: string;
  login?: string;
  name?: string;
  mainRoleCode?: string;
  tToken?: string;
  t_prod_token?: string;
  phone?: string;
  email?: string;
  surename?: string;
  fathers_name?: string;
  passport?: string;
  is_demo?: number;
  password?: number;

  constructor(code: string, login: string, name: string, mainRoleCode: string) {
    this.code = code;
    this.login = login;
    this.name = name;
    this.mainRoleCode = mainRoleCode;
  }
}
