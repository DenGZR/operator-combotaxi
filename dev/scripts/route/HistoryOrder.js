import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {Table, Field} from "../components/Table"
import {DateTime} from "../components/DateTime"
import {User} from "../components/User"
import {Waypoints} from "../components/Waypoints"
import {makeRequest, Endpoints} from '../utils/api'
import {Order, OrderCollection} from '../models/Order'

// При выборе в меню вкладки "История заказов" оператору открываются страница со всеми выполненными заказами в пределах службы и простейшая статистика.
// Статистика заключается в Ленточной диаграмме выполненным/невыполненных заказов и общем их количестве.
//
// Информация о заказах подается в виде таблицы со следующими значениями:
// - Время/дата создания
// - № заказа
// - Имя, Фамилия пассажира
// - Позывной водителя
// - Стоимость заказа
// - Финальный статус.

const mainTableFields = [
    new Field("Создан",
        (/*Order*/order) => <DateTime>{order.createdAt}</DateTime>, 20),
    new Field("Заказ",
        (/*Order*/order) => <span>{order.id}</span>, 10),
    new Field("Клиент",
        (/*Order*/order) => <User>{order.client}</User>, 20),
    new Field("Водитель",
        (/*Order*/order) => <User>{order.driver}</User>, 20),
    new Field("Стоимость",
        (/*Order*/order) => <span>{order.price}</span>, 10),
    new Field("Статус",
        (/*Order*/order) => <span>{order.statusName}</span>, 20)
];

class OperatorStrip extends Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.state = {
            orders: []
        };
        this.mainTableFields = mainTableFields;

    }

    loadData() {
        makeRequest(Endpoints.GET_ORDER_LIST())
            .then(response=> {
                console.log('orders',response.data);
                this.setState({
                    orders: response.data
                })
            })
    }

    componentDidMount() {
        this.loadData();
        // this._autoUpdate = setInterval( () => {
        //   this.loadData();
        // } , 5000);
    }

    componentWillUnmount() {
        // clearInterval(this._autoUpdate);
    }


    render() {
        const orders = OrderCollection.fromServer(this.state.orders);
        const orderPull = orders.getСlosedOrders().toArray().sort(byStatusDuration);

        return (
          <Table
            showTable={true}
            data={orderPull}
            fields={this.mainTableFields}
          />

        );
    }
}

const byStatusDuration = ((/*Order*/a, /*Order*/b)=> {
    let result = 0;

    if (a.statusDurationPct < b.statusDurationPct || a.id > b.id) {
        result = -1;
    } else if (a.statusDurationPct > b.statusDurationPct || a.id < b.id) {
        result = 1;
    }
  return result;
});

export default OperatorStrip;
