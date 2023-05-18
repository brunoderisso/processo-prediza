import GoogleMapReact from 'google-map-react';
import React, { useCallback, useEffect, useState } from 'react';

import { LocationPoint, Point } from '@/models/map';
import serviceMap from '@/services/map.service';

const MarkPoint = ({ text }: any) => (
  <div style={{
    color: 'white',
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
)

const getMapBounds = (maps: any, places: Point[]) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place: Point) => {
    bounds.extend(new maps.LatLng(
      place.latitude,
      place.longitude,
    ));
  });
  return bounds;
};

const bindResizeListener = (map: any, maps: any, bounds: any) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

const handleApiLoaded = (map: any, maps: any, places: Point[]) => {
  const bounds = getMapBounds(maps, places);

  map.fitBounds(bounds);
  bindResizeListener(map, maps, bounds);
};

export default function Map(){
  const [locationsMap, setLocationsMap] = useState<LocationPoint>()
  const [defaultProps, setDefaultProps] = useState<any>()

  const callServiceMap = useCallback(async() => {
    const responseServiceMap = await serviceMap()
    const locationEnv = responseServiceMap.data.find(location => location.isenvironment)

    if (locationEnv) {
      setLocationsMap(locationEnv)
      setDefaultProps({
        center: {
          lat: locationEnv.centroid[0],
          lng: locationEnv.centroid[1]
        },
        zoom: 10
      })
    }
  }, [])

  useEffect(() => {
    callServiceMap()
  }, [callServiceMap])

  return (
    locationsMap
      ? <div style={{ height: '700px', width: '100%', marginTop: '40px' }}>
          <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals={true}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, locationsMap.Points)}
          >
            {locationsMap.Points.map((place) => (
              <MarkPoint
                key={place.objectid}
                lat={place.latitude}
                lng={place.longitude}
                text={locationsMap.name}
              />
            ))}
          </GoogleMapReact>
        </div>
      : <div></div>
  );
}