interface ClassData {
  courseCode: string;
  courseName: string;
  courseMeetingPattern: string;
  fallSemester: boolean;
  springSemester: boolean;
}

export async function loadClasses() {
  const classRes = await fetch('https://ncssm-schedule-maker.netlify.app/.netlify/functions/load-classes');
  const classData: ClassData[] = await classRes.json() as ClassData[];
  console.log(classData);
}
