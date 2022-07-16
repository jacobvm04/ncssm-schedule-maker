import { createContext, useEffect, useState } from "react";
import { ClassData, loadClasses } from "./DataHandling/ClassLoader";
import { EmptyClassData, ScheduledClassData } from "./DataHandling/Schedule";

interface AppContextInterface {
  classesInfo: {
    fallClasses: ClassData[];
    setFallClasses: (classes: ClassData[]) => void;

    springClasses: ClassData[];
    setSpringClasses: (classes: ClassData[]) => void;
  };

  scheduleInfo: {
    fallScheduledClasses: ClassData[];
    setFallScheduledClasses: (scheduledClasses: ClassData[]) => void;

    fallPossibleSchedules: ScheduledClassData[][][];
    setFallPossibleSchedules: (
      possibleSchedules: ScheduledClassData[][][]
    ) => void;

    springScheduledClasses: ClassData[];
    setSpringScheduledClasses: (scheduledClasses: ClassData[]) => void;

    springPossibleSchedules: ScheduledClassData[][][];
    setSpringPossibleSchedules: (
      possibleSchedules: ScheduledClassData[][][]
    ) => void;
  };
}

export const AppContext = createContext<AppContextInterface | null>(null);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fallClasses, setFallClasses] = useState<ClassData[]>([]);
  const [springClasses, setSpringClasses] = useState<ClassData[]>([]);

  const emptySchedule: ScheduledClassData[][] = [
    [EmptyClassData],
    [EmptyClassData],
    [EmptyClassData],
    [EmptyClassData],
    [EmptyClassData],
    [EmptyClassData],
    [EmptyClassData],
    [EmptyClassData],
    [EmptyClassData],
  ];

  const [fallScheduledClasses, setFallScheduledClasses] = useState<ClassData[]>(
    []
  );
  const [fallPossibleSchedules, setFallPossibleSchedules] = useState<
    ScheduledClassData[][][]
  >([emptySchedule]);

  const [springScheduledClasses, setSpringScheduledClasses] = useState<
    ClassData[]
  >([]);
  const [springPossibleSchedules, setSpringPossibleSchedules] = useState<
    ScheduledClassData[][][]
  >([emptySchedule]);

  useEffect(() => {
    loadClasses().then((classes) => {
      setFallClasses(classes.fallClasses);
      setSpringClasses(classes.springClasses);
    });
  }, []);

  const value: AppContextInterface = {
    classesInfo: {
      fallClasses,
      setFallClasses,

      springClasses,
      setSpringClasses,
    },
    scheduleInfo: {
      fallScheduledClasses,
      setFallScheduledClasses,

      fallPossibleSchedules,
      setFallPossibleSchedules,

      springScheduledClasses,
      setSpringScheduledClasses,

      springPossibleSchedules,
      setSpringPossibleSchedules,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
