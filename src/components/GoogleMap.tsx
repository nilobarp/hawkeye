import * as React from 'react';
import * as _ from 'lodash';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
declare var google;
// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
));

export class SimpleMap extends React.Component<any, undefined> {
    constructor() {
        super();
    }
    render() {
        return (
            <GettingStartedGoogleMap
                containerElement={
                <div style={{ height: `100%` }} />
                }
                mapElement={
                <div style={{ height: `100%` }} />
                }
                onMapLoad={_.noop}
                onMapClick={_.noop}
                markers={[]}
                onMarkerRightClick={_.noop}
            />
        );
    }
}