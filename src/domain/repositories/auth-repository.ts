import { UserModel } from "@domain/models/user-model";

export interface AuthRepository {
  signUp: (params: AuthRepository.SignUp) => Promise<void>;
  signIn: (params: AuthRepository.SignIn) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (params: AuthRepository.UpdateUser) => Promise<void>;
  getUser: () => Promise<AuthRepository.Model>;
}

export declare namespace AuthRepository {
  export type SignUp = {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
  };
  export type SignIn = {
    email: string;
    password: string;
  };
  export type UpdateUser = {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
  };
  export type Model = UserModel;
}
