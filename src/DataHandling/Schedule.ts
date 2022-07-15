import { ClassData } from "./ClassLoader";

const emptyClassData: ClassData = {
  courseCode: "EMPTY",
  courseName: "EMPTY",
  courseMeetingPatterns: [],
  fallSemester: false,
  springSemester: false,
};

function isValidSchedule(schedule: ClassData[], requestedClasses: ClassData[]) {
  for (const requestedClass of requestedClasses) {
    const foundClass = schedule.find((classData) => classData.courseCode === requestedClass.courseCode);

    if (!foundClass)
      return false;
  }

  const numEmptyClasses = schedule.filter((classData) => classData.courseCode === "EMPTY").length;
  if (schedule.length - numEmptyClasses !== requestedClasses.length)
    return false;

  return true;
}

export function findValidSchedules(requestedClasses: ClassData[]) {
  const possibleSchedules: ClassData[][] = [];

  const courseCodes = requestedClasses.map((classData) => classData.courseCode);
  const uniqueCourseCodes = [...new Set(courseCodes)];
  if (courseCodes.length !== uniqueCourseCodes.length)
    return possibleSchedules;

  const blockMap = new Map<string, ClassData[]>();
  for (const classData of requestedClasses) {
    for (const meetingPattern of classData.courseMeetingPatterns) {
      const block = meetingPattern[0];

      if (blockMap.has(block) && blockMap.get(block)?.find(classDataArr => classDataArr.courseCode === classData.courseCode) === undefined)
        blockMap.get(block)!.push(classData);
      else if (!blockMap.has(block))
        blockMap.set(block, [classData]);
    }
  }

  const blocks = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  
  for (const block of blocks)
    if (!blockMap.has(block))
      blockMap.set(block, [emptyClassData]);
    else
      blockMap.get(block)!.push(emptyClassData);

  for (const blockA of blockMap.get(blocks[0])!)
    for (const blockB of blockMap.get(blocks[1])!)
      for (const blockC of blockMap.get(blocks[2])!)
        for (const blockD of blockMap.get(blocks[3])!)
          for (const blockE of blockMap.get(blocks[4])!)
            for (const blockF of blockMap.get(blocks[5])!)
              for (const blockG of blockMap.get(blocks[6])!)
                for (const blockH of blockMap.get(blocks[7])!)
                  for (const blockI of blockMap.get(blocks[8])!)
                    possibleSchedules.push([blockA, blockB, blockC, blockD, blockE, blockF, blockG, blockH, blockI]);

  return possibleSchedules.filter(schedule => isValidSchedule(schedule, requestedClasses));
}
