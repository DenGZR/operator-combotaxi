import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import GoogleMap from 'google-map-react'
import {Grid, Row, Col} from 'react-bootstrap'
import {makeRequest, Endpoints} from '../utils/api'
import {autoUpdater} from '../utils/autoUpdater'
import {Point} from '../structures/Point'
import Marker from "../components/Marker"
import {InputPlace} from '../components/InputPlace'
import {priceTypeName} from '../dicts/priceTypes'
import {Alert, TYPE_ERROR, TYPE_INFO} from '../components/Alert'


class Order {
    constructor() {
        this.addAddon = this.addAddon.bind(this);
        this.hasAddon = this.hasAddon.bind(this);
        this.toggleAddon = this.toggleAddon.bind(this);
        this.removeAddon = this.removeAddon.bind(this);
        this._data = {
            client_phone: "",
            client_first_name: "",
            client_last_name: "",
            client_middle_name: "",
            start_point: new Point(),
            end_point: new Point(),
            comment: null,
            way_points: [],
            scheduled: false,
            scheduled_at: '',
            passengers: 1,
            tariff_addons: [],
            on_city: false
        };
    }

    prepare() {
        return {
            client_phone: this._data.client_phone,
            client_first_name: this._data.client_first_name,
            client_last_name: this._data.client_last_name,
            client_middle_name: this._data.client_middle_name,
            scheduled_at: this._data.scheduled_at,
            start_point: this.startPoint.prepare(),
            end_point: this.endPoint.prepare(),
            way_points: this._data.way_points.map(point=>point.prepare()),
            tariff_addons: this.tariffAddons,
            comment: this._data.comment,
            passengers: this._data.passengers,
            scheduled: false,
            on_city: false
        };
    }

    get startPoint() {
        this._data.start_point.id = "start";
        return this._data.start_point;
    }

    get tariffAddons() {
        return this._data.tariff_addons;
    }

    get endPoint() {
        this._data.end_point.id = "end";
        return this._data.end_point;
    }

    get middlePoints() {
        this._data.way_points.forEach((point, i)=>point.id = i);
        return this._data.way_points;
    }

    get waypoints() {
        return [this.startPoint, ...this.middlePoints, this.endPoint].filter(point=>!point.isEmpty());
    }

    addWayPoint(point) {
        if (this.startPoint.isEmpty()) {
            this._data.start_point = point
        } else if (this.endPoint.isEmpty()) {
            this._data.end_point = point
        } else {
            this._data.way_points.push(point);
        }
    }

    removeWayPoint(index) {
        if (index == "start") {
            this._data.start_point = new Point(0, 0);
        } else if (index == "end") {
            this._data.end_point = new Point(0, 0);
        } else {
            this._data.way_points.splice(index, 1);
        }
    }

    setWayPoint(pointId, point) {
        if (pointId == "start") {
            this._data.start_point = point
        } else if (pointId == "end") {
            this._data.end_point = point
        } else {
            this._data.way_points[pointId] = point
        }
    }

    hasAddon(addonId) {
        return !!(this._data.tariff_addons.find((addon) => addon == addonId));
    }

    toggleAddon(addonId) {
        if (this.hasAddon(addonId)) {
            this.removeAddon(addonId);
        } else {
            this.addAddon(addonId);
        }
    }

    addAddon(addonId) {
        if (!this.hasAddon(addonId)) {
            this._data.tariff_addons.push(parseInt(addonId));
        }
    }

    removeAddon(addonId) {
        this._data.tariff_addons = this._data.tariff_addons.filter(addon => addon != addonId);
    }

    ClientInfo(key, val) {
      this._data[key] = val;
    }
}


