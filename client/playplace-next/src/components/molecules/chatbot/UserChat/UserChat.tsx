import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import UserChatWrapper from './style';

interface IUserChatProps {
	message?: string;
	imgSrc?: string;
}

function UserChat(props: IUserChatProps) {
	const { message = '', imgSrc = '' } = props;

	return (
		<UserChatWrapper>
			<div id="message">
				{message ? <p>{message}</p> : ''}
				{imgSrc ? <SongThumbnail src={imgSrc} $isFullSize /> : ''}
			</div>
		</UserChatWrapper>
	);
}

export default UserChat;
