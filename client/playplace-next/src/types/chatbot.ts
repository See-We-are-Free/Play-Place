import { Song } from './songs';

export interface ChatLogType {
	answerDate: string;
	imgUrl: string;
	comment: string;
	songs: Song[];
}

export type GetRecommendResultApiBody = FormData;

export type ChatbotModalType = boolean;

export interface CustomEventData {
	detail: { data: null };
}
