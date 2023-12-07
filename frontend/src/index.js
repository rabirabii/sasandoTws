import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Store from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { AudioPlayerProvider } from "./audioContext";

let persistor = persistStore(Store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <AudioPlayerProvider>
          <App />
        </AudioPlayerProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
