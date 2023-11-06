import React from 'react';
// 편집버튼
// import EditList from '@root/public/assets/icons/EditList.svg';
// import SmallIconButton from '@/components/atoms/player/SmallIconButton/SmallIconButton';
import Text from '@/components/atoms/Text/Text';
import SongGroupAreaHeaderContainer from './style';

interface ISongGroupAreaHeaderProps {
	groupAreaName: string;
}
function SongGroupAreaHeader(props: ISongGroupAreaHeaderProps) {
	const { groupAreaName } = props;
	return (
		<SongGroupAreaHeaderContainer>
			<Text text={groupAreaName} fontSize={16} color="gradientMain" />
			{/* 편집 버튼 */}
			{/* <SmallIconButton
				Icon={<EditList />}
				color="black300"
				onClick={() => {
					alert('편집');
				}}
				text="편집"
			/> */}
		</SongGroupAreaHeaderContainer>
	);
}

export default SongGroupAreaHeader;
