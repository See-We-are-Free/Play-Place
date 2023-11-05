import React, { useRef } from 'react';
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
							<SearchItems searchItem={el} key={el.youtubeId} />
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
