import React, {PropTypes, Component} from 'react';

let markerStyle = {
  markerOrder : {
    backgroundImage: 'url("./images/client-icon.png")',
    height: '100%',
    backgroundSize: 'cover'
  },
  markerDriverFree : {
    backgroundImage: 'url("./images/car-green.png")',
    height: '100%',
    backgroundSize: '60%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '2px solid #008000',
    borderRadius: '50%',
    backgroundColor: '#fff'
  },
  markerDriverBusy : {
    backgroundImage: 'url("./images/car-red.png")',
    height: '100%',
    backgroundSize: '60%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '2px solid #E04006',
    borderRadius: '50%',
    backgroundColor: '#fff'
  },
  markerPoint : {
    backgroundImage: 'url("./images/red-marker.png")',
    height: '100%',
    backgroundSize: '80%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } ,
  markerMap : {
    width: '40px',
    height: '40px',
    textAlign: 'center'
  },
  markerMapInfoShow: {
    background: '#fff',
    height: '30px',
    fontSize: '14px',
    padding: '5px',
    position: 'absolute',
    top: '-35px',
    left: '-10px',
    width: '60px',
    border: '1px solid #fff',
    borderRadius: '5px'
  },
  markerMapInfoHide: {
    display: 'none'
  }
}

class Marker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showInfo: false
        };
    }

    handleShowInfo(e) {
      let toggleShowInfo = !this.state.showInfo;
      let id = this.props.id;
      this.props.onSelection(id);
      this.setState({
        showInfo: toggleShowInfo
      })
    }

    render() {
      const styleMarkerMapInfo = this.state.showInfo ? markerStyle.markerMapInfoShow : markerStyle.markerMapInfoHide;
      let id = this.props.id;
      let currentStyle;
      switch (this.props.markerType) {
           case "order":
                currentStyle = markerStyle.markerOrder;
                break
           case "driversFree":
                currentStyle = markerStyle.markerDriverFree;
                break
           case "driversBusy":
                currentStyle = markerStyle.markerDriverBusy;
                break
          case "point":
               currentStyle = markerStyle.markerPoint;
               break
      }

      return (
         <div className="marker-map" style={markerStyle.markerMap} onClick={this.handleShowInfo.bind(this)}>
            <div className="marker-map-info" style={styleMarkerMapInfo}>
               {'ID : ' + id}
            </div>
            <div className="marker-map-icon" style={currentStyle}></div>
         </div>
      );
    }

  }

export default Marker;
