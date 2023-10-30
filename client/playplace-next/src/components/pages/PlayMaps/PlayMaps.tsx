import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Circle, MarkerF } from '@react-google-maps/api';
import { LandMarkInfo, MapsCenter } from '@/types/maps';
import LocateButton from '@/components/atoms/LocateButton/LocateButton';
import getLandmarksApi from '@/utils/api/playmaps';
import { containerStyle, nightModeStyles } from './style';

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
		const response = await getLandmarksApi();
		if (response && response.status === 200) {
			setLandMarks(response.data.data);
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

		console.log(landMarks);
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
			<button type="button" onClick={test}>
				test
			</button>
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
								<MarkerF key={landMark.landMarkId} position={{ lat: landMark.latitude, lng: landMark.langitude }} />
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
