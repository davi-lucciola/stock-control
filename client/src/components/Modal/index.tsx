import { ReactNode } from "react";
import { ModalCloseButton } from "./ModalCloseButton";
import { BaseProps } from "../BaseProps";

type ModalProps = BaseProps & {
  title: string;
  children: ReactNode;
};

export function Modal({ id, className, title, children }: ModalProps) {
  return (
    <div className={`modal fade ${className}`} id={id} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`${id}-label`}>
              {title}
            </h1>
            <ModalCloseButton type="button" className="btn-close" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
