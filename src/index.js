import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import { createRoot } from "react-dom/client";

import "./index.css";

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <App tab="home" />
  </Provider>
);
