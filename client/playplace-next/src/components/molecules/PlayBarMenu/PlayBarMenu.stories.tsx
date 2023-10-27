import type { Meta, StoryObj } from '@storybook/react';

import PlayBarMenu from './PlayBarMenu';

const meta: Meta<typeof PlayBarMenu> = {
	component: PlayBarMenu,
};

export default meta;
type Story = StoryObj<typeof PlayBarMenu>;

export const Primary: Story = {
	name: 'PlayBarMenu',
	render: () => <PlayBarMenu />,
};
