import React from 'react';
import EditList from '@root/public/assets/icons/EditList.svg';
import SmallIconButton from '@/components/atoms/player/SmallIconButton/SmallIconButton';
import Text from '@/components/atoms/Text/Text';
import SongGroupAreaHeaderContainer from './style';

interface ISongGroupAreaHeaderProps {
	groupAreaName: string;
	setEditMode?: () => void;
	isBasicGroup?: boolean;
}
function SongGroupAreaHeader(props: ISongGroupAreaHeaderProps) {
	const { groupAreaName, setEditMode = () => {}, isBasicGroup = false } = props;

	return (
		<SongGroupAreaHeaderContainer>
			<Text text={groupAreaName} fontSize={16} color="gradientMain" />
			{isBasicGroup ? (
				<></>
			) : (
				<SmallIconButton Icon={<EditList />} color="black300" onClick={() => setEditMode()} text="편집" />
			)}
		</SongGroupAreaHeaderContainer>
	);
}

export default SongGroupAreaHeader;
