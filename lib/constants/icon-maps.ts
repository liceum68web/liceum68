import { AtSign, LucideProps, MapPin, Smartphone } from "lucide-react";
import { createElement, FC } from "react";

import { ContactInfoType, IBaseProps } from "../types";

export const contactIconMap: Record<
  ContactInfoType,
  FC<IBaseProps & LucideProps>
> = {
  [ContactInfoType.PHONE]: (props) => createElement(Smartphone, { ...props }),
  [ContactInfoType.EMAIL]: (props) => createElement(AtSign, { ...props }),
  [ContactInfoType.ADDRESS]: (props) => createElement(MapPin, { ...props }),
};
