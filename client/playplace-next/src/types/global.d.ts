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
		AndAlert: {
			cofirmTest: (title: string, message: string) => void;
		};
		openChatbot: CustomEvent<>;
		takePicture: CustomEvent<>;
		confirmCallback: (result: boolean) => void;
	}
}
