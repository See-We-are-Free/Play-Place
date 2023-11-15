import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { IAroundPeople } from '@/types/radar';
import StompClientContext, { StompClientContextType } from '@/utils/common/StompClientContext';
import UserInfoContext from '@/utils/common/UserInfoContext';

function StompClientProvider({ children }: { children: ReactNode }) {
	const { isSongShare } = useContext(UserInfoContext);
	const client = useRef<StompJs.Client | null>(null);
	const [data, setData] = useState<IAroundPeople[] | null>(null);
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	const subscribe = useCallback(() => {
		if (!client.current?.active) {
			// console.log('연결 없음, 구독을 시도할 수 없음');
			return;
		}

		try {
			// console.log('구독 ========== /user/queue/location');
			client.current.subscribe('/user/queue/location', ({ body }) => {
				const parsedBody: IAroundPeople[] = JSON.parse(body);
				// console.log('Before parsedBody', data);
				// console.log('After parsedBody', parsedBody);
				if (
					!data ||
					parsedBody.some(
						(pb) =>
							// data에 pb.userId가 없거나, userId가 같지만 youtubeId가 다른 경우를 확인
							!data.some((d) => d.userId === pb.userId) ||
							data.some((d) => d.userId === pb.userId && d.youtubeId !== pb.youtubeId),
					) ||
					data.some(
						(d) =>
							// data에 있는 각 userId가 parsedBody에 없는 경우를 확인
							!parsedBody.some((pb) => pb.userId === d.userId),
					)
				) {
					setData(parsedBody);
				} else {
					// console.log('변경된 값이 없습니다.');
				}
			});
		} catch (err) {
			console.error(err);
		}
	}, [data]);

	const publish = useCallback(async (latitude: number, longitude: number) => {
		if (!client.current?.active) {
			// console.log('연결 없음, 발행을 시도할 수 없음');
			return;
		}

		try {
			// console.log('발행 ========== /pub/location');
			// console.log(`위치 : { "latitude": ${latitude}, "longitude": ${longitude} }`);
			client.current.publish({
				destination: '/pub/location',
				body: `{ "latitude": ${latitude}, "longitude": ${longitude} }`,
			});
		} catch (error) {
			// console.error('발행 중 오류 발생:', error);
			// console.log('client', client);
			console.log(error);
		}
	}, []);

	const connect = useCallback(() => {
		// console.log('연결 시작');
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
		// console.log('연결 해제');
		client.current?.deactivate();
	}, []);

	const getCurrentLocation = useCallback(async () => {
		if (window.AndMap) {
			const appLocation = window.AndMap.getLastKnownLocation();
			if (appLocation) {
				const location = JSON.parse(appLocation);
				publish(location.lat, location.lng);
			}
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				publish(position.coords.latitude, position.coords.longitude);
			},
			(error) => {
				console.error('getCurrentPosition :: 위치 정보를 가져오는 데 실패했습니다.', error);
				// setStateCallback({ lat: 35.205534, lng: 126.811585 }); // 기본 위치 설정
			},
		);
	}, [publish]);

	useEffect(() => {
		if (!isSongShare) {
			if (intervalId) {
				clearInterval(intervalId);
				setIntervalId(null);
			}
			return;
		}

		if (isSongShare && !intervalId) {
			getCurrentLocation();
			setIntervalId(
				setInterval(() => {
					getCurrentLocation();
				}, 10000),
			);
		}

		// eslint-disable-next-line consistent-return
		return () => {
			if (intervalId) {
				// console.log('리턴 인터벌');
				clearInterval(intervalId);
				setIntervalId(null);
			}
		};
	}, [getCurrentLocation, intervalId, isSongShare]);

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
