interface ClassProp {
  courseCode: string;
  courseName: string;
}

interface ClassExplorerProps {
  classes: ClassProp[];
}

export default function ClassExplorer({ classes }: ClassExplorerProps) {
  const classesComponents = classes.map((classProp) => (
    <div className="flex flex-col p-4 shadow-sm bg-white rounded-lg">
      <div className="text-lg">
        <span className="font-bold">{classProp.courseCode}</span>{" "}
        {classProp.courseName}
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col  p-4 max-w-md rounded-lg shadow-lg bg-white">
      <div className="text-2xl font-bold">Class Explorer</div>

      <input
        type="text"
        className="w-full px-4 py-2 mr-4 mt-4 bg-gray-100 rounded-full border-gray-300 border-2 focus:outline-none focus:border-gray-500"
        placeholder="Search for a class"
      />

      <div className="flex flex-col space-y-4 overflow-auto h-100  w-full bg-gray-100 rounded-lg px-4 py-6 mt-4">
        {classesComponents}
      </div>
    </div>
  );
}
