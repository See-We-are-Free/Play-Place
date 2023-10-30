import type { Meta, StoryObj } from '@storybook/react';

import PlayBar from './PlayBar';

const meta: Meta<typeof PlayBar> = {
	component: PlayBar,
};

export default meta;
type Story = StoryObj<typeof PlayBar>;

export const Primary: Story = {
	name: 'PlayBar',
	render: () => <PlayBar />,
};
