import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Circle, MarkerF, MarkerClustererF } from '@react-google-maps/api';
import { LandMarkInfo, MapsCenter } from '@/types/maps';
import LocateButton from '@/components/atoms/LocateButton/LocateButton';
import getLandmarksApi, { getLandmarkDetailApi } from '@/utils/api/landmarks';
import clusterOptions, { CalDistance } from '@/constants/map';
import CustomBottomSheet from '@/components/molecules/CustomBottomSheet/CustomBottomSheet';
import { Song } from '@/types/songs';
import LandMarkDefault from '@root/public/assets/images/LandMarkDefault.png';
import MapBottomSheet from '@/components/organisms/MapBottomSheet/MapBottomSheet';
import { SearchHeader, containerStyle, nightModeStyles } from './style';

function PlayMaps() {
	// 구글 맵
	const [map, setMap] = useState<google.maps.Map | null>(null);
	// 현재 위치
	const [center, setCenter] = useState<MapsCenter>({
		lat: 0,
		lng: 0,
	});

	// 바텀시트를 여는 state
	const [open, setOpen] = useState<boolean>(false);
	// 랜드마크 정보 저장 배열
	const [landMarks, setLandMarks] = useState<LandMarkInfo[]>([]);
	// 랜드마크 100m 정보에 따른 boolean값
	const [isDistance, setIsDistance] = useState<boolean>(false);
	// 랜드마크 상세정보

	// 랜드마크를 눌렀을 때
	const [choose, setChoose] = useState<boolean>(false);

	const [detailLandmark, setDetailLandmark] = useState<LandMarkInfo>({
		landmarkId: 0,
		latitude: 0,
		longitude: 0,
		title: '',
		representativeImg: '',
	});
	// 랜드만크안에 들어있는 곡 정보
	const [landMarkList, setLandMarkList] = useState<Song[]>([]);
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

	const [getLocateFromAndroid, setGetLocateFromAndroid] = useState<string>('');

	// 안드로이드에서 현재 위치를 받음
	const setLocateFromAndroid = (data: MapsCenter) => {
		setCenter(data);
	};

	const callAndroidLocation = () => {
		console.log('callAndroidLocation');
		if (window.AndMap) {
			setGetLocateFromAndroid(window.AndMap.getLastKnownLocation());
			// const getLocateFromAndroid = window.AndMap.getLastKnownLocation();
		}
	};

	useEffect(() => {
		const locationInterval = setInterval(callAndroidLocation, 500);

		if (getLocateFromAndroid !== '위치를 찾을 수 없습니다') {
			const presentLocate: string[] = getLocateFromAndroid.split(',');
			const preCenter = {
				lat: parseFloat(presentLocate[0]),
				lng: parseFloat(presentLocate[1]),
			};
			setLocateFromAndroid(preCenter);
		}
		return () => {
			clearInterval(locationInterval);
		};
	}, [getLocateFromAndroid]);

	// useEffect(() => {
	// 	function updatePosition(position: GeolocationPosition) {
	// 		const { latitude } = position.coords;
	// 		const { longitude } = position.coords;

	// 		// 위치 업데이트
	// 		setCenter({ lat: latitude, lng: longitude });
	// 	}

	// 	// 위치 추적 시작
	// 	const watchId = navigator.geolocation.watchPosition(
	// 		updatePosition,
	// 		(error) => {
	// 			console.error(`오류: ${error.message}`);
	// 		},
	// 		{
	// 			enableHighAccuracy: true,
	// 			maximumAge: 10000,
	// 			timeout: 5000,
	// 		},
	// 	);

	// 	// 컴포넌트 언마운트 시 위치 추적 중지
	// 	return () => {
	// 		navigator.geolocation.clearWatch(watchId);
	// 	};
	// }, [center]);

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
				map.setZoom(18);
			}
		});
	}, [map]);

	const getLandmarks = async () => {
		const response = await getLandmarksApi();
		if (response && response.status === 200) {
			setLandMarks(response.data.data);
		}
	};

	const detailLandMarkTest = async (landmarkId: number) => {
		const response = await getLandmarkDetailApi(landmarkId);
		console.log(response);
		if (response && response.status === 200) {
			setLandMarkList(response.data.data);
		}
		setOpen(true);
	};

	const checkLandmarkInfo = (detail: LandMarkInfo) => {
		const distance = CalDistance(center.lat, detail.latitude, center.lng, detail.longitude);

		if (distance <= 0.1) {
			setIsDistance(true);
		} else {
			setIsDistance(false);
		}

		setDetailLandmark(detail);
		setChoose(true);
	};

	// 수정해야함.
	useEffect(() => {
		// console.log(detailLandmark);
		if (choose) {
			detailLandMarkTest(detailLandmark.landmarkId);
			setChoose(false);
		}
	}, [choose, detailLandmark.landmarkId]);

	useEffect(() => {
		getLandmarks();
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
											key={landMark.landmarkId}
											position={{ lat: landMark.latitude, lng: landMark.longitude }}
											clusterer={clusterer}
											onClick={() => {
												checkLandmarkInfo(landMark);
											}}
											icon={{
												// url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(landMarkIcon())}`,
												url:
													landMark.representativeImg === 'test.png' || landMark.representativeImg === null
														? LandMarkDefault.src
														: landMark.representativeImg,
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
					{open && (
						<CustomBottomSheet open={open} setOpen={setOpen}>
							<SearchHeader>
								<MapBottomSheet
									isDistance={isDistance}
									landMarkTitle={`${detailLandmark.title}`}
									landMarkList={landMarkList}
									landmarkId={detailLandmark.landmarkId}
								/>
							</SearchHeader>
						</CustomBottomSheet>
					)}
				</div>
			)}
		</>
	);
}

export default PlayMaps;
