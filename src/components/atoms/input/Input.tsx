import React from "react";

import style from "./Input.module.css";

interface InputProps {
  placeholder: string;
  value?: string;
  styleInput?: object;
  type?: string;
  onChange?: (event: any) => void;
  handleKeyDown?: (event: any) => void;
}

function Input({ placeholder, type, onChange, value, styleInput, handleKeyDown }: InputProps): JSX.Element {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={style.input}
      onChange={onChange}
      value={value}
      style={styleInput}
      onKeyDown={(e) => { if(e.key === "Enter") {
        e.preventDefault();

        if(handleKeyDown) handleKeyDown(e);
      }
    }}
    />
  );
}

export default Input;
