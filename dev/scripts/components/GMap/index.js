import React, {PropTypes, Component} from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';


export default class Gmap extends Component {
  static propTypes = {
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onBoundsChange: PropTypes.func,
    onMarkerHover: PropTypes.func,
    onChildClick: PropTypes.func,
    center: PropTypes.any,
    zoom: PropTypes.number,
    markers: PropTypes.any,
    visibleRowFirst: PropTypes.number,
    visibleRowLast: PropTypes.number,
    maxVisibleRows: PropTypes.number,
    hoveredRowIndex: PropTypes.number,
    openBallonIndex: PropTypes.number
  }

  static defaultProps = {
    center: {lat: 48.45, lng: 35.05 },
    zoom: 10
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }


  _onChildClick = (key, childProps) => {
    const markerId = childProps.marker.get('id');
    const index = this.props.markers.findIndex(m => m.get('id') === markerId);
    if (this.props.onChildClick) {
      this.props.onChildClick(index);
    }
  }

  render() {
      const Markers = this.props.markers.
      .map((marker, index) => (
        <Marker
          // required props
          key={marker.get('id')}
          lat={marker.get('lat')}
          lng={marker.get('lng')}
          // any user props
          onCloseClick={}
          marker={marker} />
      ));

    return (
      <GoogleMap
        // apiKey={null}
        center={this.props.center.toJS()}
        zoom={this.props.zoom}
        onChildClick={this._onChildClick}
        >
        {Markers}
      </GoogleMap>
    );
  }
}
