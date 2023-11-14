import React, { useEffect, useState } from 'react';
import PlayGroup from '@root/public/assets/icons/PlayGroup.svg';
import Down from '@root/public/assets/icons/Down.svg';
import TrashBox from '@root/public/assets/icons/TrashBox.svg';
import Text from '@/components/atoms/Text/Text';
import IconButton from '@/components/atoms/IconButton/IconButton';
import GroupSongList from '@/components/organisms/GroupSongList/GroupSongList';
import { BasicSong, LandmarkSong } from '@/types/songs';
import useToggle from '@/hooks/useToggle';
import { deleteGroupFromPlayListApi } from '@/utils/api/playlists';
import useFetchPlaylist from '@/hooks/player/useFetchPlaylist';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { ToastStyles } from '@/types/styles.d';
import { useRecoilState } from 'recoil';
import { nowPlaySongState, playQueueState } from '@/recoil/play';
import SongGroupContainer from './style';

interface ISongGroupProps {
	groupName: string;
	userLandmarkGroupId?: number;
	songs: BasicSong[] | LandmarkSong[];
	isBasicGroup?: boolean;
	editMode?: boolean;
	toggleEditMode?: () => void;
}

function SongGroup(props: ISongGroupProps) {
	const {
		groupName,
		userLandmarkGroupId = -1,
		songs,
		isBasicGroup = false,
		editMode = false,
		toggleEditMode = () => {},
	} = props;
	const [, setNowPlaySong] = useRecoilState(nowPlaySongState);
	const [playQueue] = useRecoilState(playQueueState);
	const { fetchData } = useFetchPlaylist();
	const [toggle, setToggle] = useToggle(false);
	const [confirm, setConfirm] = useState<boolean>(false);

	const confirmRemove = () => {
		if (typeof window !== 'undefined' && window.AndAlert) {
			window.AndAlert.cofirmTest('PlayMap', `${groupName} 그룹 재생목록을 삭제하시겠습니까?`);
			setConfirm(true);
		}
	};

	const removeSongGroup = async () => {
		// 승현TODO : '${groupName}' 그룹 재생목록을 삭제하시겠습니까?

		try {
			const response = await deleteGroupFromPlayListApi(userLandmarkGroupId);
			setNowPlaySong(playQueue[0]);

			if (response.status === 200) {
				fetchData();
				CustomToast(ToastStyles.success, `'${groupName}' 그룹을 삭제했습니다.`);
			}
		} catch (error) {
			CustomToast(ToastStyles.error, '그룹 삭제에 실패했습니다 \n잠시 후 다시 시도하세요');
			toggleEditMode();
			console.error(error);
		}
	};

	useEffect(() => {
		if (typeof window !== undefined && confirm === true) {
			window.confirmCallback = function (result: boolean) {
				if (result === false) {
					CustomToast(ToastStyles.success, `랜드마크 그룹 삭제 취소`);
				} else {
					removeSongGroup();
				}
			};
		}

		setConfirm(false);
	}, [confirm]);

	useEffect(() => {
		const foldAll = () => {
			if (!toggle) setToggle();
		};
		window.addEventListener('foldAll', foldAll);

		return () => window.removeEventListener('foldAll', foldAll);
	}, []);

	return (
		<SongGroupContainer $isFold={toggle}>
			<div id="group-header" role="presentation" onClick={() => setToggle()}>
				<div id="group-info">
					<Text text={groupName} fontSize={16} />
					<Text text={`${songs.length} / ${isBasicGroup ? 999 : 99}`} color="gray" />
				</div>
				<div id="group-control">
					{/* <IconButton Icon={<PlayGroup />} color="black300" onClick={() => {}} size="s" /> */}
					<IconButton id="fold-btn" Icon={<Down />} color="black300" onClick={setToggle} size="s" />
					{editMode ? <IconButton Icon={<TrashBox />} color="danger" onClick={confirmRemove} size="s" /> : <></>}
				</div>
			</div>
			<div id="group-songs">
				<GroupSongList songs={songs || []} isBasicGroup />
			</div>
		</SongGroupContainer>
	);
}

export default SongGroup;
