import { ClassData, MeetingPattern } from "./ClassLoader";

export const EmptyClassData: ScheduledClassData = {
  courseCode: "EMPTY",
  courseName: "EMPTY",
  meetingPatterns: [],
  fallSemester: false,
  springSemester: false,
  assignedMeetingPattern: {
    block: "",
    days: [true, true, true, true, true],
    labs: [false, false, false, false, false],
  },
};

export interface ScheduledClassData extends ClassData {
  assignedMeetingPattern: MeetingPattern;
}

function isValidScheduleV1(
  schedule: ClassData[],
  requestedClasses: ClassData[]
) {
  for (const requestedClass of requestedClasses) {
    const foundClass = schedule.find(
      (classData) => classData.courseCode === requestedClass.courseCode
    );

    if (!foundClass) return false;
  }

  const numEmptyClasses = schedule.filter(
    (classData) => classData.courseCode === "EMPTY"
  ).length;
  if (schedule.length - numEmptyClasses !== requestedClasses.length)
    return false;

  return true;
}

export function findValidSchedulesV1(requestedClasses: ClassData[]) {
  const possibleSchedules: ClassData[][] = [];

  const courseCodes = requestedClasses.map((classData) => classData.courseCode);
  const uniqueCourseCodes = [...new Set(courseCodes)];
  if (courseCodes.length !== uniqueCourseCodes.length) return possibleSchedules;

  const blockMap = new Map<string, ClassData[]>();
  for (const classData of requestedClasses) {
    for (const meetingPattern of classData.meetingPatterns) {
      const block = meetingPattern.block;

      if (
        blockMap.has(block) &&
        blockMap
          .get(block)
          ?.find(
            (classDataArr) => classDataArr.courseCode === classData.courseCode
          ) === undefined
      )
        blockMap.get(block)!.push(classData);
      else if (!blockMap.has(block)) blockMap.set(block, [classData]);
    }
  }

  const blocks = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  for (const block of blocks)
    if (!blockMap.has(block)) blockMap.set(block, [EmptyClassData]);
    else blockMap.get(block)!.push(EmptyClassData);

  for (const blockA of blockMap.get(blocks[0])!)
    for (const blockB of blockMap.get(blocks[1])!)
      for (const blockC of blockMap.get(blocks[2])!)
        for (const blockD of blockMap.get(blocks[3])!)
          for (const blockE of blockMap.get(blocks[4])!)
            for (const blockF of blockMap.get(blocks[5])!)
              for (const blockG of blockMap.get(blocks[6])!)
                for (const blockH of blockMap.get(blocks[7])!)
                  for (const blockI of blockMap.get(blocks[8])!)
                    possibleSchedules.push([
                      blockA,
                      blockB,
                      blockC,
                      blockD,
                      blockE,
                      blockF,
                      blockG,
                      blockH,
                      blockI,
                    ]);

  return possibleSchedules.filter((schedule) =>
    isValidScheduleV1(schedule, requestedClasses)
  );
}

function isValidSchedule(
  schedule: ScheduledClassData[][],
  requestedClasses: ClassData[]
) {
  const flatClasses = schedule.flat();

  for (const requestedClass of requestedClasses) {
    const foundClass = flatClasses.find(
      (classData) => classData.courseCode === requestedClass.courseCode
    );

    if (!foundClass) return false;
  }

  for (const blockClasses of schedule) {
    const blockDays = blockClasses.map(
      (classData) => classData.assignedMeetingPattern.days
    );

    for (let i = 0; i < 5; i++) {
      let oneTrue = false;
      for (const blockDaysArr of blockDays) {
        if (blockDaysArr[i] && !oneTrue) {
          oneTrue = true;
        } else if (blockDaysArr[i] && oneTrue) {
          return false;
        }
      }
    }
  }

  // const numEmptyClasses = flatClasses.filter(
  //   (classData) => classData.courseCode === "EMPTY"
  // ).length;
  // if (flatClasses.length - numEmptyClasses !== requestedClasses.length) {
  //   return false;
  // }

  return true;
}

function getAllSubArrays(arr: any[]): any[][] {
  if (arr.length === 1) return [arr];
  else {
    const subArr = getAllSubArrays(arr.slice(1));
    return subArr.concat(
      subArr.map((e) => e.concat(arr[0])),
      [[arr[0]]]
    );
  }
}

