import type { Meta, StoryObj } from '@storybook/react';

import PlayBarPlayControl from './PlayBarPlayControl';

const meta: Meta<typeof PlayBarPlayControl> = {
	component: PlayBarPlayControl,
};

export default meta;
type Story = StoryObj<typeof PlayBarPlayControl>;

export const Primary: Story = {
	name: 'PlayBarPlayControl',
	render: () => <PlayBarPlayControl />,
};
