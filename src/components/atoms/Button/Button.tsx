import React from "react";

import styles from "./Button.module.css";

interface ButtonProps {
  children: string | JSX.Element | any;
  onClick: () => void;
  disabled?: boolean;
  stylesButton?: object;
  squareButton?: boolean;
}

function Button({
  children,
  onClick,
  disabled,
  stylesButton,
  squareButton,
}: ButtonProps): JSX.Element {
  return (
    <button className={squareButton ? styles.square : styles.button} style={stylesButton} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
    </button>
  );
}

export default Button;
