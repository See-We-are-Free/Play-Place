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
