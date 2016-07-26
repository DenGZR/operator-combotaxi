import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {Table, Field} from "../components/Table"
import {DateTime} from "../components/DateTime"
import {StatusTimer} from "../components/StatusTimer"
import {StatusSelect} from "../components/StatusSelect"
import {PopupOrderDescription, BtnOrderDescription} from "../components/PopupOrderDescription"
import {User} from "../components/User"
import {Waypoints} from "../components/Waypoints"
import {makeRequest, Endpoints, loadOrder} from "../utils/api"
import {Order, OrderCollection} from "../models/Order"


class OperatorStrip extends Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.togglePopup = this.togglePopup.bind(this);

        this.state = {
            orders: null,
            showPopup: false,
            currentOrder: null,
            filters: {
                statuses: []
            },
            myOperatorId: 1
        };

        this.mainTableFields = [
            new Field("Создан",
                (/*Order*/order) => <DateTime>{order.createdAt}</DateTime>, 10),
            new Field("Желаемое время",
                (/*Order*/order) => <DateTime>{order.scheduledAt}</DateTime>, 10),
            new Field("Заказ",
                (/*Order*/order) => <BtnOrderDescription order={order} togglePopup={this.togglePopup} />, 10),
            new Field("Статус",
                (/*Order*/order) => <span>{order.statusName}</span>, 10),
            new Field("Без ответа",
                (/*Order*/order) => <StatusTimer order={order}/>, 10),
            new Field("Путь",
                (/*Order*/order) => <Waypoints>{order.waypoints}</Waypoints>, 15),
            new Field("Стоимость",
                (/*Order*/order) => <span>{order.price}</span>, 10),
            new Field("Клиент",
                (/*Order*/order) => <User>{order.client}</User>, 10),
            // new Field("Водитель",
            //     (/*Order*/order) => <User>{order.driver}</User>, 10),
            new Field("Комментарий",
                (/*Order*/order) => <p>{order.operatorComment}</p>, 10)
        ];
    }


    loadData() {
      loadOrder()
            .then(response=> {
              debugger
                let {orders} = this.state.orders;
                console.log(this.state.orders._mapOfOrders);
                let newOrder = OrderCollection.fromServer(response.data).getFreeOrders();
                orders = Object.assign({},orders,newOrder);
                //orders = { ...orders, ...newOrder }
                console.log(orders);
                this.setState({ orders })
            })
    }

    // показываем - прячем popup подробности заказа
    togglePopup(order = {}) {
      let togglePopupState = !this.state.showPopup;
      console.log('togglePopupState ', togglePopupState );
      console.log('this order ', order )
      this.setState({
        showPopup: togglePopupState,
        currentOrder: order
      })
    }

    componentDidMount() {
        this.loadData();
        this._autoUpdate = setInterval( () => {
          this.loadData();
        } , 5000);
    }

    componentWillUnmount() {
      //console.log(this._autoUpdate);
        clearInterval(this._autoUpdate);

    }

    changeOrderStatus(newStatusType,order_id) {
      let endpoints;
      let responseData = {
        'order_id' : parseInt(order_id,10),
        'comment' : "operators " + newStatusType
      }
      switch ( newStatusType ) {
          case "cancel":
              console.log("cancel");
              endpoints = Endpoints.POST_ORDER_CANCEL();
              break;
          case "complete":
              console.log("complete");
              endpoints = Endpoints.POST_ORDER_COMPLETE();
              break;
      }
      makeRequest(endpoints, responseData)
      .then(response=>console.log('Server response :', response))
      .catch(error=>console.log('Server response Error :', error));
    }


    render() {

        //const orders = OrderCollection.fromServer(this.state.orders);
        let { orders } = this.state;
        if (!orders) {
          return <h1></h1>
        }
        const orderPull = orders.toArray().sort(byStatusDuration);
        console.log('fromServer', orders);
        console.log('orderPull', orderPull);
        //const ownOrders = orders.getByOperator(this.state.myOperatorId).toArray().sort(byStatusDuration);

        return (
            <div>
                <PopupOrderDescription
                  showPopup={this.state.showPopup}
                  togglePopup={this.togglePopup}
                  order={this.state.currentOrder}
                  onChangeOrderStatus={this.changeOrderStatus}/>
                <Table
                  showTable={!this.state.showPopup}
                  style={Styles.allOrdersTable}
                  data={orderPull}
                  fields={this.mainTableFields}/>
            </div>
        );
    }
}

const byStatusDuration = ((/*Order*/a, /*Order*/b)=> {
    let result = 0;
    if (a.statusDurationPct < b.statusDurationPct || a.id > b.id) {
        result = 1;
    } else if (a.statusDurationPct > b.statusDurationPct || a.id < b.id) {
        result = -1;
    }
    return result;
});


const Styles = {
    allOrdersTable: {
        height: "500px",
        marginTop: "30px"
    },
    ownOrdersTable: {
        height: "350px",
        marginTop: "30px"
    }
};


export default OperatorStrip;
