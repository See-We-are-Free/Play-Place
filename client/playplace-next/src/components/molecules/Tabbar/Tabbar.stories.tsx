import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tabbar from './Tabbar';

export default {
	title: 'components/atoms/Tabbar',
	component: Tabbar,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Tabbar>;

const Template: ComponentStory<typeof Tabbar> = (args) => <Tabbar />;

export const Primary = Template.bind({});

Primary.args = {};
