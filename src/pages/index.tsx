import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getTableData } from "@/utils/endpoints/getTableData";
import { getIsParam } from "@/utils/helpers/getIsParam";
import { processData } from "@/utils/helpers/processData";
import { BACK, COLOR, WIDTH } from "@/utils/constants";
import { TSelectedParam, TTableData } from "@/utils/types";
import { SelectInput } from "@/app/components/Select";

import styles from "@/styles/styles.module.css";
import { Header } from "@/app/components/Header";

export default function Home({ data }: TTableData) {
  const [selectedParam, setSelectedParam] = useState<TSelectedParam | null>(
    null
  );
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const isSelectedWidth = selectedParam === WIDTH;
  const list = isSelectedWidth ? data?.validWidths : data?.validColors;

  useEffect(() => {
    const { param, value } = router.query;

    if (getIsParam(param)) {
      setSelectedParam(param);
    } else {
      setSelectedParam(null);
    }
    if (typeof value === "string") {
      setSelectedKey(value);
    } else {
      setSelectedKey(null);
    }
  }, [router]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelectParam = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    if (value === BACK) {
      delete router.query.param;
      delete router.query.value;
      router.push({ pathname: "/" }, undefined, { shallow: true });
    }
    if (getIsParam(value)) {
      router.push({ pathname: "/", query: { param: value } }, undefined, {
        shallow: true,
      });
    }
  };

  const handleSelectedKey = useCallback(
    (event: MouseEvent<HTMLLIElement> | string) => {
      const clickedValue =
        typeof event === "string" ? event : event.currentTarget.dataset.value;
      const isValid = list?.find((el) => el === clickedValue);
      if (isValid && clickedValue) {
        router.push(
          {
            pathname: "/",
            query: { param: selectedParam, value: clickedValue },
          },
          undefined,
          { shallow: true }
        );
      }
    },
    [list, selectedParam]
  );

  const getEntry = () => {
    if (!selectedKey) return [];
    const entryList = isSelectedWidth ? data?.widthResults : data?.colorResults;

    return entryList?.[selectedKey] ?? [];
  };

  const entry = getEntry();

  const searchCategoryResultTitle = isSelectedWidth
    ? `Ширина ${selectedKey} м`
    : `Колір ${selectedKey}`;
  const searchCategoryResultText = isSelectedWidth
    ? `доступна в кольорах:`
    : `доступний в ширині:`;

  if (!isClient || !router.isReady) {
    return <></>;
  }

  if (!selectedParam) {
    return (
      <div className={styles.container}>
        <Header />
        <button
          className={styles.category}
          onClick={handleSelectParam}
          value={COLOR}
        >
          пошук <br />
          по Кольору
        </button>
        <button
          className={styles.category}
          onClick={handleSelectParam}
          value={WIDTH}
        >
          Пошук <br /> по Ширині
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <p className={styles.searchTitle}>
        Пошук по {isSelectedWidth ? "ширині" : "кольору"}
      </p>
      <SelectInput
        list={list}
        selectedKey={selectedKey}
        handleSelectedKey={handleSelectedKey}
      />

      <button
        className={styles.backButton}
        onClick={handleSelectParam}
        value={BACK}
      >
        {BACK}
      </button>
      {selectedKey ? (
        <div className={styles.searchCategoryResultBlock}>
          <p className={styles.resultsTitle}>{searchCategoryResultTitle}</p>
          <p className={styles.resultText}>{searchCategoryResultText}</p>
          {entry.length ? (
            <ul className={styles.results}>
              {entry.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <div>Немає в наявності</div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await getTableData({
    privateKey: process.env.PRIVATE_KEY,
    range: process.env.RANGE,
    spreadsheetId: process.env.TABLE_ID,
    clientId: process.env.CLIENT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
  });

  const processedData = processData(data);

  return {
    props: {
      data: processedData,
      fallback: true,
      revalidate: 3000,
    },
  };
};
