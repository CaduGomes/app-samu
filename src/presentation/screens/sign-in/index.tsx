import React, { useEffect, useState } from "react";
import { CustomTextInput, ErrorMessage } from "@presentation/components";
import { Field, Formik } from "formik";
import { Button, Pressable, Text, View } from "react-native";
import * as yup from "yup";

import styles from "./styles";
import { Authentication } from "@domain/repositories";
import { SignInScreenNavigationProp } from "@main/factories/screens";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const fieldValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("O campo email não pode ser vazio"),

  password: yup
    .string()
    .required("O campo senha não pode ser vazio")
    .min(7, "Use 7 ou mais caracteres"),
});

type InputValues = {
  email: string;
  password: string;
};

type Props = {
  useAuthentication: Authentication;
  navigation: SignInScreenNavigationProp;
};

const SignInScreen: React.FC<Props> = ({ useAuthentication, navigation }) => {
  const [signInError, setSignInError] = useState<string | null>(null);
  const emailRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();

  async function SignInHandler(props: InputValues) {
    const { email, password } = props;
    try {
      await useAuthentication.signIn({ email, password });
    } catch (err) {
      setSignInError(err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <Formik
        validationSchema={fieldValidationSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (props: InputValues) => await SignInHandler(props)}
      >
        {({ handleSubmit, isValid, isSubmitting, values }) => {
          useEffect(() => {
            setSignInError(null);
          }, [values]);

          return (
            <View style={styles.formContainer}>
              <KeyboardAwareScrollView>
                <Field
                  name="email"
                  component={CustomTextInput}
                  label="Email"
                  forwardRef={emailRef}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
                <Field
                  name="password"
                  component={CustomTextInput}
                  label="Senha"
                  isPassword
                  forwardRef={passwordRef}
                />
                <View style={styles.buttonContainer}>
                  <ErrorMessage show={!!signInError} text={signInError ?? ""} />
                  <Button
                    title="Entrar"
                    onPress={() => handleSubmit()}
                    disabled={!isValid || isSubmitting}
                  />
                </View>
                <View style={styles.signInContainer}>
                  <Pressable onPressIn={() => navigation.navigate("SignUp")}>
                    <Text style={styles.signInText}>Criar conta</Text>
                  </Pressable>
                </View>
              </KeyboardAwareScrollView>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default SignInScreen;
