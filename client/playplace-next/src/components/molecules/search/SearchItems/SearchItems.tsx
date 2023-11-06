import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import { Song } from '@/types/songs';
import Play from '@root/public/assets/icons/Play.svg';
import Plus from '@root/public/assets/icons/Plus.svg';
import { AddSongLandmarkApiBody } from '@/types/api';
import { postDevelopLandmarkAddSong } from '@/utils/api/playmaps';
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

	const addLandmarkSong = async () => {
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
				const response = await postDevelopLandmarkAddSong(song);
				if (response.status === 200) {
					CustomToast(ToastStyles.success, `${title} 등록완료!`);
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					const response = error?.response;
					if (response?.status === 409) {
						// 처리로직
						CustomToast(ToastStyles.error, '이미 노래를 등록하셨습니다!');
					}
				}
			}

			if (moveLandmark) {
				moveLandmark();
			}
		}
	};
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
					<SearchItemsButton onClick={addLandmarkSong}>
						<Plus />
					</SearchItemsButton>
				)}
			</SearchItemsButtonContainer>
		</SearchItemsContainer>
	);
}

export default SearchItems;
