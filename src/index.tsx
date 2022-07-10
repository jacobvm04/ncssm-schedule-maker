import React from "react";
import ReactDOM from "react-dom/client";
import ClassExplorer from "./Components/ClassExplorer";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { loadClasses } from "./DataHandling/ClassLoader";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const classes = [
  { courseCode: "CS101", courseName: "Introduction to Computer Science" },
  { courseCode: "CS102", courseName: "Introduction to Computer Science" },
  { courseCode: "CS103", courseName: "Introduction to Computer Science" },
  { courseCode: "CS104", courseName: "Introduction to Computer Science" },
  { courseCode: "CS105", courseName: "Introduction to Computer Science" },
  { courseCode: "CS106", courseName: "Introduction to Computer Science" },
];

root.render(
  <React.StrictMode>
    <div className="flex justify-center mx-auto bg-">
      <ClassExplorer classes={classes} />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
console.log(loadClasses());
reportWebVitals();
