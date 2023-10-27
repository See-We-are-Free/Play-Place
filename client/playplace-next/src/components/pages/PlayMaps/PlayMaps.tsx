import React, { useState, useCallback } from 'react';
import { nightModeStyles } from './style';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { MapsCenter } from '@/types/maps';

function PlayMaps() {
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [center, setCenter] = useState<MapsCenter>({
		lat: 37.5037779,
		lng: 127.043148,
	});

	const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS || '';

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey,
	});

	const onLoad = useCallback(function callback(map: React.SetStateAction<google.maps.Map | null>) {
		const bounds = new window.google.maps.LatLngBounds(center);
		if (map !== null) {
			map.fitBounds(bounds);
		}

		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	return <div>PlayMaps</div>;
}

export default PlayMaps;
