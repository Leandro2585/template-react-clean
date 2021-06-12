import { AccountModel } from '@domain/models'

export interface AddAccount {
  create(params: AddAccount.Params): Promise<AddAccount.Model>;
}

export namespace AddAccount {
  export type Params = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  export type Model = AccountModel
}
