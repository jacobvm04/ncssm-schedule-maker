interface ClassData {
  courseCode: string;
  courseName: string;
  courseMeetingPattern: string;
  fallSemester: boolean;
  springSemester: boolean;
}

export async function loadClasses() {
  const why: ClassData = {
    courseCode: 'dd',
    courseName: 'dd',
    courseMeetingPattern: 'dd',
    fallSemester: true,
    springSemester: false,
  };

  return [why];
}
