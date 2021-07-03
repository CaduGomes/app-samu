import { FieldProps } from "formik";
import React from "react";
import { View } from "react-native";
import {
  FloatingLabelInput,
  FloatingLabelProps,
} from "react-native-floating-label-input";
import { ErrorMessage } from "../error-message";
import styles from "./styles";

interface Props extends FieldProps, FloatingLabelProps {
  label: string;
  forwardRef?: any;
  onSubmitEditing?: () => void;
}

export const CustomTextInput: React.FC<Props> = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View>
      <FloatingLabelInput
        {...inputProps}
        darkTheme={true}
        ref={props.forwardRef}
        blurOnSubmit={false}
        customLabelStyles={{
          colorFocused: "#708090",
          leftFocused: 5,
          leftBlurred: 10,
          colorBlurred: "black",
        }}
        onSubmitEditing={props.onSubmitEditing}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        inputStyles={styles.inputStyles}
        labelStyles={styles.labelStyles}
        containerStyles={{
          ...styles.containerStyles,
          borderColor: hasError ? "red" : "#7080906e",
        }}
      />
      <ErrorMessage show={!!hasError} text={errors[name]} />
    </View>
  );
};
