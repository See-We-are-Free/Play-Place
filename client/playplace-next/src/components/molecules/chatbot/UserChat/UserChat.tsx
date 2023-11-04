import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import UserChatWrapper from './style';

interface IUserChatProps {
	message: string;
	imgSrc?: string;
}

function UserChat(props: IUserChatProps) {
	const { message, imgSrc = '' } = props;

	return (
		<UserChatWrapper>
			{message}
			{imgSrc ? <SongThumbnail src={imgSrc} /> : ''}
		</UserChatWrapper>
	);
}

export default UserChat;
