export interface CustomEventData {
	detail: { data: null };
}

declare global {
	interface Window {
		AndMap: {
			getLastKnownLocation: () => string;
			successLocate: () => void;
		};
		AndCamera: {
			successCamera: () => void;
			openCamera: () => void;
			sendData: () => string;
		};
		openChatbot: CustomEvent<>;
		getImageData: CustomEvent<>;
	}
}
