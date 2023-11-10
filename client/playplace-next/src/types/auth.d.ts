export interface UserInfo {
	nickname: string;
	profileImg: number;
	isPush: boolean;
	isShake: boolean;
}

export interface JoinApiParams {
	body: JoinInfoType;
}

export interface JoinInfoType {
	email: string;
	googleToken: string;
	nickname: string;
	profileImg: number;
}

export interface FixInfoApiParams {
	body: FixInfoType;
}

export interface FixInfoType {
	numImg: number;
	nickname: string;
}
