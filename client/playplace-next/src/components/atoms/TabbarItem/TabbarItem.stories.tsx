import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TabbarItem from './TabbarItem';
import { BiHomeAlt2 } from 'react-icons/bi';

export default {
	title: 'components/atoms/TabbarItem',
	component: TabbarItem,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof TabbarItem>;

const Template: ComponentStory<typeof TabbarItem> = (args) => <TabbarItem {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	icon: <BiHomeAlt2 />,
};
