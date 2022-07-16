import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { ClassData } from "../DataHandling/ClassLoader";
import Timetable2022 from "../Timetables/Timetable2022.json";

interface ClassBlock {
  block: string;
  start: string;
  end: string;
}

interface Timetable {
  monday: ClassBlock[];
  tuesday: ClassBlock[];
  wednesday: ClassBlock[];
  thursday: ClassBlock[];
  friday: ClassBlock[];
}

const timetable: Timetable = Timetable2022;

const blockToNumMap = new Map<string, number>([
  ["A", 0],
  ["B", 1],
  ["C", 2],
  ["D", 3],
  ["E", 4],
  ["F", 5],
  ["G", 6],
  ["H", 7],
  ["I", 8],
]);

interface PossibleScheduleViewerProps {
  fallPossibleSchedules: ClassData[][];
  springPossibleSchedules: ClassData[][];
}

export default function PossibleScheduleViewer({
  fallPossibleSchedules,
  springPossibleSchedules,
}: PossibleScheduleViewerProps) {
  const [isFall, setIsFall] = useState(true);
  const [currentSchedule, setCurrentSchedule] = useState(1);

  useEffect(
    () => setCurrentSchedule(1),
    [fallPossibleSchedules, springPossibleSchedules]
  );

  function getBlockElements(blocks: ClassBlock[]) {
    const possibleSchedules = isFall
      ? fallPossibleSchedules
      : springPossibleSchedules;

    return blocks
      .filter((block) => {
        const classData =
          possibleSchedules[currentSchedule - 1][
            blockToNumMap.get(block.block)!
          ];

        return classData.courseCode !== "EMPTY";
      })
      .map((block) => {
        const classData =
          possibleSchedules[currentSchedule - 1][
            blockToNumMap.get(block.block)!
          ];

        return (
          <div className="p-1 mx-2 shadow-sm bg-white rounded-lg text-sm">
            <span className="font-bold">{classData.courseCode}</span>{" "}
            {block.start} - {block.end}
          </div>
        );
      });
  }

  const mondayBlocks = getBlockElements(timetable.monday);
  const tuesdayBlocks = getBlockElements(timetable.tuesday);
  const wednesdayBlocks = getBlockElements(timetable.wednesday);
  const thursdayBlocks = getBlockElements(timetable.thursday);
  const fridayBlocks = getBlockElements(timetable.friday);

  return (
    <div className="flex flex-col p-4 rounded-lg shadow-lg bg-white md:mx-8 mb-8 px-8">
      <div className="text-2xl font-bold">Possible Schedules</div>

      <div className="text-xl font-bold flex text-gray-600 mt-2">
        <p className="font-normal mt-1 mr-2">Semester</p>

        <ChevronLeftIcon
          className="-ml-2 w-10 fill-gray-400 hover:fill-gray-600"
          onClick={() => setIsFall(!isFall)}
        />
        <p className="mt-1">{isFall ? "Fall" : "Spring"}</p>
        <ChevronRightIcon
          className="w-10 fill-gray-400 hover:fill-gray-600"
          onClick={() => setIsFall(!isFall)}
        />
      </div>

      <div className="text-xl font-bold flex text-gray-600 mt-2">
        <p className="font-normal mt-1 mr-2">Possible Schedule</p>

        <ChevronLeftIcon
          className="-ml-2 w-10 fill-gray-400 hover:fill-gray-600"
          onClick={() =>
            setCurrentSchedule(
              currentSchedule > 1
                ? currentSchedule - 1
                : isFall
                ? fallPossibleSchedules.length
                : springPossibleSchedules.length
            )
          }
        />
        <p className="mt-1">{currentSchedule}</p>
        <ChevronRightIcon
          className="w-10 fill-gray-400 hover:fill-gray-600"
          onClick={() =>
            setCurrentSchedule(
              currentSchedule <
                (isFall
                  ? fallPossibleSchedules.length
                  : springPossibleSchedules.length)
                ? currentSchedule + 1
                : 1
            )
          }
        />
      </div>

      <div className="border-seperate flex flex-wrap justify-center mb-2 w-full rounded-lg mt-4">
        <div>
          <div className="text-lg font-semibold text-center my-2">Monday</div>
          <div className="flex flex-col gap-y-2 py-2 border-4 border-gray-400 w-64 min-h-[16em] bg-gray-200">
            {mondayBlocks}
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-center my-2">Tuesday</div>
          <div className="flex flex-col gap-y-2 py-2 border-4 border-gray-400 w-64 min-h-[16em] bg-gray-200">
            {tuesdayBlocks}
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-center my-2">
            Wednesday
          </div>
          <div className="flex flex-col gap-y-2 py-2 border-4 border-gray-400 w-64 min-h-[16em] bg-gray-200">
            {wednesdayBlocks}
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-center my-2">Thursday</div>
          <div className="flex flex-col gap-y-2 py-2 border-4 border-gray-400 w-64 min-h-[16em] bg-gray-200">
            {thursdayBlocks}
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-center my-2">Friday</div>
          <div className="flex flex-col gap-y-2 py-2 border-4 border-gray-400 w-64 min-h-[16em] bg-gray-200">
            {fridayBlocks}
          </div>
        </div>
      </div>
    </div>
  );
}
