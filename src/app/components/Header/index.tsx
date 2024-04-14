import { useRouter } from "next/router";

import styles from "./style.module.css";

export const Header = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push({ pathname: "/" }, undefined, { shallow: true });
  };
  return (
    <div className={styles.container}>
      <h3 onClick={handleGoBack}>Briton</h3>
      <p>Плівки в наявності</p>
    </div>
  );
};
