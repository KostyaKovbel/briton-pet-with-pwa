import { MouseEvent } from "react";

export type SelectInputProps = {
  list?: string[];
  selectedKey?: string | null;
  handleSelectedKey: (event: MouseEvent<HTMLLIElement> | string) => void;
};
