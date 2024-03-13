import React from "react";

import styles from "./Select.module.css";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  items: SelectOption[];
  defaultOption: string;
  stylesSelect?: object;
  onChange: (category: string) => void;
}

function Select({ value, items, defaultOption, onChange, stylesSelect }: SelectProps) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={stylesSelect}
    >
      <option className={styles.option} value="default">
        {defaultOption}
      </option>
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
