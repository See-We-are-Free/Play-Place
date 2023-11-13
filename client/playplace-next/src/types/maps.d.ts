export interface ILocation {
	lat: number;
	lng: number;
}

export interface LandMarkInfo {
	landmarkId: number;
	title: string;
	latitude: number;
	longitude: number;
	representativeImg: string | null;
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
