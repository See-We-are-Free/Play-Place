import styled from 'styled-components';

const NowPlayProgressContainer = styled.div`
	position: relative;

	#time {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		span {
			font-size: 14px;
		}
	}

	input[type='range'] {
		accent-color: var(--white-200);
		background-color: var(--black-400);
		border-radius: var(--radius-l);
		width: 100%;
		height: 10px;

		&::-webkit-slider-thumb {
		}
	}
`;

export default NowPlayProgressContainer;
