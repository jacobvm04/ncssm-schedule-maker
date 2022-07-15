export interface ClassData {
  courseCode: string;
  courseName: string;
  courseMeetingPatterns: string[];
  fallSemester: boolean;
  springSemester: boolean;
}

interface ClassLoadRes {
  fallClasses: ClassData[];
  springClasses: ClassData[];
}

export async function loadClasses(): Promise<ClassLoadRes> {
  const classRes = await fetch('https://ncssm-schedule-maker.netlify.app/.netlify/functions/load-classes');
  const classData: ClassLoadRes = await classRes.json() as ClassLoadRes;
  
  return classData;
}
