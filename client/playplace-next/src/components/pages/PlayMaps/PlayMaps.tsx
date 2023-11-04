import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Circle, MarkerF, MarkerClustererF } from '@react-google-maps/api';
import { LandMarkInfo, MapsCenter } from '@/types/maps';
import LocateButton from '@/components/atoms/LocateButton/LocateButton';
import { getDevelopLandmarksApi } from '@/utils/api/playmaps';
import LandMarkDefault from '@root/public/assets/images/LandMarkDefault.png';
import clusterOptions from '@/constants/map';
import { containerStyle, nightModeStyles } from './style';

function deg2rad(deg: number) {
	return deg * (Math.PI / 180);
}

function CalDistance(lat1: number, lat2: number, lng1: number, lng2: number) {
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

function landMarkIcon() {
	return `
	<svg width="57" height="69" viewBox="0 0 57 69" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M0.13283 28C0.13283 12.536 12.6689 0 28.1328 0C43.5968 0 56.1328 12.536 56.1328 28C57.1328 33.8333 52.9328 50.2 28.1329 69C3.33304 50.2001 -0.867085 33.8336 0.13283 28.0001V28Z" fill="url(#paint0_linear_1209_1100)"/>
		<defs>
			<linearGradient id="paint0_linear_1209_1100" x1="4.19213e-07" y1="34.4998" x2="56.2657" y2="34.4998" gradientUnits="userSpaceOnUse">
			<stop stop-color="#FEAC5E" />
			<stop offset="0.255208" stop-color="#C779D0" />
			<stop offset="1" stop-color="#4BC0C8" />
			</linearGradient>
			<Image src='${LandMarkDefault}' alt="" />
		</defs>
	</svg>`;
}

function PlayMaps() {
	// 구글 맵
	const [map, setMap] = useState<google.maps.Map | null>(null);
	// 현재 위치
	const [center, setCenter] = useState<MapsCenter>({
		lat: 0,
		lng: 0,
	});
	// 랜드마크 정보 저장 배열
	const [landMarks, setLandMarks] = useState<LandMarkInfo[]>([]);
	// 랜드마크 100m 정보에 따른 boolean값
	const [isDistance, setIsDistance] = useState<boolean>(false);

	// google api 키
	const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS || '';
	// map 로딩
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey,
	});

	const onUnmount = useCallback(function callback() {
		// 컴포넌트가 언마운트될때 호출 map 상태 변수를 null로 설정하여 초기화
		setMap(null);
	}, []);

	const onLoad = useCallback(async function callback(loadMap: google.maps.Map) {
		// const svgResponse = await fetch(Location);
		setMap(loadMap);
	}, []);

	// 현재 위치로 이동
	const locateUser = useCallback(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const newLocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
			setCenter(newLocation);
			if (map) {
				map.panTo(newLocation);
			}
		});
	}, [map]);

	const test = async () => {
		// const response = await getLandmarksApi();
		const response = await getDevelopLandmarksApi(); // 개발용
		if (response && response.status === 200) {
			setLandMarks(response.data.data);
		}
	};

	const test2 = (LandLat: number, LandLng: number) => {
		const distance = CalDistance(center.lat, LandLat, center.lng, LandLng);

		if (distance <= 0.1) {
			setIsDistance(false);
		} else {
			setIsDistance(true);
		}

		console.log(isDistance);
	};

	useEffect(() => {
		test();
		// 사용자의 위치 권한을 체크하고, 현재 위치를 가져와 center 상태를 업데이트합니다.
		navigator.geolocation.getCurrentPosition((position) => {
			setCenter({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
	}, []);

	// 현재위치 표시
	const circleRangeOptions = {
		strokeColor: '#FF7575',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF7575',
		fillOpacity: 0.35,
		radius: 100,
		center,
	};

	const markerCircleOptions = {
		strokeColor: '#FF7575',
		strokeOpacity: 1,
		strokeWeight: 2,
		fillColor: '#FF7575',
		fillOpacity: 1,
		radius: 5,
		center,
	};

	return (
		<>
			{landMarks && isLoaded && (
				<div style={{ position: 'relative', ...containerStyle }}>
					<LocateButton onLocateClick={locateUser} />
					<GoogleMap
						mapContainerStyle={{ width: '100%', height: '100%' }}
						center={center}
						zoom={18}
						onLoad={onLoad}
						onUnmount={onUnmount}
						options={{
							styles: nightModeStyles,
							mapTypeControl: false,
							fullscreenControl: false,
							rotateControl: false,
							streetViewControl: false,
						}}
					>
						<MarkerClustererF options={clusterOptions}>
							{(clusterer) => (
								<>
									{landMarks.map((landMark) => (
										<MarkerF
											key={landMark.landMarkId}
											position={{ lat: landMark.latitude, lng: landMark.longitude }}
											clusterer={clusterer}
											onClick={() => test2(landMark.latitude, landMark.longitude)}
											icon={{
												url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(landMarkIcon())}`,
												scaledSize: new google.maps.Size(50, 50),
												origin: new google.maps.Point(0, 0),
												anchor: new google.maps.Point(25, 50),
											}}
										/>
									))}
								</>
							)}
						</MarkerClustererF>

						<Circle center={center} options={circleRangeOptions} />
						<Circle center={center} options={markerCircleOptions} />
					</GoogleMap>
				</div>
			)}
		</>
	);
}

export default PlayMaps;
