import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Pagination } from ".";
import "../../styles/globals.scss";

export default {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Button",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Button",
// };
