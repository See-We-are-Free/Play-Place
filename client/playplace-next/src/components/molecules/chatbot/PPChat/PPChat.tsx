import React from 'react';
import { Song } from '@/types/songs';
import PPChatContainer from './style';

interface IPPChatProps {
	message: string;
	recommendedSongs?: Song[];
}

function PPChat(props: IPPChatProps) {
	const { message, recommendedSongs = [] } = props;
	return (
		<PPChatContainer>
			<p>{message}</p>
			{recommendedSongs.length ? recommendedSongs.map((el) => <div key={el.songId}>{el.title}</div>) : <div />}
		</PPChatContainer>
	);
}

export default PPChat;
