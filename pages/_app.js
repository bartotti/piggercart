//import '@/styles/globals.css'

import React from "react";
import { Provider } from "react-redux";
import store from "./api/store/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
