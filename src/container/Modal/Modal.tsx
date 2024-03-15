import React from "react";

import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  showModal: boolean;
  title: string;
}

function Modal({
  children,
  showModal,
  title,
}: ModalProps): JSX.Element | boolean {
  return (
    showModal && (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    )
  );
}

export default Modal;
