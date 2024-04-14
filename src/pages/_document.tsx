import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <link rel="manifest" href="/manifest.json" />
      <title>Наявність плівки | Briton</title>
      <link rel="icon" href="/logo.png" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
