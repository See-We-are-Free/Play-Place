import type { Meta, StoryObj } from '@storybook/react';

import SongInfo from './SongInfo';

const meta: Meta<typeof SongInfo> = {
	component: SongInfo,
};

export default meta;
type Story = StoryObj<typeof SongInfo>;

export const Primary: Story = {
	name: 'SongInfo',
	render: () => <SongInfo />,
};
