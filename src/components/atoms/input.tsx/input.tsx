import React from "react";

interface InputProps {
  placeholder: string;
  type?: string;
}

function Input({ placeholder, type }: InputProps): JSX.Element {
  return <input type={type} placeholder={placeholder} className="input" />;
}

export default Input;
