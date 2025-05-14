import { ReactNode } from "react";
import { BaseProps } from "@/components/base-props";

type ModalCloseButtonProps = BaseProps & {
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  children?: ReactNode;
};

export function ModalCloseButton({
  type,
  className,
  children,
  disabled = false,
}: ModalCloseButtonProps) {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      data-bs-dismiss="modal"
      aria-label="Close"
    >
      {children}
    </button>
  );
}