class OrderCreateForm extends Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.handleAddon = this.handleAddon.bind(this);
        this.placeAdd = this.placeAdd.bind(this);
        this.placeChange = this.placeChange.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            order: new Order(),
            addons: [],
            infoMes: null
        };


    }

    loadData() {
        makeRequest(Endpoints.GET_CURRENT_TARIFF())
            .then(response=>this.setState({currentTariff: response.data}))
            .catch(error=>console.log(error));
        makeRequest(Endpoints.GET_TARIFF_ADDONS())
            .then(response=>{
              let data = response.data || [];
              this.setState({addons: data})
            })
            .catch(error=>console.log(error));
    }

    componentDidMount() {
        this.loadData();
    }

    handleCreateOrder(e) {
        e.preventDefault();
        const {order} = this.state;
        let createdOrder = order.prepare();
        // добавлено для теста отправки order
        console.log(" send order",  order.prepare());
        // добавлено для теста отправки order
        makeRequest(Endpoints.POST_CREATE_ORDER(), createdOrder )
           .then(response=>{
             console.log('Server response :', response);
             let newState = checkServerResponse(response,this.state);
             this.setState(newState);
           })
           .catch(error=>console.log('Server response Error :', error));
    }

    placeAdd(point) {
        const {order} = this.state;
        order.addWayPoint(point);
        point.fillPlaceName()
            .then(this.update);
    }

    placeChange(pointId, point) {
        const {order} = this.state;

        order.setWayPoint(pointId, point);
        this.props.onHandleMarker('changeMarker', point, pointId );
        point.fillPlaceName()
            .then(this.update);
    }

    placeDelete(pointId) {
        const {order} = this.state;
        this.props.onHandleMarker('deleteMarker', null ,pointId);
        order.removeWayPoint(pointId);
        this.update();
    }

    update() {
        const {order} = this.state;
        this.setState({order});
    }

    componentWillReceiveProps(newProps) {
        if (newProps.map != this.props.map) {
            newProps.map.onMarkerAdd = this.placeAdd;
            newProps.map.onMarkerDrag = this.placeChange;
        }
    }

    handleAddWayPoint() {
        //  добавим новые чистый input для дополнительной точки
        let point =  new Point();
        this.placeAdd(point);

    }

    handleAddon(e) {
        const {order} = this.state;
        order.toggleAddon(e.target.dataset.addonid);
        this.update();
    }

    handleClientInfo(e) {
      const {order} = this.state;
      let value = e.target.value;
      let inputName = e.target.getAttribute("data-input-name");
      if(inputName === 'client_phone') {
        value = '380' + value;
      }
      if(inputName === 'passengers') {
        value = parseInt(value, 10);
      }
      //console.log('key',inputName , 'val', value );
      order.ClientInfo(inputName , value);
      this.update();
    }

    render() {
        const {currentTariff, order, infoMes } = this.state;
        let infoMesType = TYPE_ERROR;

        return (
            <form onSubmit={this.handleCreate} className="order-create">
                <Alert type={infoMesType}>"infoMes"</Alert>
                <InputPlace key={order.startPoint.id}
                            point={order.startPoint}
                            onChange={this.placeChange.bind(this, order.startPoint.id)}
                            onDelete={this.placeDelete.bind(this, order.startPoint.id)}/>
                {
                    order.middlePoints.map((point, i) =>
                        <InputPlace key={i}
                                    point={point}
                                    onChange={this.placeChange.bind(this, point.id)}
                                    onDelete={this.placeDelete.bind(this, point.id)}/>
                    )
                }
                <InputPlace key={order.endPoint.id}
                            point={order.endPoint}
                            onChange={this.placeChange.bind(this, order.endPoint.id)}
                            onDelete={this.placeDelete.bind(this, order.endPoint.id)}/>

                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default" onClick={this.handleAddWayPoint.bind(this)} >+</button>
                </div>
                <ol className="addons-list">
                    {this.state.addons.map((addon, i)=> {
                        return (
                            <li key={i}>
                                <label ><input type="checkbox"
                                               data-addonid={addon.id}
                                               onChange={this.handleAddon}
                                               checked={order.hasAddon(addon.id)}/>
                                    {` ${addon.title} (${addon.price} ${priceTypeName(addon.price_type)})`}</label>
                            </li>
                        );
                    })}
                </ol>

                <div className="form-group client-info">
                    <label htmlFor ="client-phone">Информация о клиенте : </label>
                    <div className="input-group">
                        <span className="input-group-addon" >380</span>
                        <input type="tel"
                           className="form-control"
                           id="client-phone"
                           aria-describedby="basic-addon3"
                           data-input-name="client_phone"
                           onChange={this.handleClientInfo.bind(this)}/>
                    </div>

                    <div className="input-group">
                        <span className="input-group-addon" >Имя : </span>
                        <input type="text"
                           className="form-control"
                           id="client-first-name"
                           aria-describedby="basic-addon3"
                           data-input-name="client_first_name"
                           onChange={this.handleClientInfo.bind(this)}/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon" >Фамилия : </span>
                        <input type="text"
                          className="form-control"
                          id="client-last-name"
                          aria-describedby="basic-addon3"
                          data-input-name="client_last_name"
                          onChange={this.handleClientInfo.bind(this)}/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon" >Отчество : </span>
                        <input type="text"
                          className="form-control"
                          id="client-middle-name"
                          aria-describedby="basic-addon3"
                          data-input-name="client_middle_name"
                          onChange={this.handleClientInfo.bind(this)}/>
                    </div>

                    <label htmlFor ="sel1">Количество пассажиров :</label>
                    <select className="form-control" id="sel1" data-input-name="passengers" onChange={this.handleClientInfo.bind(this)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <label htmlFor ="comments">Комментарии клиента :</label>
                    <textarea className="form-control" rows="5" id="comments" data-input-name="comment" onChange={this.handleClientInfo.bind(this)} placeholder="Комментарии ..."/>
                </div>
                <button className="btn btn-primary"  onClick={this.handleCreateOrder.bind(this)}>Создать</button>
            </form>

        )
    }
}


