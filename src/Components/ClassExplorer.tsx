import { useEffect } from "react";
import { useState } from "react";
import { loadClasses } from "../DataHandling/ClassLoader";

interface ClassProp {
  courseCode: string;
  courseName: string;
}

export default function ClassExplorer() {
  const [classes, setClasses] = useState<ClassProp[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassProp[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadClasses().then((classes) => {
      setClasses(classes);
      setFilteredClasses(classes);
    });
  }, []);

  useEffect(() => {
    const newFilteredClasses = classes.filter(
      (classItem) =>
        classItem.courseCode.toLowerCase().includes(search.toLowerCase()) ||
        classItem.courseName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredClasses(newFilteredClasses);
  }, [search]);

  const classesComponents = filteredClasses.map((classProp) => (
    <div
      className="flex flex-col p-4 shadow-sm bg-white rounded-lg"
      key={classProp.courseCode}
    >
      <div className="text-lg">
        <span className="font-bold">{classProp.courseCode}</span>{" "}
        {classProp.courseName}
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col  p-4 max-w-md w-100 rounded-lg shadow-lg bg-white">
      <div className="text-2xl font-bold">Class Explorer</div>

      <div className="relative mr-4 mt-4">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border-gray-300 border-2 focus:outline-none focus:border-gray-500"
          placeholder="Search for a class"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col space-y-4 overflow-auto h-96  w-full bg-gray-200 rounded-lg px-4 py-6 mt-4">
        {classesComponents}
      </div>
    </div>
  );
}
