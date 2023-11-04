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

export default clusterOptions;
