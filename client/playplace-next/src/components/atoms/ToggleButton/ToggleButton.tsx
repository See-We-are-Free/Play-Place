'use client';

import { SetterOrUpdater } from 'recoil';
import { Button, ToggleButtonWrapper } from './style';

interface ToggleButtonProps {
	isActive: boolean;
	setIsActive: SetterOrUpdater<boolean>;
}

function ToggleButton(props: ToggleButtonProps) {
	const { isActive, setIsActive } = props;

	const handleToggle = () => {
		setIsActive((prev) => !prev);
	};

	return (
		<ToggleButtonWrapper>
			<Button onClick={handleToggle} $isActive={isActive} />
		</ToggleButtonWrapper>
	);
}

export default ToggleButton;
