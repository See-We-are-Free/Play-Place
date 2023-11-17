import React, { Dispatch, SetStateAction } from 'react';
import { UserInfo } from '@/types/auth';
import { ILocation } from '@/types/maps';

export interface UserInfoContextType {
	user: UserInfo;
	setUser: Dispatch<SetStateAction<UserInfo>>;
	isSongShare: boolean;
	setIsSongShare: Dispatch<SetStateAction<boolean>>;
	getLocation: () => ILocation;
}

const UserInfoContext = React.createContext<UserInfoContextType>({
	user: {
		nickname: '',
		profileImg: 0,
		push: false,
		shake: false,
	},
	setUser: () => {},
	isSongShare: false,
	setIsSongShare: () => {},
	getLocation: () => {
		return {
			lat: 35.205534,
			lng: 126.811585,
		};
	},
});

export default UserInfoContext;
