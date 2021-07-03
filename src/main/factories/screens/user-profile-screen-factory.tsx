import React from "react";
import { UserProfileScreen } from "@presentation/screens";
import { makeAuthUseCase } from "@main/factories/usecases";

export const MakeUserProfileScreen: React.FC = () => (
  <UserProfileScreen useAuthentication={makeAuthUseCase()} />
);
