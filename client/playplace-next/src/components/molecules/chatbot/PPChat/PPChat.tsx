import React from 'react';
import { Song } from '@/types/songs';
import Logo from '@root/public/assets/icons/Logo.svg';
import LoadingLottie from '@/components/atoms/LoadingLottie/LoadingLottie';
import usePlayer from '@/hooks/player/usePlayer';
import PPChatContainer from './style';
import SearchItems from '../../search/SearchItems/SearchItems';

interface IPPChatProps {
	message?: string;
	isloading?: boolean;
	recommendedSongs?: Song[];
	ref?: React.MutableRefObject<HTMLDivElement | null>;
}

function PPChat(props: IPPChatProps) {
	const { ref = null, message = '', recommendedSongs = [], isloading = true } = props;
	const { playNewSong } = usePlayer();

	return (
		<PPChatContainer ref={ref}>
			<div id="logo">
				<Logo />
			</div>
			{isloading ? (
				<div id="loading">
					<LoadingLottie />
				</div>
			) : (
				<div id="message">
					{message ? <p>{message}</p> : ''}
					{recommendedSongs.length ? (
						<div id="recommended-songs">
							{recommendedSongs.map((el) => (
								<SearchItems searchItem={el} key={el.youtubeId} handleButtonClick={() => playNewSong(el)} />
							))}
						</div>
					) : (
						<></>
					)}
				</div>
			)}
		</PPChatContainer>
	);
}

export default PPChat;
