import React, {Component} from 'react'
import {Grid, Row, Col, Panel, Button } from 'react-bootstrap'
import {Table, Field} from '../Table'
import {Link} from 'react-router'

const orderToTableAdapter = (/*Order*/ data) => {
    return ([
            {key: "Откуда ", value: data.startPoint.addrString},
            {key: "Куда ", value: data.endPoint.addrString},
            {key: "Кол-во пасажиров", value: data.passengerCount},
            {key: "Коментарии клиента", value: data.clientComment},
            {key: "Дополнительные услуги", value: data.tariffAddons},
            {key: "Стоимость  ", value: data.calulatedPrice}
        ]);
};
const carToTableAdapter = (/*Car*/ data) => {
    return ([
            {key: "Марка", value: data.carBrand},
            {key: "Модель", value: data.carModel},
            {key: "Цвет", value: data.carColor},
            {key: "Номер ", value: data.carNumber}
        ]);
};
const dataToTableAdapter = (/*Driver*/ data) => {
    return ([
            {key: "ID", value: data.id},
            {key: "Фамилия", value: data.last_name},
            {key: "Имя", value: data.first_name},
            {key: "Отчество", value: data.middle_name},
            {key: "Пол", value: data.gender},
            {key: "Телефон ", value: data.phone}
        ]);
};

const keyValueFields = [
    new Field("Параметр", i=><p>{i.key}</p>, 10),
    new Field("Значение", i=><p style={{textAlign: "right"}}>{i.value}</p>, 10)
];

const HeaderPanel = (Id,handleCancel) => {
  let HeaderPanelStyle = {

  }
  return (
    <div className="header-panel">
      <span>Заказ № : {Id}</span>
      <Button bsStyle="danger" onClick={handleCancel}>X</Button>
    </div>
  )
}

export const BtnOrderDescription = (props) => {

  let order = props.order;

  let handleClick = (e) => {
    props.togglePopup(order);
  }
    return (<Button bsStyle="primary" onClick={handleClick}>{order.id}</Button>);
};

export class PopupOrderDescription extends Component {
    constructor(props) {
          super(props);
    }

    handleClickCancel (e) {
      e.preventDefault();
      this.props.togglePopup();
      console.log("Cancel");
    }
    //onChangeOrderStatus
    handleChangeStatus (e) {
      e.preventDefault();
      let order = this.props.order;
      let statusType = e.target.getAttribute('name');
      this.props.onChangeOrderStatus(statusType,order.id);
      console.log("statusType", statusType);
    }

    render() {

      let order = this.props.order;
      if(!this.props.showPopup) {
        return <div className="hide"></div>
      }
      
      let client = dataToTableAdapter(order.clientInfo);
      let driver = dataToTableAdapter(order.driverInfo);
      let car = carToTableAdapter(order.carInfo);
      let orderData = orderToTableAdapter(order);
      let toggleShowPopup = this.props.showPopup ? "" : "hide";

      return (
        <Row className={"order-description-popup" + toggleShowPopup}>
          <Col xs={10} xsOffset={1}>
            <Panel header={HeaderPanel(order.id,this.handleClickCancel.bind(this))}>
              <Row>
                <Col xs={8}>
                  <span>Заказ</span>
                  <Table
                      showTable={true}
                      withoutHeader={true}
                      style={{}}
                      data={orderData}
                      fields={keyValueFields}/>
                </Col>
                <Col xs={4} >
                  <div className="set-btn">
                    <Button bsStyle="primary"><Link to={`/activity_map/${order.id}`}>Назничить водителя</Link></Button>
                    <Button bsStyle="primary" name="cancel" onClick={this.handleChangeStatus.bind(this)}>Отменить заказ</Button>
                    <Button bsStyle="primary" name="complete" onClick={this.handleChangeStatus.bind(this)}>Завершить заказ</Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={4} >
                  <span>Клиент</span>
                  <Table
                      showTable={true}
                      withoutHeader={true}
                      style={{}}
                      data={client}
                      fields={keyValueFields}/>
                </Col>
                <Col xs={4}>
                  <span>Водилель</span>
                  <Table
                      showTable={true}
                      withoutHeader={true}
                      style={{}}
                      data={driver}
                      fields={keyValueFields}/>
                </Col>
                <Col xs={4}>
                  <span>Машина</span>
                  <Table
                      showTable={true}
                      withoutHeader={true}
                      style={{}}
                      data={car}
                      fields={keyValueFields}/>
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
      );
    }
}

const Styles = {
    container: {
        width: "800px",
        margin: "auto"
    },
    imageWrapper: {
        width: "385px",
        height: "300px"
    },
    image: {
        width: "100%"
    },
    left: {
        width: "50%",
        float: "left",
        padding: "15px 0px 0px 15px",
    },
    right: {
        width: "50%",
        float: "right",
        padding: "15px 15px 0px 15px",
    },
    clearfix: {
        clear: "both"
    }
};

// <Row>
//   <Col xs={5} xsOffset={1}>
//     <ul className="list-group">
//       <li className="list-group-item">{'Откуда :  ' + order.startPoint.addrString}</li>
//       <li className="list-group-item">{'Куда :  ' + order.endPoint.addrString}</li>
//       <li className="list-group-item">{'Кол-во пасажиров :  ' + order.passengerCount}</li>
//       <li className="list-group-item">{'Коментарии клиента :  ' + order.clientComment}</li>
//       <li className="list-group-item">Дополнительные услуги :  { order.tariffAddons ? "--" : "--" }</li>
//       <li className="list-group-item">{'Стоимость :  ' + order.calulatedPrice}</li>
//     </ul>
//   </Col>
//   <Col xs={5}>
//     <ul className="list-group">
//       <li className="list-group-item">Машина</li>
//       <li className="list-group-item">{'Марка :  ' + car.carBrand}</li>
//       <li className="list-group-item">{'Модель :  ' + car.carModel}</li>
//       <li className="list-group-item">{'Цвет :  ' + car.carColor}</li>
//       <li className="list-group-item">{'Номер :  ' + car.carNumber}</li>
//     </ul>
//   </Col>
// </Row>
