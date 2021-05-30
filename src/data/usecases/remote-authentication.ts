import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Authentication } from "@domain/usecases/authentication";
import { InvalidCredentialsError } from "@domain/errors";
import { EmailConflictError } from "@domain/errors/email-conflict-error";

export class RemoteAuthentication implements Authentication {
  constructor(private readonly collection: string) {}
  async signIn({ email, password }: Authentication.signIn): Promise<void> {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      throw new InvalidCredentialsError();
    }
  }

  async signUp({
    cpf,
    email,
    name,
    password,
    phone,
  }: Authentication.signUp): Promise<void> {
    try {
      const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      await firestore().collection(this.collection).doc(user.uid).set({
        createAt: firestore.Timestamp.now(),
        email,
        cpf,
        name,
        phone,
      });
    } catch (err) {
      throw new EmailConflictError();
    }
  }

  async signOut(): Promise<void> {}
}
