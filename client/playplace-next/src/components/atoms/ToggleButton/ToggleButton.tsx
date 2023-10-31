'use client';

import useToggle from '@/hooks/useToggle';
import { Button, ToggleButtonWrapper } from './style';

interface ToggleButtonProps {
	init?: boolean;
}

function ToggleButton(props: ToggleButtonProps) {
	const { init = false } = props;
	const [isActive, toggle] = useToggle(init);

	const handleToggle = () => {
		toggle();
	};

	return (
		<ToggleButtonWrapper>
			<Button onClick={handleToggle} $isActive={isActive} />
		</ToggleButtonWrapper>
	);
}

export default ToggleButton;
