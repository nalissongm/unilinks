import styles from "./button.module.scss";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  action: () => any;
}

export function Button({
  label,
  variant = "primary",
  action,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`${styles.button} ${
        variant === "primary" ? styles.primary : styles.secondary
      }`}
      onClick={action}
    >
      {label}
    </button>
  );
}
