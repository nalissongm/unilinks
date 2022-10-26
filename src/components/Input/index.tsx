import React from "react";
import styles from "./input.module.scss";

interface InputProps {
  label: string;
  id: string;
  type: "text" | "textarea" | "url";
  placeholder: string;
  isRequired: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, type, placeholder, isRequired }, ref) => (
    <div className={styles.content}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        ref={ref}
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  )
);

Input.displayName = "Input";
