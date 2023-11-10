'use client';

import ToggleButton from '@/components/atoms/ToggleButton/ToggleButton';
import { Text } from '@/components/atoms/headerItem/HeaderRightItem/style';
import Header from '@/components/molecules/Header/Header';
import RadarShareOff from '@/components/organisms/radar/RadarShareOff/RadarShareOff';
import RadarShareOn from '@/components/organisms/radar/RadarShareOn/RadarShareOn';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import songShareState from '@/recoil/radar';
import { HeaderStyles } from '@/types/styles.d';
import { getSongShareInfoApi, setSongShareStateApi } from '@/utils/api/radar';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

function Radar() {
	const [isSongShare, setIsSongShare] = useRecoilState(songShareState);

	const handleActive = useCallback(async () => {
		await setSongShareStateApi();
		setIsSongShare((prev) => !prev);
	}, [setIsSongShare]);

	const header = (
		<Header $headerType={HeaderStyles.radar}>
			<Text>공유하기</Text>
			<ToggleButton isActive={isSongShare} handleActive={handleActive} />
		</Header>
	);

	const getSongShare = useCallback(async () => {
		try {
			const response = await getSongShareInfoApi();
			if (response.status === 200) {
				setIsSongShare(response.data.data);
			}
		} catch (error) {
			console.error(error);
		}
	}, [setIsSongShare]);

	useEffect(() => {
		getSongShare();
	}, [getSongShare]);

	return (
		<LayoutWithHeader header={header}>
			<ContentLayout $background="--black-600" $margin="-10px 0 0" $height="calc(100vh - 190px)">
				{isSongShare ? <RadarShareOn /> : <RadarShareOff />}
			</ContentLayout>
		</LayoutWithHeader>
	);
}

export default Radar;
