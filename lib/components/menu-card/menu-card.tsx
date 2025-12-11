import { IBaseProps } from "@/lib/types";

export interface IMenuCardProps extends IBaseProps {}

export const MenuCard = ({ children }: IMenuCardProps) => {
  return <span>{children}</span>;
};
