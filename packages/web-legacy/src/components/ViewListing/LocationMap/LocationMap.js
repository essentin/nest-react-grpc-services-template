import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LocationMap.css';
import { Row } from 'react-bootstrap';

import { connect } from 'react-redux';

import ReactGoogleMapLoader from 'react-google-maps-loader';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import { googleMapAPI } from '../../../config';

import mapPinIcon from '../../../../public/SiteIcons/rightArrow.svg';

const GoogleMapPlace = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={14}
    center={props.center}
    defaultOptions={{
      backgroundColor: '',
      scrollwheel: false,
      maxZoom: 16,
      minZoom: 11,
      streetViewControl: false,
      zoomControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      draggable: false,
      styles: [
        {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#e0efef"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "hue": "#1900ff"
            },
            {
              "color": "#c0e8e8"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "lightness": 100
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "lightness": 700
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "color": "#7dcdcd"
            }
          ]
        }
      ],
    }}
  >
    <Marker
      position={props.markers.position}
      draggable={false}
      icon={{
        url: mapPinIcon
      }}
    />
  </GoogleMap>
));

class LocationMap extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      center: {},
      markers: null,
    };
  }

  componentWillMount() {
    const { data } = this.props;
    let lat = data.lat;
    let lng = data.lng;
    this.setState({
      center: {
        lat: Number(lat),
        lng: Number(lng),
      },
      smallDevice: false,
    });
  }

  render() {
    const { center } = this.state;
    const { data } = this.props;
    let displayName = data.user.profile.displayName;
    let city = data.city;
    let country = data.country;

    return (
      <Row className={s.pageContent}>
        <div className={s.showHidePadding}>
          <div style={{ height: 300 }}>
            <ReactGoogleMapLoader
              params={{
                key: googleMapAPI, // Define your api key here
                libraries: 'places,geometry', // To request multiple libraries, separate them with a comma
              }}
              render={(googleMaps) =>
                googleMaps && (
                  <GoogleMapPlace
                    containerElement={
                      <div style={{ width: '100%', height: `100%` }} />
                    }
                    mapElement={
                      <div style={{ width: '100%', height: `100%` }} />
                    }
                    center={center}
                    markers={{
                      position: new google.maps.LatLng(center.lat, center.lng),
                    }}
                  />
                )
              }
            />
          </div>
        </div>
      </Row>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = { };


export default withStyles(s)(connect(mapState, mapDispatch)(LocationMap));