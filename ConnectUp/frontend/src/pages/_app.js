import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../config/redux/store";

export default function App({ Component, pageProps }) {
  <Provider store={store}>
    <Component {...pageProps} />;
  </Provider>
  
}
