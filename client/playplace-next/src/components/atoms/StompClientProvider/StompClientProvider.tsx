import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { CurrentLocation, IAroundPeople } from '@/types/radar';
import StompClientContext, { StompClientContextType } from '@/utils/common/StompClientContext';
import UserInfoContext from '@/utils/common/UserInfoContext';

function StompClientProvider({ children }: { children: ReactNode }) {
	const { isSongShare } = useContext(UserInfoContext);
	const client = useRef<StompJs.Client | null>(null);
	const [data, setData] = useState<IAroundPeople[] | null>(null);
	const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	const subscribe = useCallback(() => {
		if (!client.current?.active) {
			console.log('연결 없음, 구독을 시도할 수 없음');
			return;
		}

		try {
			console.log('구독 ========== /user/queue/location');
			client.current.subscribe('/user/queue/location', ({ body }) => {
				const parsedBody: IAroundPeople[] = JSON.parse(body);
				console.log('Before parsedBody', data);
				console.log('After parsedBody', parsedBody);
				if (!data || parsedBody.some((pb) => !data.some((d) => d.userId === pb.userId))) {
					setData(parsedBody);
				} else {
					console.log('변경된 값이 없습니다.');
				}
			});
		} catch (err) {
			console.error(err);
		}
	}, [data]);

	const publish = useCallback(async (latitude: number, longitude: number) => {
		if (!client.current?.active) {
			console.log('연결 없음, 발행을 시도할 수 없음');
			return;
		}

		try {
			console.log('발행 ========== /pub/location');
			console.log(`위치 : { "latitude": ${latitude}, "longitude": ${longitude} }`);
			client.current.publish({
				destination: '/pub/location',
				body: `{ "latitude": ${latitude}, "longitude": ${longitude} }`,
			});
		} catch (error) {
			console.error('발행 중 오류 발생:', error);
			console.log('client', client);
		}
	}, []);

	const connect = useCallback(() => {
		console.log('연결 시작');
		let baseUrl = process.env.NEXT_PUBLIC_DEVELOP_WS_BASE_URL || ''; // 개발용
		if (window && window.AndMap) {
			baseUrl = process.env.NEXT_PUBLIC_WS_BASE_URL || '';
		}
		client.current = new StompJs.Client({
			webSocketFactory: () => new SockJS(baseUrl),
			connectHeaders: {
				Authorization: localStorage.getItem('accessToken') || '',
			},
			// debug(str) {
			// 	console.log(str);
			// },
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			onConnect: () => {
				console.log('연결됨');
				subscribe();
			},
			onStompError: (frame) => {
				console.error(frame);
			},
		});

		client.current.activate();
	}, [subscribe]);

	const disconnect = useCallback(() => {
		console.log('연결 해제');
		client.current?.deactivate();
	}, []);

	const getMarkerList = useCallback(async () => {
		if (currentLocation) {
			publish(currentLocation.latitude, currentLocation.longitude);
		}
	}, [currentLocation, publish]);

	const getCurrentLocation = useCallback(() => {
		if (window.AndMap) {
			const location: { lat: number; lng: number } = JSON.parse(window.AndMap.getLastKnownLocation());
			console.log(location);

			setCurrentLocation({
				latitude: location.lat,
				longitude: location.lng,
			});
		} else {
			navigator.geolocation.getCurrentPosition((position) => {
				const location = {
					longitude: position.coords.longitude,
					latitude: position.coords.latitude,
				};
				console.log('현재 위치', location);
				setCurrentLocation(location);
			}); // 개발용
		}
	}, []);

	useEffect(() => {
		if (!currentLocation) {
			getCurrentLocation();
		}
	}, [currentLocation, getCurrentLocation]);

	useEffect(() => {
		if (!isSongShare) {
			console.log('공유 OFF');
			if (intervalId) {
				console.log('인터벌 클리어');
				clearInterval(intervalId);
				setIntervalId(null);
			}
			return;
		}

		if (currentLocation) {
			if (!intervalId) {
				console.log('getMarkerList!');
				getMarkerList();
				setIntervalId(
					setInterval(() => {
						console.log('인터벌 getMarkerList!');
						getMarkerList();
					}, 30000),
				);
			}
		}

		// eslint-disable-next-line consistent-return
		return () => {
			if (intervalId) {
				console.log('리턴 인터벌');
				clearInterval(intervalId);
				setIntervalId(null);
			}
		};
	}, [currentLocation, getMarkerList, intervalId, isSongShare]);

	useEffect(() => {
		if (isSongShare) {
			connect();
		} else {
			disconnect();
		}

		// eslint-disable-next-line consistent-return
		return () => {
			disconnect();
		};
	}, [connect, disconnect, isSongShare]);

	const value: StompClientContextType = useMemo(() => {
		return {
			client: client.current,
			publish,
			data,
			connect,
			disconnect,
		};
	}, [connect, data, disconnect, publish]);

	return <StompClientContext.Provider value={value}>{children}</StompClientContext.Provider>;
}

export default StompClientProvider;
