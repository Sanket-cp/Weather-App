
/// <reference types="vite/client" />

// Type declarations for react-leaflet components
declare module 'react-leaflet' {
  import { Map as LeafletMap, Marker as LeafletMarker, TileLayer as LeafletTileLayer } from 'leaflet';
  import { FC, ReactNode, RefAttributes } from 'react';
  
  export interface MapContainerProps {
    children: ReactNode;
    center: [number, number];
    zoom: number;
    style?: React.CSSProperties;
  }
  
  export interface TileLayerProps {
    attribution: string;
    url: string;
  }
  
  export interface MarkerProps {
    position: [number, number];
    icon?: any;
    children?: ReactNode;
  }
  
  export interface PopupProps {
    children: ReactNode;
  }
  
  export const MapContainer: FC<MapContainerProps & RefAttributes<LeafletMap>>;
  export const TileLayer: FC<TileLayerProps & RefAttributes<LeafletTileLayer>>;
  export const Marker: FC<MarkerProps & RefAttributes<LeafletMarker<any>>>;
  export const Popup: FC<PopupProps>;
  export const useMap: () => LeafletMap;
}
