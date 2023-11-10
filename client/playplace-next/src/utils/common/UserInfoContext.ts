import React, { Dispatch, SetStateAction } from 'react';
import { UserInfo } from '@/types/auth';

export interface UserInfoContextType {
	user: UserInfo | null;
	setUser: Dispatch<SetStateAction<UserInfo | null>>;
	isSongShare: boolean | null;
	setIsSongShare: Dispatch<SetStateAction<boolean | null>>;
}

const UserInfoContext = React.createContext<UserInfoContextType>({
	user: null,
	setUser: () => {},
	isSongShare: null,
	setIsSongShare: () => {},
});

export default UserInfoContext;
