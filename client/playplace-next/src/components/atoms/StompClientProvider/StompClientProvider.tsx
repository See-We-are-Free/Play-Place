import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { CurrentLocation, IAroundPeople } from '@/types/radar';
import StompClientContext, { StompClientContextType } from '@/utils/common/StompClientContext';
import songShareState from '@/recoil/radar';
import { useRecoilState } from 'recoil';

function StompClientProvider({ children }: { children: ReactNode }) {
	const [isSongShare] = useRecoilState(songShareState);
	const client = useRef<StompJs.Client | null>(null);
	const [data, setData] = useState<IAroundPeople[] | null>(null);
	const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	const subscribe = useCallback(() => {
		if (client.current?.active) {
			client.current.subscribe('/topic/location/1', ({ body }) => {
				console.log('구독 ==========');
				const parsedBody: IAroundPeople[] = JSON.parse(body);
				if (!data || parsedBody.some((pb) => !data.some((d) => d.userId === pb.userId))) {
					setData(parsedBody);
				} else {
					console.log('변경된 값이 없습니다.');
				}
			});
		}
	}, [data]);

	const publish = useCallback(async (latitude: number, longitude: number) => {
		if (!client || !client.current || !client.current?.active) {
			console.log('연결 없음, 발행을 시도할 수 없음');
			return;
		}

		try {
			console.log('발행 ==========');
			console.log('active', client.current.active);
			console.log('message', `{ "latitude": ${latitude}, "longitude": ${longitude} }`);
			client.current.publish({
				destination: '/pub/location',
				body: `{ "latitude": ${latitude}, "longitude": ${longitude} }`,
				// body: `{ "latitude": 35.191318, "longitude": 126.823577 }`, // 개발용
			});
		} catch (error) {
			console.error('발행 중 오류 발생:', error);
			console.log('client', client);
		}
	}, []);

	const connect = useCallback(() => {
		console.log('연결 시작');
		const baseUrl = process.env.NEXT_PUBLIC_WS_BASE_URL || '';
		// const baseUrl = process.env.NEXT_PUBLIC_DEVELOP_WS_BASE_URL || ''; // 개발용
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
		navigator.geolocation.getCurrentPosition((position) => {
			const location = {
				longitude: position.coords.longitude,
				latitude: position.coords.latitude,
			};
			console.log('현재 위치', location);
			setCurrentLocation(location);
		});
	}, []);

	useEffect(() => {
		if (!localStorage.getItem('accessToken')) {
			console.log('토큰 없음 false');
			return;
		}

		if (!currentLocation) {
			getCurrentLocation();
		}
	}, [currentLocation, getCurrentLocation]);

	useEffect(() => {
		if (!isSongShare) {
			console.log('공유 중지 상태');
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
