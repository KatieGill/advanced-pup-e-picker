import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { App } from "./App";
import { ActiveComponentProvider } from "./Providers/ActiveComponentProvider";
import { DogsProvider } from "./Providers/DogsProvider";
import { IsLoadingProvider } from "./Providers/IsLoadingProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <ActiveComponentProvider>
      <IsLoadingProvider>
        <DogsProvider>
          <App />
        </DogsProvider>
      </IsLoadingProvider>
    </ActiveComponentProvider>
  </React.StrictMode>
);
