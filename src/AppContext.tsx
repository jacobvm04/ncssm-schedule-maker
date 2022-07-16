import { createContext, useEffect, useState } from "react";
import { ClassData, loadClasses } from "./DataHandling/ClassLoader";
import { EmptyClassData } from "./DataHandling/Schedule";

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

    fallPossibleSchedules: ClassData[][];
    setFallPossibleSchedules: (possibleSchedules: ClassData[][]) => void;

    springScheduledClasses: ClassData[];
    setSpringScheduledClasses: (scheduledClasses: ClassData[]) => void;

    springPossibleSchedules: ClassData[][];
    setSpringPossibleSchedules: (possibleSchedules: ClassData[][]) => void;
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

  const emptySchedule: ClassData[] = [
    EmptyClassData,
    EmptyClassData,
    EmptyClassData,
    EmptyClassData,
    EmptyClassData,
    EmptyClassData,
    EmptyClassData,
    EmptyClassData,
    EmptyClassData,
  ];

  const [fallScheduledClasses, setFallScheduledClasses] = useState<ClassData[]>(
    []
  );
  const [fallPossibleSchedules, setFallPossibleSchedules] = useState<
    ClassData[][]
  >([emptySchedule]);

  const [springScheduledClasses, setSpringScheduledClasses] = useState<
    ClassData[]
  >([]);
  const [springPossibleSchedules, setSpringPossibleSchedules] = useState<
    ClassData[][]
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
