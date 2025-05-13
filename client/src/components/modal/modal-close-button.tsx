import { ReactNode } from "react";
import { BaseProps } from "../base-props";

type ModalCloseButtonProps = BaseProps & {
  type: "submit" | "reset" | "button" | undefined;
  children?: ReactNode;
};

export function ModalCloseButton({
  type,
  className,
  children,
}: ModalCloseButtonProps) {
  return (
    <button
      type={type}
      className={className}
      data-bs-dismiss="modal"
      aria-label="Close"
    >
      {children}
    </button>
  );
}
