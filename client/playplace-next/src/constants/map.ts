import clusterImage1 from '@root/public/assets/images/markerClusterer/clusterer1.png';
import clusterImage2 from '@root/public/assets/images/markerClusterer/clusterer2.png';
import clusterImage3 from '@root/public/assets/images/markerClusterer/clusterer3.png';
import clusterImage4 from '@root/public/assets/images/markerClusterer/clusterer4.png';
import clusterImage5 from '@root/public/assets/images/markerClusterer/clusterer5.png';

const clusterStyles = [
	{
		url: clusterImage1.src,
		height: 40,
		width: 40,
		textColor: '#ffffff',
		textSize: 12,
	},
	{
		url: clusterImage2.src,
		height: 50,
		width: 50,
		textColor: '#ffffff',
		textSize: 14,
	},
	{
		url: clusterImage3.src,
		height: 60,
		width: 60,
		textColor: '#ffffff',
		textSize: 16,
	},
	{
		url: clusterImage4.src,
		height: 70,
		width: 70,
		textColor: '#ffffff',
		textSize: 18,
	},
	{
		url: clusterImage5.src,
		height: 80,
		width: 80,
		textColor: '#ffffff',
		textSize: 20,
	},
];

const clusterOptions = {
	imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
	gridSize: 60, // 클러스터 그리드 크기 설정 (픽셀)
	maxZoom: 15, // 최대 확대 레벨
	// 여기에 다른 클러스터링 옵션을 추가할 수 있습니다.
	styles: clusterStyles,
};

function deg2rad(deg: number) {
	return deg * (Math.PI / 180);
}

export function CalDistance(lat1: number, lat2: number, lng1: number, lng2: number) {
	const Earth = 6371;
	const dLat = deg2rad(lat2 - lat1);
	const dLon = deg2rad(lng2 - lng1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = Earth * c; // 두 지점 간의 거리 (단위: km)
	return distance;
}

export function landMarkIcon() {
	return `
	<svg width="57" height="69" viewBox="0 0 57 69" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M0.13283 28C0.13283 12.536 12.6689 0 28.1328 0C43.5968 0 56.1328 12.536 56.1328 28C57.1328 33.8333 52.9328 50.2 28.1329 69C3.33304 50.2001 -0.867085 33.8336 0.13283 28.0001V28Z" fill="url(#paint0_linear_1209_1100)"/>
		<defs>
			<linearGradient id="paint0_linear_1209_1100" x1="4.19213e-07" y1="34.4998" x2="56.2657" y2="34.4998" gradientUnits="userSpaceOnUse">
			<stop stop-color="#FEAC5E" />
			<stop offset="0.255208" stop-color="#C779D0" />
			<stop offset="1" stop-color="#4BC0C8" />
			</linearGradient>
		</defs>
	</svg>`;
}
export default clusterOptions;
