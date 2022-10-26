import { ReactNode } from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  type?: "submit" | "button";
  action: () => any;
}

export function Button({
  children,
  variant = "primary",
  type = "button",
  action,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`${styles.button} ${
        variant === "primary" ? styles.primary : styles.secondary
      }`}
      onClick={action}
      type={type}
    >
      {children}
    </button>
  );
}
