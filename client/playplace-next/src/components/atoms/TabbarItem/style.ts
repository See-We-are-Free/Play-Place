import styled from 'styled-components';
import css from 'styled-jsx/css';

interface TabbarItemWrapperProps {
	$isActive: boolean;
}

export const TabbarItemWrapper = styled.div<TabbarItemWrapperProps>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	span {
		font-size: 10px;
		color: ${({ $isActive }) => ($isActive ? 'red' : 'gray')};
	}

	svg {
		width: 24px;
		height: 24px;
		fill: ${({ $isActive }) => ($isActive ? 'red' : 'gray')};
	}
`;
