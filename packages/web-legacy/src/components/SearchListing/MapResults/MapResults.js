import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, change, submit } from 'redux-form';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  OverlayView,
} from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './MapResults.css';

import MapListingItem from '../MapListingItem';
import CustomOverlayView from './CustomOverlayView';

import { setPersonalizedValues } from '../../../actions/personalized';

import mapPinIcon from './map-pin.png';
import flowPinIcon from '../../../../public/SiteIcons/rightArrow.svg';
import flowPinActiveIcon from '../../../../public/SiteIcons/pin-active.svg';

import { setBoundary } from '../../../config';

const refs = {};

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height + 8),
});

const GoogleMapPlace = withGoogleMap((props) => (
  <GoogleMap
    ref={(map) => {
      props.handleFitBounds(map);
      refs.map = map;
    }}
    center={props.center}
    onClick={props.onMapClick}
    onDragStart={props.handleOnDragStart}
    onDragEnd={props.handleOnDragEnd}
    onZoomChanged={props.onZoomChanged}
    // onMouseOver={props.onMouseOver}
    // onMouseOut={props.onMouseOut}
    onCenterChanged={(e) => props.onCenterChanged(e)}
    defaultOptions={{
      minZoom: 2,
      maxZoom: 18,
      mapTypeControl: false,
      streetViewControl: false,
      navigationControl: false,
      // backgroundColor: '',
      streetViewControl: false,
      zoomControl: false,
      draggable: true,
      fullscreenControl: false,
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
    {props.markers && props.markers.map((marker, key) => {
      let pixelOffset = new google.maps.Size(-140, 0);
      let basePrice = 0, activityType;
      let activityTypeVal =
        marker.activity &&
        marker.activity.length > 0 &&
        marker.activity.find((o) => o.activityType == marker.activityType);
      if (!marker.activityType) {
        activityTypeVal = marker.activity[0];
      }
      if (activityTypeVal != undefined) {
        basePrice = activityTypeVal.basePrice;
        activityType = activityTypeVal.activityType;
      }

      return (
        <div key={key}>
          <Marker
            position={marker.position}
            clickable={true}
            icon={{
              url: marker.hovered ? flowPinActiveIcon : flowPinIcon,
              scale: 5,
            }}
            key={key + '_id'}
            onClick={() => props.onMarkerClick(marker)}
            zIndex={(marker.hovered == true ? 1000 : 100) + key}
          >
            {marker.showInfo && (
              <InfoBox
                onCloseClick={() => {
                  props.onMarkerClose(marker);
                }}
                options={{
                  closeBoxURL: ``,
                  alignBottom: true,
                  boxStyle: {
                    width: '278px',
                    paddingTop: '50px',
                    paddingBottom: '5px',
                    minHeight: '145px',
                    maxWidth: '278px',
                    overflow: 'hidden',
                  },
                  pixelOffset: pixelOffset,
                  enableEventPropagation: true,
                }}
                defaultPosition={marker.position}
                zIndex={330}
              >
                <div>
                  <MapListingItem
                    id={marker.id}
                    currency={marker.currency}
                    title={marker.title}
                    coverPhoto={marker.coverPhoto}
                    listPhotos={marker.listPhotos}
                    bookingType={marker.bookingType}
                    reviewsCount={marker.reviewsCount}
                    reviewsStarRating={marker.reviewsStarRating}
                    wishListStatus={marker.wishListStatus}
                    isListOwner={marker.isListOwner}
                    spaceSize={marker.spaceSize}
                    activity={marker.activity}
                    dates={marker.dates}
                    onCloseClick={() => {
                      props.onMarkerClose(marker);
                    }}
                    city={marker.city}
                    state={marker.state}
                    country={marker.country}
                  />
                </div>
              </InfoBox>
            )}
          </Marker>
        </div>
      );
    })}
  </GoogleMap>
));

class MapResults extends React.Component {
  static propTypes = {
    initialFilter: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
      personCapacity: PropTypes.number,
      dates: PropTypes.string,
    }),
    chosenLat: PropTypes.number,
    chosenLng: PropTypes.number,
    total: PropTypes.number,
    results: PropTypes.array,
    personalized: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    change: PropTypes.any,
    submit: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      zoom: 10,
      center: {
        lat: 0,
        lng: 0,
      },
      markers: [],
      bounds: {},
      searchByMapResults: false,
      isMapDrag: false,
      isMapZoom: false
    };
    // this.onMapClick = this.onMapClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.handleFitBounds = this.handleFitBounds.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.getCenter = this.getCenter.bind(this);
    this.handleOnDragStart = this.handleOnDragStart.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    this.handleZoomChanged = this.handleZoomChanged.bind(this);
    // this.handleMapTouch = this.handleMapTouch.bind(this);
    // this.handleMapUnTouch = this.handleMapUnTouch.bind(this);
  }

  componentDidMount() {
    const {
      results,
      initialFilter,
      personalized,
      markerHighlight,
      activityId,
      activityType,
      activityValue,
      dates
    } = this.props;
    const { center } = this.state;
    var bounds = new google.maps.LatLngBounds();

    if (results && results.length > 0) {
      let positions = [];

      results.map((item) => {
        let data = {};
        (data['lat'] = item.lat),
          (data['lng'] = item.lng),
          (data['position'] = new google.maps.LatLng(item.lat, item.lng));
        data['id'] = item.id;
        data['currency'] = item.listingData.currency;
        data['title'] = item.title;
        data['personCapacity'] = item.personCapacity;
        data['coverPhoto'] = item.coverPhoto;
        data['listPhotos'] = item.listPhotos;
        data['bookingType'] = item.bookingType;
        data['reviewsCount'] = item.reviewsCount;
        data['reviewsStarRating'] = item.reviewsStarRating;
        data['wishListStatus'] = item.wishListStatus;
        data['isListOwner'] = item.isListOwner;
        data['spaceSize'] = item.spaceSize;
        data['activity'] = item.activity;
        data['hovered'] = false;
        data['activityType'] = activityType;
        data['activityId'] = activityId;
        data['activityValue'] = activityValue;
        data['dates'] = dates;
        data['city'] = item.city;
        data['state'] = item.state;
        data['country'] = item.country;
        positions.push(data);
        bounds.extend(new google.maps.LatLng(item.lat, item.lng));
      });
      this.setState({ markers: positions, bounds });
    } else {
      let defaultCordinates;
      if (personalized && personalized.lat && personalized.lng) {
        let centerValue = {
          lat: personalized.lat,
          lng: personalized.lng,
        };
        defaultCordinates = new google.maps.LatLng(
          centerValue.lat,
          centerValue.lng,
        );
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else if (initialFilter && initialFilter.lat && initialFilter.lng) {
        let centerValue = {
          lat: initialFilter.lat,
          lng: initialFilter.lng,
        };
        defaultCordinates = new google.maps.LatLng(
          centerValue.lat,
          centerValue.lng,
        );
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else {
        let defaultCordinates = new google.maps.LatLng(center.lat, center.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      results,
      personalized,
      initialFilter,
      searchByMapValue,
      markerHighlight,
      activityType,
      activityId,
      activityValue,
      dates
    } = nextProps;
    const { center, searchByMapResults } = this.state;
    let hover = false;
    var bounds = new google.maps.LatLngBounds();

    this.setState({
      searchByMapResults: searchByMapValue,
    });

    if (results && results.length > 0) {
      let positions = [];

      results.map((item) => {
        let data = {};
        if (markerHighlight) {
          hover = markerHighlight.id == item.id ? true : false;
        }
        let position = new google.maps.LatLng(item.lat, item.lng);
        data["lat"] = item.lat;
        data["lng"] = item.lng;
        data["position"] = new google.maps.LatLng(item.lat, item.lng);
        bounds.extend(position);
        data['id'] = item.id;
        data['currency'] = item.listingData.currency;
        data['title'] = item.title;
        data['personCapacity'] = item.personCapacity;
        data['coverPhoto'] = item.coverPhoto;
        data['listPhotos'] = item.listPhotos;
        data['bookingType'] = item.bookingType;
        data['reviewsCount'] = item.reviewsCount;
        data['reviewsStarRating'] = item.reviewsStarRating;
        data['wishListStatus'] = item.wishListStatus;
        data['isListOwner'] = item.isListOwner;
        data['spaceSize'] = item.spaceSize;
        data['activity'] = item.activity;
        data['hovered'] = hover;
        data['activityType'] = activityType;
        data['activityId'] = activityId;
        data['activityValue'] = activityValue;
        data['dates'] = dates;
        data['city'] = item.city;
        data['state'] = item.state;
        data['country'] = item.country;
        positions.push(data);
      });
      this.setState({
        markers: positions,
        bounds,
      });
    } else {
      let defaultCordinates;
      if (personalized && personalized.lat && personalized.lng) {
        let centerValue = {
          lat: personalized.lat,
          lng: personalized.lng,
        };
        defaultCordinates = new google.maps.LatLng(
          centerValue.lat,
          centerValue.lng,
        );
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else if (initialFilter && initialFilter.lat && initialFilter.lng) {
        let centerValue = {
          lat: initialFilter.lat,
          lng: initialFilter.lng,
        };
        defaultCordinates = new google.maps.LatLng(
          centerValue.lat,
          centerValue.lng,
        );
        bounds.extend(defaultCordinates);
        if (!searchByMapResults) {
          this.setState({ markers: [], bounds, center: centerValue });
        }
      } else {
        let defaultCordinates = new google.maps.LatLng(center.lat, center.lng);
        bounds.extend(defaultCordinates);
        if (!searchByMapResults) {
          this.setState({ markers: [], bounds });
        }
      }
    }
  }

  componentWillUnmount() {
    const { change } = this.props;
    change('SearchForm', 'initialLoad', true);
  }

  handleFitBounds(map) {
    const { bounds, markers, searchByMapResults } = this.state;
    const { initialLoad } = this.props;
    if (map != null && bounds != null) {
      //setCenter
      initialLoad ? map.fitBounds(bounds) : true;
    }
  }

  handleBoundsChanged() {
    let center = new google.maps.getCenter();
  }

  getCenter(e) {
    let center, lat, lng, northEast, southWest;
    if (refs && refs.map) {
      center = refs.map.getCenter();
      lat = center.lat();
      lng = center.lng();
    }
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map((marker) => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
            icon: mapPinIcon,
            hovered: true,
          };
        } else {
          return {
            ...marker,
            showInfo: false,
            icon: mapPinIcon,
            hovered: false,
          };
        }
      }),
      center: {
        lat: targetMarker.lat,
        lng: targetMarker.lng,
      },
      bounds: null,
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map((marker) => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
            icon: mapPinIcon,
            hovered: false,
          };
        }
        return marker;
      }),
    });
  }

  async handleOnDragStart() {
    const { change } = this.props;
    this.setState({
      isMapDrag: true,
    });
    await change('SearchForm', 'searchByMap', true);
    await change('SearchForm', 'initialLoad', false);
  }

  async handleZoomChanged() {
    const { change, submit, searchByMapValue } = this.props;
    const { isMapZoom } = this.state;
    if (refs && refs.map && isMapZoom === false) {
      this.setState({
        isMapZoom: !isMapZoom,
      });
    }

    let center, lat, lng, bounds, northEast, southWest, zoom;
    let new_sw, new_ne, new_bounds;
    if (refs && refs.map && isMapZoom) {
      center = refs.map.getCenter();
      zoom = refs.map.getZoom();
      lat = center.lat();
      lng = center.lng();
      bounds = refs.map.getBounds();
      northEast = bounds.getNorthEast();
      southWest = bounds.getSouthWest();
      new_sw = new google.maps.LatLng(southWest.lat(), southWest.lng());
      new_ne = new google.maps.LatLng(northEast.lat(), northEast.lng());
      new_bounds = new google.maps.LatLngBounds(new_sw, new_ne);
      await change('SearchForm', 'initialLoad', false);
      await change('SearchForm', 'searchByMap', true);
      await setPersonalizedValues({ name: 'lat', value: Number(lat) });
      await setPersonalizedValues({ name: 'lng', value: Number(lng) });
      // if (searchByMapValue) {
      await change('SearchForm', 'lat', lat);
      await change('SearchForm', 'lng', lng);
      await change('SearchForm', 'sw_lat', southWest.lat());
      await change('SearchForm', 'sw_lng', southWest.lng());
      await change('SearchForm', `currentPage`, 1);
      await change('SearchForm', 'ne_lat', northEast.lat());
      await change('SearchForm', 'ne_lng', northEast.lng());
      await submit('SearchForm');
      // }
    }
  }

  async handleOnDragEnd() {
    const {
      change,
      submit,
      searchByMapValue,
      setPersonalizedValues,
    } = this.props;
    const { isMapDrag } = this.state;
    let center, lat, lng, bounds, northEast, southWest;
    let new_sw, new_ne, new_bounds, zoom;

    if (refs && refs.map && isMapDrag) {
      center = refs.map.getCenter();
      zoom = refs.map.getZoom();
      lat = center.lat();
      lng = center.lng();
      bounds = refs.map.getBounds();
      northEast = bounds.getNorthEast(); // Max
      southWest = bounds.getSouthWest(); // Min
      new_sw = new google.maps.LatLng(southWest.lat(), southWest.lng());
      new_ne = new google.maps.LatLng(northEast.lat(), northEast.lng());
      new_bounds = new google.maps.LatLngBounds(new_sw, new_ne);

      await change('SearchForm', 'initialLoad', false);
      if (searchByMapValue) {
        await change('SearchForm', 'lat', lat);
        await change('SearchForm', 'lng', lng);
        await change('SearchForm', `currentPage`, 1);
        await setPersonalizedValues({ name: 'lat', value: Number(lat) });
        await setPersonalizedValues({ name: 'lng', value: Number(lng) });

        await change('SearchForm', 'sw_lat', southWest.lat());
        await change('SearchForm', 'sw_lng', southWest.lng());
        await change('SearchForm', 'ne_lat', northEast.lat());
        await change('SearchForm', 'ne_lng', northEast.lng());
        await submit('SearchForm');
      }
    }
  }

  render() {
    const { center, markers } = this.state;
    return (
      <div className={cx(s.mapCanvas, 'searchMap')}>
        <GoogleMapPlace
          containerElement={<div style={{ width: '100%', height: '100%' }} />}
          mapElement={<div style={{ width: '100%', height: '100%' }} />}
          center={center}
          markers={markers}
          // onMapClick={this.onMapClick}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
          handleOnDragStart={this.handleOnDragStart}
          handleOnDragEnd={this.handleOnDragEnd}
          onZoomChanged={this.handleZoomChanged}
          handleFitBounds={this.handleFitBounds}
          handleBoundsChanged={this.handleBoundsChanged}
          onCenterChanged={this.getCenter}
        // onMouseOver={this.handleMapTouch}
        // onMouseOut={this.handleMapUnTouch}
        />
      </div>
    );
  }
}

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  results: state.search.data,
  total: state.search.count,
  personalized: state.personalized,
  searchByMapValue: selector(state, 'searchByMap'),
  initialLoad: selector(state, 'initialLoad'),
  markerHighlight: selector(state, 'markerHighlight'),
  activityType: selector(state, 'activityType'),
  activityId: selector(state, 'activityId'),
  activityValue: selector(state, 'activityValue'),
  dates: selector(state, 'dates')
});

const mapDispatch = {
  change,
  submit,
  setPersonalizedValues,
};

export default withStyles(s)(connect(mapState, mapDispatch)(MapResults));
