import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ModalDisclosureProvider } from "../contexts/ModalDisclosureContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalDisclosureProvider>
      <Component {...pageProps} />
    </ModalDisclosureProvider>
  );
}

export default MyApp;
