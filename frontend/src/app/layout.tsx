"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./../../store/index";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/i18n";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <main className="flex-grow">{children}</main>
          </I18nextProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
