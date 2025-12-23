import {
  primaryButtonClass,
  secondaryButtonClass,
  tertiaryButtonClass,
  solidButtonClass,
  outlineButtonClass,
  ghostButtonClass,
} from "./button.styles";
import { ButtonPriority, ButtonVariant } from "./types";

export const variantClassMap = {
  [ButtonPriority.PRIMARY]: primaryButtonClass,
  [ButtonPriority.SECONDARY]: secondaryButtonClass,
  [ButtonPriority.TERTIARY]: tertiaryButtonClass,
};

export const styleClassMap = {
  [ButtonVariant.SOLID]: solidButtonClass,
  [ButtonVariant.OUTLINE]: outlineButtonClass,
  [ButtonVariant.GHOST]: ghostButtonClass,
};
