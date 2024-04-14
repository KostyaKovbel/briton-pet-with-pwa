import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

import { INITIAL_INPUT_VALUE, SEARCH_PLACEHOLDER } from "@/utils/constants";
import { SelectInputProps } from "./types";

import styles from "./styles.module.css";

export const SelectInput: React.FC<SelectInputProps> = ({
  list = [],
  handleSelectedKey,
  selectedKey,
}: SelectInputProps) => {
  const [inputValue, setInputValue] = useState(
    selectedKey ?? INITIAL_INPUT_VALUE
  );
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const handleOpenDropdown = () => setIsDropdownOpened(true);
  const handleCloseDropdown = () => setIsDropdownOpened(false);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isDropdownOpened) handleOpenDropdown();
  };

  const handleKeyChange = useCallback(
    (value: string) => {
      handleSelectedKey(value);
      setInputValue(value);
      handleCloseDropdown();
    },
    [handleSelectedKey]
  );

  const handleClick = (e: MouseEvent<HTMLLIElement>) =>
    handleKeyChange(e.currentTarget.dataset.value || "");

  const filteredList = useMemo(() => {
    const lowerInputValue = inputValue.toLocaleLowerCase().replace(".", ",");

    if (!lowerInputValue || !list.length) {
      return list;
    }

    const resultList = list.filter((item) => {
      const isAccurate = item.toLocaleLowerCase().startsWith(lowerInputValue);
      const lowerItem = item.toLocaleLowerCase();
      return isAccurate
        ? lowerItem.startsWith(lowerInputValue)
        : lowerItem.includes(lowerInputValue);
    });

    if (
      resultList?.length &&
      resultList[0].toLocaleLowerCase() === lowerInputValue
    ) {
      handleKeyChange(resultList[0]);
    }

    return resultList;
  }, [inputValue, list, handleKeyChange]);

  const placeholderValue = useMemo(() => {
    if (!inputValue) {
      return SEARCH_PLACEHOLDER;
    }

    if (!filteredList[0]) {
      return INITIAL_INPUT_VALUE;
    }

    const firstFilteredItem = filteredList[0].toLocaleLowerCase();
    const startsWithExactMatch = firstFilteredItem.startsWith(
      inputValue.toLocaleLowerCase()
    );

    if (!startsWithExactMatch) {
      return INITIAL_INPUT_VALUE;
    }

    return inputValue + filteredList[0].slice(inputValue.length);
  }, [filteredList, inputValue]);

  return (
    <>
      {isDropdownOpened && <div className={styles.backdrop} />}
      <div className={styles.inputWrapper}>
        <input
          value={inputValue}
          onChange={handleChangeValue}
          onClick={handleOpenDropdown}
          className={isDropdownOpened ? styles.opened : ""}
        />
        <label>{placeholderValue}</label>
        {isDropdownOpened && (
          <ul className={styles.list}>
            {filteredList?.length ? (
              filteredList.map((item) => (
                <li
                  key={item}
                  onClick={handleClick}
                  data-value={item}
                  className={styles.selectable}
                >
                  {item}
                </li>
              ))
            ) : (
              <li>Немає результатів</li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};
