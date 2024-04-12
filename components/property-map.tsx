'use client';

import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { setDefaults, fromAddress, OutputFormat } from 'react-geocode';
import Map, { Marker } from 'react-map-gl';
import Spinner from './spinner';
import Image from 'next/image';
import Property from '@/models/Property';

type PropertyMapProps = {
  property: Property;
};

type VProps = {
  latitude: number | undefined;
  longitude: number | undefined;
  zoom: number | undefined;
  width: string;
  height: string;
};

const PropertyMap = ({ property }: PropertyMapProps) => {
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [viewport, setViewport] = useState<VProps>({
    latitude: 0,
    longitude: 0,
    zoom: 0,
    width: '100%',
    height: '500px',
  });

  const [loading, setLoading] = useState(true);
  const [geoCodeError, setGeoCodeError] = useState(false);

  const geoCodingApiKey = process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY;
  if (geoCodingApiKey === undefined) throw new Error('Api key invalid');

  setDefaults({
    key: geoCodingApiKey,
    language: 'en',
    region: 'us',
    outputFormat: OutputFormat.XML,
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );
        if (res.results.length === 0) {
          setGeoCodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
        setGeoCodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (geoCodeError) {
    return <div className='text-xl'>No Location data found</div>;
  }

  if (loading) return <Spinner loading={loading} />;

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: lng !== undefined ? lng : 0,
          latitude: lat !== undefined ? lat : 0,
          zoom: 15,
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <Marker longitude={lng || 0} latitude={lat || 0} anchor='bottom'>
          <Image src='/images/pin.svg' alt='location' width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
