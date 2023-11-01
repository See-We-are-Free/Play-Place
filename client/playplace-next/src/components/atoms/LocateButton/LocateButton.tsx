import React, { ButtonHTMLAttributes } from 'react';
import Location from '@root/public/assets/icons/Location.svg';
import LocateButtonContainer from './style';

interface ILocateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onLocateClick: () => void;
}

function LocateButton(props: ILocateButtonProps) {
	const { onLocateClick } = props;
	return (
		<>
			<LocateButtonContainer type="button" onClick={() => onLocateClick()}>
				<Location />
			</LocateButtonContainer>
		</>
	);
}

export default LocateButton;
