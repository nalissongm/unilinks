import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LinkList } from ".";
import "../../styles/globals.scss";

export default {
  title: "Components/LinkList",
  component: LinkList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof LinkList>;

const Template: ComponentStory<typeof LinkList> = (args) => (
  <LinkList {...args} />
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
