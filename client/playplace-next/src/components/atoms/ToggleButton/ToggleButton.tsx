'use client';

import { Button, ToggleButtonWrapper } from './style';

interface ToggleButtonProps {
	isActive: boolean | null;
	handleActive: () => void;
}

function ToggleButton(props: ToggleButtonProps) {
	const { isActive, handleActive } = props;

	return (
		<ToggleButtonWrapper>
			<Button onClick={handleActive} $isActive={isActive} />
		</ToggleButtonWrapper>
	);
}

export default ToggleButton;
