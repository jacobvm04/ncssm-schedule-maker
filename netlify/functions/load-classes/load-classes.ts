import { Handler } from '@netlify/functions'
import { GoogleSpreadsheet } from 'google-spreadsheet';

interface ClassData {
  courseCode: string;
  courseName: string;
  courseMeetingPatterns: string[];
}

async function loadClasses(): Promise<{ fallClasses: ClassData[]; springClasses: ClassData[]; }> {
  const classMeetingSheet = new GoogleSpreadsheet('1_LO-BQGbiR0LHUL--EyPf_dkVFZezms-H_j40p04XuU');
  classMeetingSheet.useApiKey('AIzaSyA1weQD4Higa2L9de352YNJw-Sl67O1XEk');

  await classMeetingSheet.loadInfo();
  const fallClassesSheet = classMeetingSheet.sheetsByIndex[0];
  const springClassesSheet = classMeetingSheet.sheetsByIndex[1];

  const fallClassesRows = await fallClassesSheet.getRows({ offset: 1, limit: 300 });
  const springClassesRows = await springClassesSheet.getRows({ offset: 1 , limit: 300 });

  const fallClasses: Map<string, ClassData> = new Map();
  const springClasses: Map<string, ClassData> = new Map();

  for (const row of fallClassesRows) {
    const courseNameSplit = row._rawData[2].split(' ');
    const courseCode = courseNameSplit[0];
    const courseName = courseNameSplit.slice(1).join(' ');

    if (fallClasses.has(courseCode)) {
      const classData = fallClasses.get(courseCode)!;
      classData.courseMeetingPatterns.push(row._rawData[3]);
    } else {
      const classData: ClassData = {
        courseCode,
        courseName,
        courseMeetingPatterns: [row._rawData[3]]
      };
      fallClasses.set(courseCode, classData);
    }
  }

  for (const row of springClassesRows) {
    const courseNameSplit = row._rawData[2].split(' ');
    const courseCode = courseNameSplit[0];
    const courseName = courseNameSplit.slice(1).join(' ');

    if (springClasses.has(courseCode)) {
      const classData = springClasses.get(courseCode)!;
      classData.courseMeetingPatterns.push(row._rawData[3]);
    } else {
      const classData: ClassData = {
        courseCode,
        courseName,
        courseMeetingPatterns: [row._rawData[3]],
      };
      springClasses.set(courseCode, classData);
    }
  }

  return {
    fallClasses: Array.from(fallClasses.values()),
    springClasses: Array.from(springClasses.values()),
  };
}

export const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
    body: JSON.stringify(await loadClasses()),
  }
}
