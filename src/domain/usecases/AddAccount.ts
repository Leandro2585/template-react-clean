export interface AddAccount {
  create(params: AddAccount.Params): Promise<AddAccount.Result>;
}

export namespace AddAccount {
  export type Params = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  export type Result = {
    accessToken: string;
  }
}
