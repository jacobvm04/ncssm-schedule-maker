import { XIcon } from "@heroicons/react/solid";
import { ClassData } from "../DataHandling/ClassLoader";

interface ScheduleViewerProps {
  semesterTitle: string;
  classes: ClassData[];
  removeClass: (classData: ClassData) => void;
}

export default function ScheduleViewer({
  semesterTitle,
  classes,
  removeClass,
}: ScheduleViewerProps) {
  const classesComponents = classes.map((classData) => (
    <div className="flex flex-col p-4 shadow-sm bg-white rounded-lg">
      <div className="text-lg flex">
        <p>
          <span className="font-bold">{classData.courseCode}</span>{" "}
          {classData.courseName}
        </p>
        <span className="grow" />
        <XIcon
          className="w-5 fill-gray-600 hover:fill-red-600"
          onClick={() => removeClass(classData)}
        />
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col h-100 p-4 w-screen md:max-w-md md:w-100 rounded-lg shadow-lg bg-white resize-y overflow-hidden">
      <div className="text-2xl font-bold">{semesterTitle}</div>

      <div className="flex flex-col space-y-4 overflow-auto h-full mb-2 w-full bg-gray-200 rounded-lg px-4 py-6 mt-4">
        {classesComponents}
      </div>
    </div>
  );
}
