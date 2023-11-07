export interface UserInfo {
	nickname: string;
	emojiIdx: number;
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
