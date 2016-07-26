import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom'
import shouldPureComponentUpdate from 'react-pure-render/function'
import GoogleMap from 'google-map-react'
import {makeRequest, Endpoints} from '../utils/api'
import Marker from "../components/Marker"
import FormAddDriverToOrder from "../components/FormAddDriverToOrder"
import Filter from "../utils/Filter"

class Root extends Component {

    static defaultProps = {
        center: {lat: 48.45 , lng: 35.05},
        zoom: 12
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.state = {
            orders: [],
            driversFree: [],
            driversBusy: [],
            currentOrderId: null,
            currentDriverId: null
        };
    }

    loadData() {

        makeRequest(Endpoints.GET_ORDER_LIST())
            .then(response => {
                let ordersArr = Filter(response.data.orders, order => order.status === "new");
                // console.log('orders ',response.data.orders);
                console.log('filter orders ', ordersArr );
                this.setState({
                    orders: ordersArr
                })
            })

        makeRequest(Endpoints.GET_DRIVER_LIST())
            .then(response=> {
                let freeDrivers = Filter(response.data.data, driver=>(driver.Status === "active" && driver.State === "online"));
                let busyDrivers = Filter(response.data.data, driver=>(driver.Status === "active" && driver.State === "on_order"));
                console.log('drivers', response.data.data);
                console.log('freeDrivers ', freeDrivers );
                console.log('busyDrivers ', busyDrivers );
                this.setState({
                    driversFree: freeDrivers,
                    driversBusy: busyDrivers
                })
            })
    }

    handlerMakeRequest(driverId,orderId,orderComment = " ") {
      console.log(driverId,orderId,orderComment);
      let data = {
        order_id: parseInt(orderId, 10),
        driver_id: parseInt(driverId,10),
        comment: orderComment
      }
      console.log("Request data", data);
      makeRequest(Endpoints.POST_DRIVER_TO_ORDER(),data);
    }

    handlerOrderSelection(id) {
      console.log(id);
      this.setState({
        currentOrderId: id
      })
    }

    handlerDriverSelection(id) {
      console.log(id);
      this.setState({
        currentDriverId: id
      })
    }

    componentDidMount() {
        let { orderId } = this.props.params;
        if( orderId) {
          let order = {
            currentOrderId: orderId
          }
          this.setState(order);
        }
        this.loadData();
        this._autoUpdate = setInterval( () => {
            this.loadData();
        } , 5000);
    }

    componentWillUnmount() {
        clearInterval(this._autoUpdate);
    }

    render() {

      let markersOrders = this.state.orders.
          map((order, index) => (
            <Marker
              // required props
              key={order.id}
              lat={order.start_point.lat}
              lng={order.start_point.lng}
              // any user props
              markerType="order"
              onSelection={this.handlerOrderSelection.bind(this)}
              id={order.id}/>
          ));

      let markersDriversFree = this.state.driversFree.
          map((driver, index) => (
            <Marker
              // required props
              key={driver.Id}
              lat={driver.LastLat}
              lng={driver.LastLng}
              // any user props
              markerType="driversFree"
              onSelection={this.handlerDriverSelection.bind(this)}
              id={driver.Id}/>
          ));

      let markersDriversBusy = this.state.driversBusy.
          map((driver, index) => (
            <Marker
              // required props
              key={driver.Id}
              lat={driver.LastLat}
              lng={driver.LastLng}
              // any user props
              markerType="driversBusy"
              onSelection={this.handlerDriverSelection.bind(this)}
              id={driver.Id}/>
          ));


        return (
            <div className="activity-map">
                <div className="row">
                    <div className="col-sm-8" style={{height: '600px'}}>
                        <GoogleMap
                           bootstrapURLKeys={{
                             key: 'AIzaSyCWK6ZJN_I1B7yR_WvOh9jmK8KU-LOA1IA',
                             language: 'ru'
                            }}
                           defaultCenter={this.props.center}
                           defaultZoom={this.props.zoom}>
                           {markersOrders}
                           {markersDriversFree}
                           {markersDriversBusy}
                        </GoogleMap>
                    </div>
                    <div className="col-sm-4">
                      <FormAddDriverToOrder
                        onMakeRequest={this.handlerMakeRequest}
                        orderId={this.state.currentOrderId}
                        driverId={this.state.currentDriverId}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Root;
