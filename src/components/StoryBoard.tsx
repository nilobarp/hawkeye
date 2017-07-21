import * as React from 'react';
import axios from 'axios';
import constants from '../constants';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';

declare var google: any;

const mapStyles = [
    {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#ffffff"
            }
        ]
    },
    {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#000000"
            },
            {
                lightness: 13
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#000000"
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#144b53"
            },
            {
                lightness: 14
            },
            {
                weight: 1.4
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "all",
        stylers: [
            {
                color: "#08304b"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#0c4152"
            },
            {
                lightness: 5
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#000000"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#0b434f"
            },
            {
                lightness: 25
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#000000"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#0b3d51"
            },
            {
                lightness: 16
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
            {
                color: "#000000"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "all",
        stylers: [
            {
                color: "#146474"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                color: "#021019"
            }
        ]
    }
]

const PopUpStoryContainer = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={12}
        center={props.center}
        options={{ styles: mapStyles }}
    >
        {props.markers.map((marker, index) => (
            <Marker
                key={index}
                position={marker.position}
                onClick={() => props.onMarkerClick(marker)}
            >
                {marker.showInfo && (
                    <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                        <div>{marker.infoContent}</div>
                    </InfoWindow>
                )}
            </Marker>
        ))}
    </GoogleMap>
));

const geolocation = (
    navigator.geolocation ?
        navigator.geolocation :
        ({
            getCurrentPosition(success, failure) {
                failure(`Your browser doesn't support geolocation.`);
            },
        })
);

export class StoryBoard extends React.Component<any, any> {
    state;
    isUnmounted = false;

    constructor() {
        super();

        this.state = {
            center: {
                lat: 1.3687055,
                lng: 105.83767739999999,
            },
            markers: [],
        };

        this.handleMarkerClick = this.handleMarkerClick.bind(this);
        this.handleMarkerClose = this.handleMarkerClose.bind(this);
    }

    componentWillMount() {

    }

    private createMarkers(data: any[]) {
        let markers = [];
        data.map((datum) => {
            markers.push({
                position: new google.maps.LatLng(datum.lat, datum.lng),
                showInfo: false,
                infoContent: (
                    <div>
                        <h5>{datum.cuisine}</h5>
                        <div>{datum.summary}</div>
                        <hr/>
                        <div>{datum.story}</div>
                    </div>
                )
            });
        });
        this.setState({ markers: markers });
    }

    componentDidMount() {
        axios({
            baseURL: constants.API_SERVER_URL,
            method: 'get',
            url: '/localisedStories'
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                this.createMarkers(res.data);
                geolocation.getCurrentPosition((position) => {
                    if (this.isUnmounted) {
                        return;
                    }
                    this.setState({
                        center: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        }
                    });
                }, (reason) => {
                    if (this.isUnmounted) {
                        return;
                    }
                    this.setState({
                        center: {
                            lat: 1,
                            lng: 105,
                        },
                        content: `Error: The Geolocation service failed (${reason}).`,
                    });
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    handleMarkerClick(targetMarker) {
        this.setState({
            markers: this.state.markers.map(marker => {
                if (marker === targetMarker) {
                    return {
                        ...marker,
                        showInfo: true
                    };
                } else {
                    return {
                        ...marker,
                        showInfo: false,
                    };
                }
            }),
        });
    }

    handleMarkerClose(targetMarker) {
        this.setState({
            markers: this.state.markers.map(marker => {
                if (marker === targetMarker) {
                    return {
                        ...marker,
                        showInfo: false,
                    };
                }
                return marker;
            }),
        });
    }

    render() {
        return (
            <PopUpStoryContainer
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
                center={this.state.center}
                markers={this.state.markers}
                onMarkerClick={this.handleMarkerClick}
                onMarkerClose={this.handleMarkerClose}
            />
        );
    }
}