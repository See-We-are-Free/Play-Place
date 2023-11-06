import React from 'react';
import { Client } from '@stomp/stompjs';
import { IAroundPeople } from '@/types/radar';

export interface StompClientContextType {
	client: Client | null;
	publish: (latitude: number, longitude: number) => void;
	data: IAroundPeople[] | null;
	connect: () => void;
	disconnect: () => void;
}

const StompClientContext = React.createContext<StompClientContextType>({
	client: null, // 초기값으로 null을 할당할 수 있습니다.
	publish: () => {},
	data: null,
	connect: () => {},
	disconnect: () => {},
});

export default StompClientContext;