class Root extends Component {

    static defaultProps = {
        center: {lat: 48.45 , lng: 35.05},
        zoom: 12
    };

    constructor(props) {
        super(props);
        this.state = {
            markers: {}
        };
    }

    componentDidMount() {

    }

    handleMarker( actionType, point, pointId ) {
      let {markers, center} = this.state;
      switch (actionType) {
        case 'deleteMarker':
          delete markers[pointId];
          break;
        case 'changeMarker':
          markers[pointId] = {
            'id' : pointId,
            'lat' : point.lat,
            'lng' : point.lng
          }
          break;
      }
      this.setState({ markers: markers });
    }

    createMarkers( dataMarkers ) {
      let ArrMarkersList = [];
      for (let marker in dataMarkers) {
        if (dataMarkers.hasOwnProperty(marker)) {
          let listItem = <Marker
            // required props
            key={dataMarkers[marker].id}
            lat={dataMarkers[marker].lat}
            lng={dataMarkers[marker].lng}
            // any user props
            markerType="point"
            id={dataMarkers[marker].id}/>

          ArrMarkersList.push(listItem);
        }
      }
      return ArrMarkersList;
    }

    render() {
      let markers = this.state.markers;
      let MarkerList = this.createMarkers(markers);
      console.log(MarkerList);
        return (
          <Row>
            <Col xs={6} style={{height: '500px'}}>
              <GoogleMap
                 bootstrapURLKeys={{
                   key: 'AIzaSyCWK6ZJN_I1B7yR_WvOh9jmK8KU-LOA1IA',
                   language: 'ru'
                  }}
                 defaultCenter={this.props.center}
                 defaultZoom={this.props.zoom}>
                {MarkerList}
              </GoogleMap>
            </Col>
            <Col xs={6}>
              <OrderCreateForm onHandleMarker={this.handleMarker.bind(this)}/>
            </Col>
          </Row>
        )
    }
}


export default Root;
