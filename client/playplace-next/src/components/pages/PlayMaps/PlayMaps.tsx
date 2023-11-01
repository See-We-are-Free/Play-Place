import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Circle, MarkerF } from '@react-google-maps/api';
import { LandMarkInfo, MapsCenter } from '@/types/maps';
import LocateButton from '@/components/atoms/LocateButton/LocateButton';
import { getDevelopLandmarksApi } from '@/utils/api/playmaps';
import LandMarkDefault from '@root/public/assets/images/LandMarkDefault.png';
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

function landMarkIcon(landMarkImg: string | null): string {
	const imgsrc = landMarkImg || LandMarkDefault;

	return `
	<svg width="57" height="69" viewBox="0 0 57 69" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M0.13283 28C0.13283 12.536 12.6689 0 28.1328 0C43.5968 0 56.1328 12.536 56.1328 28C57.1328 33.8333 52.9328 50.2 28.1329 69C3.33304 50.2001 -0.867085 33.8336 0.13283 28.0001V28Z" fill="url(#paint0_linear_1209_1100)"/>
		<image href="${imgsrc}" x="0" y="0" height="69" width="57"/>
		<defs>
			<linearGradient id="paint0_linear_1209_1100" x1="4.19213e-07" y1="34.4998" x2="56.2657" y2="34.4998" gradientUnits="userSpaceOnUse">
			<stop stop-color="#FEAC5E" />
			<stop offset="0.255208" stop-color="#C779D0" />
			<stop offset="1" stop-color="#4BC0C8" />
			</linearGradient>
		</defs>
	</svg>`;
}

function PlayMaps() {
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [center, setCenter] = useState<MapsCenter>({
		lat: 0,
		lng: 0,
	});
	const [landMarks, setLandMarks] = useState<LandMarkInfo[]>([]);
	// google api 키
	const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS || '';

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
			alert('100m이내');
		} else {
			alert('100m초과');
		}
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
						{Array.isArray(landMarks) &&
							landMarks.map((landMark) => (
								<MarkerF
									key={landMark.landMarkId}
									position={{ lat: landMark.latitude, lng: landMark.langitude }}
									onClick={() => test2(landMark.latitude, landMark.langitude)}
									icon={{
										url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
											landMarkIcon(landMark.representativeImg),
										)}`,
									}}
								/>
							))}
						<Circle center={center} options={circleRangeOptions} />
						<Circle center={center} options={markerCircleOptions} />
					</GoogleMap>
				</div>
			)}
		</>
	);
}

export default PlayMaps;
