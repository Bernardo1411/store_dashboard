import React from "react";

import styles from "./Button.module.css";

interface ButtonProps {
  children: string | JSX.Element | any;
  onClick: () => void;
  disabled?: boolean;
  stylesButton?: object;
}

function Button({
  children,
  onClick,
  disabled,
  stylesButton,
}: ButtonProps): JSX.Element {
  return (
    <button className={styles.button} style={stylesButton} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
    </button>
  );
}

export default Button;
