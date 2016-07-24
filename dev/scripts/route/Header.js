import React from 'react'
import ReactDOM from 'react-dom'

import {Header} from '../components/Header'

const links = [{
    title: "Заказы",
    href: "/orders"
}, {
    title: "История заказов",
    href: "/history_order"
}, {
    title: "Водители",
    href: "/drivers"
}, {
    title: "Оформить заказ",
    href: "/order_create"
}, {
    title: "Карта активности",
    href: "/activity_map"
}];

const HeaderFactory = React.createFactory(Header);

const createHeader = (path) => {
    return HeaderFactory({
        links: links,
        rightLinks: rightLinks,
        currentPath: path
    })
};

export default createHeader(location.pathname);
