import { GoogleSpreadsheet } from 'google-spreadsheet';

interface ClassData {
  courseCode: string;
  courseName: string;
  courseMeetingPattern: string;
  fallSemester: boolean;
  springSemester: boolean;
}

export async function loadClasses() {
  const classMeetingSheet = new GoogleSpreadsheet('1_LO-BQGbiR0LHUL--EyPf_dkVFZezms-H_j40p04XuU');
  classMeetingSheet.useApiKey('AIzaSyA1weQD4Higa2L9de352YNJw-Sl67O1XEk');

  await classMeetingSheet.loadInfo();
  const fallClasses = classMeetingSheet.sheetsByIndex[0];
  const springClasses = classMeetingSheet.sheetsByIndex[1];

  const fallClassesRows = await fallClasses.getRows({ offset: 1, limit: 300 });
  const springClassesRows = await springClasses.getRows({ offset: 1 , limit: 300 });

  const classes: Map<string, ClassData> = new Map();

  for (const row of fallClassesRows) {
    const courseNameSplit = row._rawData[2].split(' ');
    const courseCode = courseNameSplit[0];
    const courseName = courseNameSplit.slice(1).join(' ');

    if (classes.has(courseCode)) {
      const classData = classes.get(courseCode)!;
      classData.fallSemester = true;
    } else {
      const classData: ClassData = {
        courseCode,
        courseName,
        courseMeetingPattern: row._rawData[3],
        fallSemester: true,
        springSemester: false,
      };
      classes.set(courseCode, classData);
    }
  }

  for (const row of springClassesRows) {
    const courseNameSplit = row._rawData[2].split(' ');
    const courseCode = courseNameSplit[0];
    const courseName = courseNameSplit.slice(1).join(' ');

    if (classes.has(courseCode)) {
      const classData = classes.get(courseCode)!;
      classData.springSemester = true;
    } else {
      const classData: ClassData = {
        courseCode,
        courseName,
        courseMeetingPattern: row._rawData[3],
        fallSemester: false,
        springSemester: true,
      };
      classes.set(courseCode, classData);
    }
  }

  // print out the classes
  for (const [courseCode, classData] of classes) {
    console.log(`${courseCode} ${classData.courseName}, ${classData.courseMeetingPattern}, ${classData.fallSemester}, ${classData.springSemester}`);
  }
}

loadClasses();
