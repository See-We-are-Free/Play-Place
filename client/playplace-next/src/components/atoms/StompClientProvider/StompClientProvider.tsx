import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { IAroundPeople } from '@/types/radar';
import StompClientContext, { StompClientContextType } from '@/utils/common/StompClientContext';

function StompClientProvider({ children }: { children: ReactNode }) {
	const client = useRef<StompJs.Client | null>(null);
	const [data, setData] = useState<IAroundPeople[] | null>(null);

	const subscribe = useCallback(() => {
		if (client.current?.active) {
			client.current.subscribe('/topic/location/1', ({ body }) => {
				const parsedBody: IAroundPeople[] = JSON.parse(body);
				if (!data || parsedBody.some((pb) => !data.some((d) => d.userId === pb.userId))) {
					setData(parsedBody);
				} else {
					console.log('변경된 값이 없습니다.');
				}
			});
		}
	}, [data]);

	const publish = useCallback(async (longitude: number, latitude: number) => {
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
			});
		} catch (error) {
			console.error('발행 중 오류 발생:', error);
			console.log('client', client);
		}
	}, []);

	const connect = useCallback(() => {
		console.log('연결 시작');
		const baseUrl = process.env.NEXT_PUBLIC_WS_BASE_URL || '';
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
		client.current?.deactivate();
	}, []);

	useEffect(() => {
		if (!localStorage.getItem('accessToken')) {
			return;
		}

		connect();

		// eslint-disable-next-line consistent-return
		return () => {
			disconnect();
		};
	}, [connect, disconnect]);

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
