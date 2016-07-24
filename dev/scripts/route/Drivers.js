import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {Table, Field} from "../components/Table"
import {User} from "../components/User"
import {Driver, DriverCollection} from '../models/Driver'
// components
import {StatusSelect} from "../components/StatusSelect"
import {BtnToAddCache, PopupAddCacheToDriver} from "../components/PopupAddCacheToDriver"
import {BtnToDriverDescription, PopupDriverDescription} from "../components/PopupDriverDescription"
//api
import {Waypoints} from "../components/Waypoints"
import {makeRequest, Endpoints} from '../utils/api'

// обьект из которого строится <StatusSelect/>
const status = {
    "all": "Все",
    "new": "Ожидает одобрения",
    "suspended": "Заблокированный"
};

class DriversPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          drivers: [],
          statuses: '',
          showDriverDescription: false,
          showPopupAddCache: false,
          currentDriver: null
        };
        this.mainTableFields = [
            new Field("Водитель", (/*Driver*/ driver) => <User>{driver}</User>, 20),
            new Field("Сервис такси", (/*Driver*/ driver) => <span>{driver.taxiService}</span>, 20),
            new Field("Статус", (/*Driver*/ driver) => <span>{driver.statusName}</span>, 20),
            new Field("Состояние", (/*Driver*/ driver) => <span>{driver.state}</span>, 10),
            new Field("Подробнее", (/*Driver*/ driver) => <Link to={`/drivers/${driver.id}`}>Подробнее</Link>, 10),
            new Field("Пополнить", (/*Driver*/ driver) => <BtnToAddCache currentDriver={driver} togglePopup={this.togglePopup.bind(this)}/>, 20)
        ];

    }

    loadData( endpoints ) {
        endpoints = endpoints || Endpoints.GET_DRIVER_LIST();
        console.log(endpoints);
        makeRequest(endpoints)
            .then(response=> {
                console.log(response.data.data);
                this.setState({
                    drivers: response.data.data
                })
            })
    }

    componentDidMount() {
        this.loadData();
    }

    statusSelected(status) {
      console.log('status', status);
      let endpoints = this.getEndpointsOfStatus(status);
      this.loadData(endpoints);
      this.setState({ statuses: status });

    }
// пеобразуем statuses в url для запроса
    getEndpointsOfStatus(stat) {
      switch (stat) {
        case "new":
          return Endpoints.GET_INACTIVE_DRIVERS();
          break
        case "suspended":
          return Endpoints.GET_DRIVERS_SUSPENDED();
          break
        default:
          return Endpoints.GET_DRIVER_LIST();
      }
    }
// показываем - прячем popup
    togglePopup(action_type,driver = {}) {
      let state = {};
      let togglePopupState;

      togglePopupState = !this.state[action_type];
      state[action_type] = togglePopupState;
      state['currentDriver'] = driver;
      this.setState(state);
      console.log('Fun togglePopup', action_type);
      console.log('togglePopupState ', togglePopupState );
    }
// запрос на сервер для пополнения счета
    makeRequestToAddCache( driverId, amount ) {
      //console.log("makeRequest");
      makeRequest(Endpoints.GET_DRIVER_ADD_CACHE( driverId, amount ))
         .then(response=>console.log('Server response :', response))
         .catch(error=>console.log('Server response Error :', error));
    }

    render() {
        const drivers = DriverCollection.fromArray(this.state.drivers).toArray();
        let showDriverList = !(this.state.showDriverDescription || this.state.showPopupAddCache) ? "" : "hide";
        console.log('showDriverList',showDriverList);
        return (
            <div>
              <PopupAddCacheToDriver
                showPopup={this.state.showPopupAddCache}
                togglePopup={this.togglePopup.bind(this)}
                dataDriver={this.state.currentDriver}
                makeRequestCache={this.makeRequestToAddCache.bind(this)}/>
              <div className={"driver-list-container " + showDriverList }>
                <StatusSelect
                  statuses={status}
                  activeStatuses={this.state.statuses}
                  onSelect={this.statusSelected.bind(this)}/>
                <Table
                  showTable={true}
                  style={Styles.driversTable}
                  data={drivers}
                  fields={this.mainTableFields}/>
              </div>
            </div>
        );
    }
}


const Styles = {
    driversTable: {
        height: "900px",
        marginTop: "30px"
    }
};

export default DriversPage;
