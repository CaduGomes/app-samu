import { UserModel } from "@domain/models/user-model";

export interface Authentication {
  signUp: (params: Authentication.signUp) => Promise<void>;
  signIn: (params: Authentication.signIn) => Promise<void>;
  signOut: () => Promise<void>;
}

export declare namespace Authentication {
  export type signUp = {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
  };
  export type signIn = {
    email: string;
    password: string;
  };
  export type Model = UserModel;
}
