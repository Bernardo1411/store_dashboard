import React from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
  value: string;
  items: SelectOption[];
  onChange: (category: string) => void;
}

function Select({ value, items, onChange }: SelectProps) {
  return (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
    >
      <option value="standard">Padrão</option>
      {items &&
        items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
    </select>
  );
}

export default Select;
