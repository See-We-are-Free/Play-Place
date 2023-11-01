import type { Meta, StoryObj } from '@storybook/react';

import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
	component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
	name: 'IconButton',
	render: () => <IconButton size="s" Icon={<div />} color="black300" onClick={() => {}} />,
};
