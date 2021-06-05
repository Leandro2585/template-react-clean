import { AccountModel } from '@domain/models'

export interface AddAccount {
  create(params: AddAccount.Params): Promise<AddAccount.Result>;
}

export namespace AddAccount {
  export type Params = AccountModel
  export type Result = {
    accessToken: string;
  }
}
