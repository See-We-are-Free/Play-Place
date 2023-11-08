import React from 'react';
import { Song } from '@/types/songs';
import Logo from '@root/public/assets/icons/Logo.svg';
import PPChatContainer from './style';
import SearchItems from '../../search/SearchItems/SearchItems';

interface IPPChatProps {
	message: string;
	recommendedSongs?: Song[];
	ref?: React.MutableRefObject<HTMLDivElement | null>;
}

function PPChat(props: IPPChatProps) {
	const { ref = null, message, recommendedSongs = [] } = props;

	const handleButtonClick = () => {
		// 노래 임시 재생 로직 추가
	};

	return (
		<PPChatContainer ref={ref}>
			<div id="logo">
				<Logo />
			</div>
			<div id="message">
				{message ? <p>{message}</p> : ''}
				{recommendedSongs.length ? (
					<div id="recommended-songs">
						{recommendedSongs.map((el) => (
							<SearchItems searchItem={el} key={el.youtubeId} handleButtonClick={handleButtonClick} />
						))}
					</div>
				) : (
					<></>
				)}
			</div>
		</PPChatContainer>
	);
}

export default PPChat;
