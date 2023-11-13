import React, { useEffect, useState } from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import { Song } from '@/types/songs';
import Play from '@root/public/assets/icons/Play.svg';
import Plus from '@root/public/assets/icons/Plus.svg';
import { AddSongLandmarkApiBody } from '@/types/api';
import { postLandmarkAddSong } from '@/utils/api/landmarks';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { ToastStyles } from '@/types/styles.d';
import { AxiosError } from 'axios';
import SearchItemsContainer, {
	SearchItemsButton,
	SearchItemsButtonContainer,
	SearchItemsContent,
	SearchItemsSongInfo,
} from './style';

interface ISearchItemsProps {
	searchItem: Song;
	handleButtonClick: () => void;
	moveLandmark?: () => void;
	landmarkId?: number;
}

function SearchItems(props: ISearchItemsProps) {
	const { searchItem, handleButtonClick, landmarkId, moveLandmark } = props;
	const { artist, title, albumImg, youtubeId } = searchItem;

	const [confirm, setConfirm] = useState<boolean>(false);

	const confirmLandmark = () => {
		if (typeof window !== 'undefined' && window.AndAlert) {
			window.AndAlert.cofirmTest('재생목록', `${title}을 랜드마크에 등록하시겠어요?`);
			setConfirm(true);
		}
	};

	const addLandmarkSong = async () => {
		// 승현TODO : '${groupName}''${title}'을 랜드마크에 등록하시겠어요?`

		if (landmarkId) {
			const song: AddSongLandmarkApiBody = {
				artist,
				title,
				albumImg,
				youtubeId,
				playTime: -1,
				landmarkId,
			};

			try {
				const response = await postLandmarkAddSong(song);
				if (response.status === 200) {
					CustomToast(ToastStyles.success, `랜드마크에 1곡이 등록되었습니다.`);
					const customEvent = new CustomEvent('addLandmarkSong', {
						detail: {
							landmarkId,
						},
					});
					window.dispatchEvent(customEvent);
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					const response = error?.response;
					if (response?.status === 409) {
						CustomToast(ToastStyles.noTabbarError, '해당 랜드마크에는 이미 음악을 등록하셨습니다.');
					}
				}
			}

			if (moveLandmark) {
				moveLandmark();
			}
		}
	};

	useEffect(() => {
		if (typeof window !== undefined && confirm === true) {
			window.confirmCallback = function (result: boolean) {
				console.log(result); // true 또는 false
				if (result === false) {
					CustomToast(ToastStyles.success, `랜드마크 음악 추가 취소`);
				} else {
					addLandmarkSong();
				}
			};
		}

		setConfirm(false);
	}, [confirm]);

	return (
		<SearchItemsContainer>
			<SearchItemsContent>
				<SongThumbnail $width={50} $height={50} src={albumImg} />
				<SearchItemsSongInfo>
					<Text text={title} color="default" fontSize={16} />
					<Text text={artist} color="gray" fontSize={12} />
				</SearchItemsSongInfo>
			</SearchItemsContent>
			<SearchItemsButtonContainer>
				<SearchItemsButton onClick={handleButtonClick}>
					<Play />
				</SearchItemsButton>
				{landmarkId && (
					<SearchItemsButton onClick={confirmLandmark}>
						<Plus />
					</SearchItemsButton>
				)}
			</SearchItemsButtonContainer>
		</SearchItemsContainer>
	);
}

export default SearchItems;
