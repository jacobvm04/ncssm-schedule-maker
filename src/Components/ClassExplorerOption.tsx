import { useContext, useEffect, useMemo, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { AppContext } from "../AppContext";
import { Tooltip } from "flowbite-react";
import { findValidSchedules } from "../DataHandling/Schedule";

function ConditionalWrapper({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper: (children: React.ReactElement) => JSX.Element;
  children: React.ReactElement;
}) {
  return condition ? wrapper(children) : children;
}

interface ClassProp {
  courseCode: string;
  courseName: string;
  addClass: (courseCode: string, isFall: boolean) => void;
}

export default function ClassExplorerOption({
  courseCode,
  courseName,
  addClass,
}: ClassProp) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    classesInfo: { fallClasses, springClasses },
    scheduleInfo: { fallScheduledClasses, springScheduledClasses },
  } = useContext(AppContext)!;

  const availableFall = useMemo(() => {
    const alreadyScheduled =
      fallScheduledClasses.some((course) => course.courseCode === courseCode) ||
      springScheduledClasses.some((course) => course.courseCode === courseCode);

    if (alreadyScheduled) return false;

    return fallClasses.some((course) => course.courseCode === courseCode);
  }, [courseCode, fallClasses, fallScheduledClasses, springScheduledClasses]);
  const availableSpring = useMemo(() => {
    const alreadyScheduled =
      fallScheduledClasses.some((course) => course.courseCode === courseCode) ||
      springScheduledClasses.some((course) => course.courseCode === courseCode);

    if (alreadyScheduled) return false;

    return springClasses.some((course) => course.courseCode === courseCode);
  }, [courseCode, springClasses, fallScheduledClasses, springScheduledClasses]);

  const [cantAddFall, setCantAddFall] = useState(false);
  const [cantAddSpring, setCantAddSpring] = useState(false);

  useEffect(() => {
    const newClass = fallClasses.find(
      (course) => course.courseCode === courseCode
    )!;

    if (
      availableFall &&
      findValidSchedules(fallScheduledClasses.concat([newClass])).length === 0
    )
      setCantAddFall(true);
    else setCantAddFall(false);
  }, [courseCode, fallClasses, fallScheduledClasses, availableFall]);

  useEffect(() => {
    const newClass = springClasses.find(
      (course) => course.courseCode === courseCode
    )!;
    if (
      availableSpring &&
      findValidSchedules(springScheduledClasses.concat([newClass])).length === 0
    )
      setCantAddSpring(true);
    else setCantAddSpring(false);
  }, [courseCode, springClasses, springScheduledClasses, availableSpring]);

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
      <ConditionalWrapper
        condition={!availableFall || cantAddFall}
        wrapper={(children) => (
          <Tooltip
            content={
              !availableFall
                ? "This class is not available in the Fall, or it is already scheduled."
                : "Adding this class would cause a conflict."
            }
            {...{ children }}
          />
        )}
      >
        <button
          className={`${
            !availableFall
              ? "text-gray-400"
              : cantAddFall
              ? "text-red-600"
              : "text-blue-600"
          } font-bold p-2 rounded-md hover:bg-gray-200`}
          onClick={() => {
            if (availableFall) addClass(courseCode, true);
          }}
        >
          Add Fall
        </button>
      </ConditionalWrapper>

      <ConditionalWrapper
        condition={!availableSpring || cantAddSpring}
        wrapper={(children) => (
          <Tooltip
            content={
              !availableSpring
                ? "This class is not available in the Spring, or it is already scheduled."
                : "Adding this class would cause a conflict."
            }
            {...{ children }}
          />
        )}
      >
        <button
          className={`${
            !availableSpring
              ? "text-gray-400"
              : cantAddSpring
              ? "text-red-600"
              : "text-blue-600"
          } font-bold p-2 rounded-md hover:bg-gray-200`}
          onClick={() => {
            if (availableSpring) addClass(courseCode, false);
          }}
        >
          Add Spring
        </button>
      </ConditionalWrapper>
    </div>
  );

  return (
    <div className="flex flex-col p-4 shadow-sm bg-white rounded-lg">
      {classHeader}
      {classBody}
    </div>
  );
}
