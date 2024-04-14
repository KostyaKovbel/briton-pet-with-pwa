import { FC } from "react";

import styles from "./styles.module.css";

type SelectInputProps = {
  selectedParam: string;
};

export const SubTitle: FC<SelectInputProps> = ({ selectedParam }) => {
  return (
    <div className={styles.subtitle}>
      Пошук по {selectedParam === "width" ? "Ширині" : "Кольору"}
    </div>
  );
};
