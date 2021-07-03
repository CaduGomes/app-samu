import React, { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Field, Formik } from "formik";

import { AuthRepository } from "@domain/repositories";
import { CustomTextInput, LoadingModal } from "@presentation/components";

import styles from "./styles";

type Props = {
  useAuthentication: AuthRepository;
};

type InputValues = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
};

const UserProfileScreen: React.FC<Props> = ({ useAuthentication }) => {
  const [loading, setLoading] = useState(true);

  async function updateUser(params: InputValues) {
    setLoading(true);
    try {
      await useAuthentication.updateUser(params);
    } catch (err) {
      console.log(err);
      Alert.alert("Ocorreu um erro", err.message);
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <LoadingModal show={loading} />
      <Text style={styles.title}>Seus dados</Text>
      <Formik
        initialValues={{
          name: "",
          email: "",
          cpf: "",
          phone: "",
          password: "",
        }}
        onSubmit={(values) => updateUser(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, setFieldValue }) => {
          useEffect(() => {
            async function getUserData() {
              try {
                const data = await useAuthentication.getUser();

                setFieldValue("name", data.name);
                setFieldValue("email", data.email);
                setFieldValue("cpf", data.cpf);
                setFieldValue("phone", data.phone);
              } catch (err) {
                console.log(err);
                Alert.alert("Ocorreu um erro", err.message);
              }

              setLoading(false);
            }
            getUserData();
          }, []);

          return (
            <View style={styles.formContainer}>
              <KeyboardAwareScrollView>
                <Field name="name" component={CustomTextInput} label="Nome" />
                <Field name="email" component={CustomTextInput} label="Email" />
                <Field name="cpf" component={CustomTextInput} label="CPF" />
                <Field
                  name="phone"
                  component={CustomTextInput}
                  label="Celular"
                />
                <Field
                  name="password"
                  component={CustomTextInput}
                  label="Nova Senha"
                />
                <View style={styles.buttonContainer}>
                  <Button
                    title="Atualizar"
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

export default UserProfileScreen;
