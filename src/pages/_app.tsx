import type { AppProps } from "next/app";

import { Oswald } from "next/font/google";
import "@/styles/globals.css";

const oswald = Oswald({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "500"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={oswald.className}>
      <Component {...pageProps} />
    </main>
  );
}
