//{BtnToDriverDescription, PopupDriverDescription}

import React, {Component} from 'react'
import {Grid, Row, Col, Panel, Button, FormGroup, InputGroup, FormControl, DropdownButton, MenuItem  } from 'react-bootstrap'
import {Table, Field} from '../components/Table'
import {Link} from 'react-router'

import {Driver, DriverCollection} from '../models/Driver'
import {Waypoints} from "../components/Waypoints"
import {makeRequest, Endpoints} from '../utils/api'

const HeaderPanel = (Id) => {
  let HeaderPanelStyle = {

  }
  return (
    <div className="header-panel">
      <span>Водитель ID : {Id}</span>
      <Link to={`/drivers`} className="btn btn-danger btn-cancel">x</Link>
    </div>
  )
}

const driverToTableAdapter = (/*Driver*/ driver) => {
    return {
        driver: [
            {key: "Фамилия", value: driver.lastName},
            {key: "Имя", value: driver.firstName},
            {key: "Отчество", value: driver.middleName},
            {key: "Пол", value: driver.sex},
            {key: "Дата рождения", value: driver.birthDate.format("DD.MM.YYYY")},
            {key: "Телефон", value: driver.phone},
            {key: "Адрес", value: driver.address},
            {key: "ИНН", value: driver.PMT},
            {key: "Паспорт", value: driver.passport},
        ],
        car: [
            {key: "Марка", value: driver.carBrand},
            {key: "Модель", value: driver.carModel},
            {key: "Цвет", value: driver.carColor},
            {key: "Тип", value: driver.carType},
            {key: "Год выпуска", value: driver.carYear},
            {key: "Номер", value: driver.carNumber}
        ]
    }
};

const keyValueFields = [
    new Field("Параметр", i=><p>{i.key}</p>, 10),
    new Field("Значение", i=><p style={{textAlign: "right"}}>{i.value}</p>, 10)
];

const statuses = ["active", "blocked", "waiting"];
const statusNames = {"active": "Активен", "blocked": "Заблокирован", "waiting": "Ожидает подтверждения"};
const statusName = (status) => (statusNames[status] || `Неизвестный ${status}`);

const tariffs = ["once", "month"];
const tariffNames = {"once": "Один раз", "month": "Месяц"};
const tariffName = (tariff) => (tariffNames[tariff] || `Неизвестный ${tariff}`);


export default class DriverDescription extends Component {
  constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            tariff: "hourly",
            status: "active",
            driver: null
        };
  }

  handleSave(e) {
        e.preventDefault();
        const {status} = this.state;
        const {driverId} = this.props.params;
        let changeStatus;

        switch (status) {
          case "active":
            console.log("driver active");
            changeStatus = makeRequest(Endpoints.GET_DRIVER_ACTIVATE(driverId));
          break;
          case "blocked":
           console.log("driver blocked");
           changeStatus = makeRequest(Endpoints.GET_DRIVER_SUSPEND(driverId));
          break;
          case "waiting":
           console.log("driver waiting");
           console.log("нет api");
           //changeStatus = makeRequest(Endpoints.GET__DRIVER_ACTIVATE(driverId));
          break;
        }
      changeStatus.then(response => {
          console.log(response);
      })
      .catch(response => {
        console.log(response);
      });
    }

    handleChange(e) {
      debugger
        this.setState({
            [e.target.name]: e.target.value
        })
    }

  componentDidMount() {
    let {driverId} = this.props.params;
    console.log(driverId);
    this.loadData(Endpoints.GET_DRIVER_DESCRIPTION(driverId));
  }


  loadData( endpoints ) {
      endpoints = endpoints || Endpoints.GET_DRIVER_LIST();
      console.log(endpoints);
      makeRequest(endpoints)
          .then(response=> {
              console.log("response",response.data.data);
              console.log("Driver",new Driver(response.data.data));
              this.setState({
                  driver: new Driver(response.data.data)
              })
          })
  }

  render() {
    let {driverId} = this.props.params;
    console.log(driverId);
    let { driver } = this.state;
    console.log(driver);
    if( !driver ) {
      return <div className="hide"></div>
    }
    const data = driverToTableAdapter(driver);
    const { tariff, status } = this.state;

    // console.log(data.driver);
    // console.log(data.car);
    return (
      <Row className="driver-description">
        <Col xs={10} xsOffset={1}>
          <Panel header={HeaderPanel(driverId)}>
            <Row className="driver-form">
              <Col xs={10} xsOffset={1}>
                <form className="form-horizontal" onSubmit={this.handleSave}>
                  <FormGroup>
                    <InputGroup>
                      <InputGroup.Addon>Статус</InputGroup.Addon>
                      <FormControl componentClass="select" placeholder="select" name="status" onChange={this.handleChange}>
                        {statuses.map((status, i)=><option value={status} key={i}>{statusName(status)}</option>)}
                      </FormControl>
                    </InputGroup>
                    <InputGroup>
                      <InputGroup.Addon>Тариф</InputGroup.Addon>
                      <FormControl componentClass="select" placeholder="select" name="tariff" onChange={this.handleChange}>
                        {tariffs.map((tariff, i)=><option value={tariff} key={i}>{tariffName(tariff)}</option>)}
                      </FormControl>
                    </InputGroup>
                    <Button bsStyle="primary" type="submit">Сохранить</Button>
                  </FormGroup>
                </form>
              </Col>
            </Row>
            <Row className="driver-info">
              <Col xs={4} >
                <img
                   src={driver.photo}
                   alt="Водитель"/>
              </Col>
              <Col xs={6}>
                <Table withoutHeader={true}
                  style={{}}
                  showTable={true}
                  data={data.driver}
                  fields={keyValueFields}/>
              </Col>
            </Row>
            <Row className="driver-car">
              <Col xs={4} >
                <img
                   src={driver.carPhoto}
                   alt="Машина"/>
              </Col>
              <Col xs={6}>
                <Table withoutHeader={true}
                    showTable={true}
                    data={data.car}
                    fields={keyValueFields}/>
              </Col>
            </Row>
          </Panel>
        </Col>
      </Row>
    );
  }
};
