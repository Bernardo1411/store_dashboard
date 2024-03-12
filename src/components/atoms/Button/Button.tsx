import React from "react";

interface ButtonProps {
  children: string | JSX.Element | any;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ children, onClick, disabled }: ButtonProps): JSX.Element {
  return (
    <button onClick={onClick} disabled={disabled}>
      <span>{children}</span>
    </button>
  );
}

export default Button;
