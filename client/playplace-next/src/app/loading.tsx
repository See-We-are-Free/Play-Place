'use client';

import { SpinnerDotted } from 'spinners-react';
import styled from 'styled-components';

export const LoaderSpinner = styled.div`
	height: 100vh;
	position: relative;
	background-color: var(--bg-black-alpa-50);
	z-index: var(--zindex-loader-spinner);
	display: flex;
	justify-content: center;
	align-items: center;
`;

function Loading() {
	return (
		<LoaderSpinner>
			<SpinnerDotted size={50} thickness={140} speed={100} color="#C97BCA" />
		</LoaderSpinner>
	);
}

export default Loading;
