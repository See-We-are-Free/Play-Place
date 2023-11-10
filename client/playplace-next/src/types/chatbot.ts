import { Song } from './songs';

export interface ChatLogType {
	id: number;
	date: string;
	time: string;
	picture: string;
	resultText: string;
	resultSongs: Song[];
}

export type ChatbotModalType = boolean;

export interface CustomEventData {
	detail: { data: null };
}
