import { ComponentStory, ComponentMeta } from "@storybook/react";
import { createRef } from "react";
import { Input } from ".";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {
  id: "text",
  label: "Test",
  type: "text",
  ref: createRef(),
  placeholder: "Digite alguma coisa",
};
