import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import { cpf as CPFvalidator } from "cpf-cnpj-validator";

import { Field, Formik } from "formik";
import * as yup from "yup";

import styles from "./styles";
import { CustomTextInput, ErrorMessage } from "@presentation/components";
import { Authentication } from "@domain/repositories";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const fieldValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("O campo nome não pode ser vazio")
    .min(7, "Use 7 ou mais caracteres"),

  email: yup
    .string()
    .email("Email inválido")
    .required("O campo email não pode ser vazio"),

  cpf: yup
    .string()
    .test("is-tea", "CPF inválido", (value) =>
      value ? CPFvalidator.isValid(value) : false
    )
    .required("O campo cpf não pode ser vazio"),

  phone: yup
    .string()
    .required("O campo celular não pode ser vazio")
    .min(16, "Celular inválido"),

  password: yup
    .string()
    .required("O campo senha não pode ser vazio")
    .min(7, "Use 7 ou mais caracteres"),
});

type InputValues = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
};

type Props = {
  useAuthentication: Authentication;
};

const SignUpScreen: React.FC<Props> = ({ useAuthentication }) => {
  const [signUpError, setSignUpError] = useState<string | null>(null);

  async function SignUpHandler(values: InputValues) {
    const { cpf: cpfDirty, email, name, password, phone: phoneDirty } = values;
    const phone = phoneDirty.replace(/[^a-z0-9]/gi, "");
    const cpf = cpfDirty.replace(/[^a-z0-9]/gi, "");

    try {
      await useAuthentication.signUp({ cpf, email, name, password, phone });
    } catch (err) {
      setSignUpError(err.message);
    }
  }

  const nameRef = React.createRef<HTMLInputElement>();
  const emailRef = React.createRef<HTMLInputElement>();
  const cpfRef = React.createRef<HTMLInputElement>();
  const phoneRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();
  const submitButtonRef = React.createRef<HTMLInputElement>();

  console.log(passwordRef.current?.value);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <Formik
        validationSchema={fieldValidationSchema}
        initialValues={{
          name: "",
          email: "",
          cpf: "",
          phone: "",
          password: "",
        }}
        onSubmit={async (props: InputValues) => await SignUpHandler(props)}
      >
        {({ handleSubmit, isValid, values, isSubmitting }) => {
          useEffect(() => {
            setSignUpError(null);
          }, [values]);
          return (
            <View style={styles.formContainer}>
              <KeyboardAwareScrollView>
                <Field
                  name="name"
                  component={CustomTextInput}
                  label="Nome"
                  forwardRef={nameRef}
                  onSubmitEditing={() => emailRef.current?.focus()}
                />

                <Field
                  name="email"
                  component={CustomTextInput}
                  label="Email"
                  forwardRef={emailRef}
                  onSubmitEditing={() => cpfRef.current?.focus()}
                />

                <Field
                  name="cpf"
                  component={CustomTextInput}
                  label="CPF"
                  keyboardType="numeric"
                  mask="999.999.999-99"
                  forwardRef={cpfRef}
                  onSubmitEditing={() => phoneRef.current?.focus()}
                />

                <Field
                  name="phone"
                  component={CustomTextInput}
                  label="Celular"
                  mask="(99) 9 9999-9999"
                  keyboardType="numeric"
                  forwardRef={phoneRef}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />

                <Field
                  name="password"
                  component={CustomTextInput}
                  label="Senha"
                  isPassword={true}
                  forwardRef={passwordRef}
                  onSubmitEditing={() => passwordRef.current?.blur()}
                />
                <View style={styles.buttonContainer}>
                  <ErrorMessage show={!!signUpError} text={signUpError ?? ""} />
                  <Button
                    title="Cadastrar"
                    onPress={() => handleSubmit()}
                    disabled={!isValid || isSubmitting}
                  />
                </View>
              </KeyboardAwareScrollView>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default SignUpScreen;
