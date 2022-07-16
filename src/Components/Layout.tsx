import { useContext } from "react";
import { AppContext } from "../AppContext";
import { ClassData } from "../DataHandling/ClassLoader";
import { findValidSchedules } from "../DataHandling/Schedule";
import ClassExplorer from "./ClassExplorer";
import PossibleScheduleViewer from "./PossibleScheduleViewer";
import ScheduleViewer from "./ScheduleViewer";

export default function Layout() {
  const {
    scheduleInfo: {
      fallScheduledClasses,
      setFallScheduledClasses,

      springScheduledClasses,
      setSpringScheduledClasses,

      fallPossibleSchedules,
      setFallPossibleSchedules,

      springPossibleSchedules,
      setSpringPossibleSchedules,
    },
  } = useContext(AppContext)!;

  function getRemoveClassCallback(
    classes: ClassData[],
    setClasses: (classes: ClassData[]) => void,
    setPossibleSchedules: (possibleSchedules: ClassData[][]) => void
  ) {
    return (classData: ClassData) => {
      const newClasses = classes.filter(
        (c) => c.courseCode !== classData.courseCode
      );

      setClasses(newClasses);
      setPossibleSchedules(findValidSchedules(newClasses));
    };
  }

  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <div className="flex flex-wrap justify-center mx-auto min-h-0">
        <div className="lg:mr-4 md:mt-8">
          <ClassExplorer />
        </div>
        <div className="lg:mx-4 mt-8">
          <ScheduleViewer
            classes={fallScheduledClasses}
            semesterTitle="Fall Semester"
            removeClass={getRemoveClassCallback(
              fallScheduledClasses,
              setFallScheduledClasses,
              setFallPossibleSchedules
            )}
          />
        </div>
        <div className="lg:ml-4 mt-8">
          <ScheduleViewer
            classes={springScheduledClasses}
            semesterTitle="Spring Semester"
            removeClass={getRemoveClassCallback(
              springScheduledClasses,
              setSpringScheduledClasses,
              setSpringPossibleSchedules
            )}
          />
        </div>
      </div>
      <div className="flex justify-center my-8">
        <PossibleScheduleViewer
          fallPossibleSchedules={fallPossibleSchedules}
          springPossibleSchedules={springPossibleSchedules}
        />
      </div>
    </div>
  );
}
