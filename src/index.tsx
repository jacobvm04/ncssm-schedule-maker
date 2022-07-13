import React from "react";
import ReactDOM from "react-dom/client";
import ClassExplorer from "./Components/ClassExplorer";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="flex justify-center mx-auto bg-gray-100 min-h-screen">
      <div className="min-h-0">
        <ClassExplorer />
      </div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
