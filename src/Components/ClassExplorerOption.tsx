import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";

export interface ClassProp {
  courseCode: string;
  courseName: string;
  addClass: (courseCode: string) => void;
}

export default function ClassExplorerOption({
  courseCode,
  courseName,
  addClass,
}: ClassProp) {
  const [isOpen, setIsOpen] = useState(false);

  const classHeader = (
    <div className="text-lg flex">
      <p>
        <span className="font-bold">{courseCode}</span> {courseName}
      </p>
      <span className="grow" />
      <ChevronRightIcon
        className={`transition ease-in-out w-6 fill-gray-600 ${
          isOpen ? "rotate-90" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );

  const classBody = !isOpen ? null : (
    <div className="text-base flex justify-start mr-auto mt-4 gap-x-4">
      <button
        className="text-blue-600 font-bold p-2 rounded-md hover:bg-gray-200"
        onClick={() => addClass(courseCode)}
      >
        Add Fall
      </button>
      <button className="text-blue-600 font-bold p-2 rounded-md hover:bg-gray-200">
        Add Spring
      </button>
    </div>
  );

  return (
    <div className="flex flex-col p-4 shadow-sm bg-white rounded-lg">
      {classHeader}
      {classBody}
    </div>
  );
}
