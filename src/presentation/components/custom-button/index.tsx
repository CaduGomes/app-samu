import React from "react";
import { Button, ButtonProps } from "react-native";
import colors from "../../../core/colors";

type Props = ButtonProps;

export const CustomButton: React.FC<Props> = (props) => {
  return <Button color={colors.primary} {...props} />;
};
