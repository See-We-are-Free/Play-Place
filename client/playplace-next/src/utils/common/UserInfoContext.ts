import React, { Dispatch, SetStateAction } from 'react';
import { UserInfo } from '@/types/auth';

export interface UserInfoContextType {
	user: UserInfo;
	setUser: Dispatch<SetStateAction<UserInfo>>;
	isSongShare: boolean;
	setIsSongShare: Dispatch<SetStateAction<boolean>>;
}

const UserInfoContext = React.createContext<UserInfoContextType>({
	user: {
		nickname: '',
		profileImg: 0,
		isPush: false,
		isShake: false,
	},
	setUser: () => {},
	isSongShare: false,
	setIsSongShare: () => {},
});

export default UserInfoContext;
