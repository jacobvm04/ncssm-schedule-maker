export interface ClassDataRaw {
  courseCode: string;
  courseName: string;
  courseMeetingPatterns: string[];
  fallSemester: boolean;
  springSemester: boolean;
}

export interface MeetingPattern {
  block: string;
  days: boolean[];
  labs: boolean[];
}

export interface ClassData extends Omit<ClassDataRaw, 'courseMeetingPatterns'> {
  meetingPatterns: MeetingPattern[];
}

interface ClassLoadRes {
  fallClasses: ClassData[];
  springClasses: ClassData[];
}

function parseMeetingPattern(pattern: string): MeetingPattern {
  const block = pattern.slice(0, 1);
  const days = new Array(5).fill(false);
  const labs = new Array(5).fill(false);

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];

    if (char === 'L') {
      labs[Number(pattern[i - 1]) - 1] = true;
    } else {
      days[Number(char) - 1] = true;
    }
  }

  return {
    block,
    days,
    labs,
  }
}

interface ClassLoadResRaw {
  fallClasses: ClassDataRaw[];
  springClasses: ClassDataRaw[];
}

interface ClassLoadRes {
  fallClasses: ClassData[];
  springClasses: ClassData[];
}

export async function loadClasses(): Promise<ClassLoadRes> {
  const classRes = await fetch('https://ncssm-schedule-maker.netlify.app/.netlify/functions/load-classes');
  const classData: ClassLoadResRaw = await classRes.json() as ClassLoadResRaw;

  const fallClasses = classData.fallClasses.map((classDataRaw) => {
    return {
      ...classDataRaw,
      meetingPatterns: classDataRaw.courseMeetingPatterns.map(parseMeetingPattern),
    }
  });

  const springClasses = classData.springClasses.map((classDataRaw) => {
    return {
      ...classDataRaw,
      meetingPatterns: classDataRaw.courseMeetingPatterns.map(parseMeetingPattern),
    }
  });
  
  return {
    fallClasses,
    springClasses,
  };
}
