import styled from 'styled-components';

const SongMarkerListContainer = styled.div`
	position: absolute;
	padding: 40px 10px 0;
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(6, 1fr);
	grid-template-areas:
		'20 21 19 22 18'
		'10 4 3 7 11'
		'8 5 . 6 14'
		'13 0 . 2 17'
		'15 8 12 9 16'
		'24 25 26 27 23';

	& > div {
		margin: 50px 20px 5px;
	}

	.item {
		position: relative;
	}
`;

export default SongMarkerListContainer;