export function findValidSchedules(requestedClasses: ClassData[]) {
  const possibleSchedules: ScheduledClassData[][][] = [];

  const courseCodes = requestedClasses.map((classData) => classData.courseCode);
  const uniqueCourseCodes = [...new Set(courseCodes)];
  if (courseCodes.length !== uniqueCourseCodes.length) return possibleSchedules;

  const blocks = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const blockMap = new Map<string, ScheduledClassData[]>();

  for (const block of blocks) {
    blockMap.set(block, [EmptyClassData]);
  }

  for (const classData of requestedClasses) {
    for (const meetingPattern of classData.meetingPatterns) {
      const block = meetingPattern.block;

      const newClassData: ScheduledClassData = {
        ...classData,
        assignedMeetingPattern: meetingPattern,
      };

      if (!blockMap.has(block)) return possibleSchedules;

      blockMap.get(block)!.push(newClassData);
    }
  }

  console.log(blockMap);

  const alreadyUsedClassesA = new Set<string>();
  const blockAValid = blockMap
    .get(blocks[0])!
    .filter(
      (classData) =>
        classData.courseCode === "EMPTY" ||
        !alreadyUsedClassesA.has(classData.courseCode)
    );
  for (const blockAClasses of getAllSubArrays(blockAValid)) {
    const alreadyUsedClassesB = new Set<string>(alreadyUsedClassesA);
    for (const classData of blockAClasses)
      if (classData.courseCode !== "EMPTY")
        alreadyUsedClassesB.add(classData.courseCode);

    const blockBValid = blockMap
      .get(blocks[1])!
      .filter(
        (classData) =>
          classData.courseCode === "EMPTY" ||
          !alreadyUsedClassesB.has(classData.courseCode)
      );
    for (const blockBClasses of getAllSubArrays(blockBValid)) {
      const alreadyUsedClassesC = new Set<string>(alreadyUsedClassesB);
      for (const classData of blockBClasses)
        if (classData.courseCode !== "EMPTY")
          alreadyUsedClassesC.add(classData.courseCode);

      const blockCValid = blockMap
        .get(blocks[2])!
        .filter(
          (classData) =>
            classData.courseCode === "EMPTY" ||
            !alreadyUsedClassesC.has(classData.courseCode)
        );
      for (const blockCClasses of getAllSubArrays(blockCValid)) {
        const alreadyUsedClassesD = new Set<string>(alreadyUsedClassesC);
        for (const classData of blockCClasses)
          if (classData.courseCode !== "EMPTY")
            alreadyUsedClassesD.add(classData.courseCode);

        const blockDValid = blockMap
          .get(blocks[3])!
          .filter(
            (classData) =>
              classData.courseCode === "EMPTY" ||
              !alreadyUsedClassesD.has(classData.courseCode)
          );
        for (const blockDClasses of getAllSubArrays(blockDValid)) {
          const alreadyUsedClassesE = new Set<string>(alreadyUsedClassesD);
          for (const classData of blockDClasses)
            if (classData.courseCode !== "EMPTY")
              alreadyUsedClassesE.add(classData.courseCode);

          const blockEValid = blockMap
            .get(blocks[4])!
            .filter(
              (classData) =>
                classData.courseCode === "EMPTY" ||
                !alreadyUsedClassesE.has(classData.courseCode)
            );
          for (const blockEClasses of getAllSubArrays(blockEValid)) {
            const alreadyUsedClassesF = new Set<string>(alreadyUsedClassesE);
            for (const classData of blockEClasses)
              if (classData.courseCode !== "EMPTY")
                alreadyUsedClassesF.add(classData.courseCode);

            const blockFValid = blockMap
              .get(blocks[5])!
              .filter(
                (classData) =>
                  classData.courseCode === "EMPTY" ||
                  !alreadyUsedClassesF.has(classData.courseCode)
              );
            for (const blockFClasses of getAllSubArrays(blockFValid)) {
              const alreadyUsedClassesG = new Set<string>(alreadyUsedClassesF);
              for (const classData of blockFClasses)
                if (classData.courseCode !== "EMPTY")
                  alreadyUsedClassesG.add(classData.courseCode);

              const blockGValid = blockMap
                .get(blocks[6])!
                .filter(
                  (classData) =>
                    classData.courseCode === "EMPTY" ||
                    !alreadyUsedClassesG.has(classData.courseCode)
                );
              for (const blockGClasses of getAllSubArrays(blockGValid)) {
                const alreadyUsedClassesH = new Set<string>(
                  alreadyUsedClassesG
                );
                for (const classData of blockGClasses)
                  if (classData.courseCode !== "EMPTY")
                    alreadyUsedClassesH.add(classData.courseCode);

                const blockHValid = blockMap
                  .get(blocks[7])!
                  .filter(
                    (classData) =>
                      classData.courseCode === "EMPTY" ||
                      !alreadyUsedClassesH.has(classData.courseCode)
                  );
                for (const blockHClasses of getAllSubArrays(blockHValid)) {
                  const alreadyUsedClassesI = new Set<string>(
                    alreadyUsedClassesH
                  );
                  for (const classData of blockHClasses)
                    if (classData.courseCode !== "EMPTY")
                      alreadyUsedClassesI.add(classData.courseCode);

                  const blockIValid = blockMap
                    .get(blocks[8])!
                    .filter(
                      (classData) =>
                        classData.courseCode === "EMPTY" ||
                        !alreadyUsedClassesI.has(classData.courseCode)
                    );
                  for (const blockIClasses of getAllSubArrays(blockIValid)) {
                    const schedule = [
                      blockAClasses,
                      blockBClasses,
                      blockCClasses,
                      blockDClasses,
                      blockEClasses,
                      blockFClasses,
                      blockGClasses,
                      blockHClasses,
                      blockIClasses,
                    ];

                    let numClasses = 0;
                    let numEmptyClasses = 0;
                    for (let i = 0; i < schedule.length; i++) {
                      for (let j = 0; j < schedule[i].length; j++) {
                        numClasses++;
                        if (schedule[i][j].courseCode === "EMPTY")
                          numEmptyClasses++;
                      }
                    }

                    if (
                      numClasses - numEmptyClasses ===
                      requestedClasses.length
                    ) {
                      possibleSchedules.push(schedule);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  console.log("Possible Schedules:", possibleSchedules);

  return possibleSchedules.filter((schedule) =>
    isValidSchedule(schedule, requestedClasses)
  );
}
