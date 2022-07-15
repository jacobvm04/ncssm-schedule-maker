import { useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import { AppContext } from "../AppContext";
import { ClassData } from "../DataHandling/ClassLoader";
import { findValidSchedules } from "../DataHandling/Schedule";
import ClassExplorerOption from "./ClassExplorerOption";

// TODO: Fix the performance issues with the search bar

export default function ClassExplorer() {
  const {
    classesInfo: { fallClasses, springClasses },
    scheduleInfo: {
      fallScheduledClasses,
      setFallScheduledClasses,

      springScheduledClasses,
      setSpringScheduledClasses,

      setFallPossibleSchedules,
      setSpringPossibleSchedules,
    },
  } = useContext(AppContext)!;

  const [filteredClasses, setFilteredClasses] = useState<ClassData[]>([]);
  const [search, setSearch] = useState("");

  const classes = useMemo(() => {
    const newSpringClasses = springClasses.filter(
      (course) =>
        !fallClasses.some(
          (fallCourse) => course.courseCode === fallCourse.courseCode
        )
    );
    return [...fallClasses, ...newSpringClasses];
  }, [springClasses, fallClasses]);

  useEffect(() => setFilteredClasses(classes), [classes]);

  useEffect(() => {
    const newFilteredClasses = classes.filter(
      (course) =>
        course.courseCode.toLowerCase().includes(search.toLowerCase()) ||
        course.courseName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredClasses(newFilteredClasses);
  }, [search, classes]);

  function addClass(courseCode: string, isFall: boolean) {
    const searchClases = isFall ? fallClasses : springClasses;
    const classData: ClassData | undefined = searchClases.find(
      (classItem) => classItem.courseCode === courseCode
    );
    if (!classData) return;

    const scheduledClasses = isFall
      ? fallScheduledClasses
      : springScheduledClasses;
    const newSchedule = scheduledClasses.concat([classData]);
    const validSchedules = findValidSchedules(newSchedule);
    console.log(isFall ? "fall" : "spring", "validSchedules", validSchedules);

    if (validSchedules.length > 0) {
      if (isFall) {
        setFallScheduledClasses(fallScheduledClasses.concat([classData]));
        setFallPossibleSchedules(validSchedules);
      } else {
        setSpringScheduledClasses(springScheduledClasses.concat([classData]));
        setSpringPossibleSchedules(validSchedules);
      }

      console.log(
        isFall ? "fall" : "spring",
        "schedule",
        isFall
          ? fallScheduledClasses.concat([classData])
          : springScheduledClasses.concat([classData])
      );
    }
  }

  const classesComponents = filteredClasses.map((classItem) => (
    <ClassExplorerOption
      {...classItem}
      addClass={addClass}
      key={classItem.courseCode}
    />
  ));

  return (
    <div className="flex flex-col h-100 p-4 w-screen md:max-w-md md:w-100 rounded-lg shadow-lg bg-white resize-y overflow-hidden">
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

      <div className="flex flex-col space-y-4 overflow-auto h-full mb-2 w-full bg-gray-200 rounded-lg px-4 py-6 mt-4">
        {classesComponents}
      </div>
    </div>
  );
}
