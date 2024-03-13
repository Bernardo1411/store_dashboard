import React from "react";

interface ModalProps {
  children: React.ReactNode;
}

function Modal({ children }: ModalProps): JSX.Element {
  return <div>{children}</div>;
}

export default Modal;
