import { ComponentMeta, ComponentStory } from "@storybook/react";
import ClassExplorer from "./ClassExplorer";

export default {
  title: "Class Explorer",
  component: ClassExplorer,
} as ComponentMeta<typeof ClassExplorer>;

const Template: ComponentStory<typeof ClassExplorer> = (args: any) => (
  <ClassExplorer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  classes: [
    { courseCode: "CS101", courseName: "Introduction to Computer Science" },
    { courseCode: "CS102", courseName: "Introduction to Computer Science" },
    { courseCode: "CS103", courseName: "Introduction to Computer Science" },
    { courseCode: "CS104", courseName: "Introduction to Computer Science" },
    { courseCode: "CS105", courseName: "Introduction to Computer Science" },
    { courseCode: "CS106", courseName: "Introduction to Computer Science" },
  ],
};
