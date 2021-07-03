import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { AuthenticationError, InvalidCredentialsError } from "@domain/errors";
import { EmailConflictError } from "@domain/errors";
import { AuthRepository } from "@domain/repositories";

export class AuthUseCase implements AuthRepository {
  constructor(private readonly collection: string) {}
  async signIn({ email, password }: AuthRepository.SignIn): Promise<void> {
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
  }: AuthRepository.SignUp): Promise<void> {
    try {
      const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      await firestore().collection(this.collection).doc(user.uid).set({
        createAt: firestore.Timestamp.now(),
        updateAt: firestore.Timestamp.now(),
        email,
        cpf,
        name,
        phone,
      });
    } catch (err) {
      throw new EmailConflictError();
    }
  }

  async updateUser({
    cpf,
    email,
    name,
    password,
    phone,
  }: AuthRepository.UpdateUser): Promise<void> {
    async function updatePasswordAndEmail() {
      //   const accessToken = await auth().currentUser?.linkWithCredential({token: ""});
      //    auth().currentUser?.reauthenticateWithCredential()
      //   if (password.length > 8) {
      //     await auth().currentUser?.updatePassword(password);
      //   }
      //  await auth().currentUser?.updateEmail(email)
    }

    await Promise.all([
      updatePasswordAndEmail(),
      auth().currentUser?.updateProfile({ displayName: name }),
      firestore()
        .collection(this.collection)
        .doc(auth().currentUser?.uid)
        .update({
          cpf,
          email,
          name,
          phone,
          updateAt: firestore.Timestamp.now(),
        }),
    ]);
  }

  async getUser(): Promise<AuthRepository.Model> {
    const user = auth().currentUser;

    if (user?.uid) {
      const document = await firestore()
        .collection<AuthRepository.Model>(this.collection)
        .doc(auth().currentUser?.uid)
        .get();

      const userData = document.data();

      if (userData) {
        return userData;
      } else {
        auth().signOut();
        throw new AuthenticationError();
      }
    } else {
      auth().signOut();
      throw new AuthenticationError();
    }
  }

  async signOut(): Promise<void> {}
}
