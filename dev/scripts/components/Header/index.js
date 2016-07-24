import React from 'react'
import {Link} from 'react-router'
import {Grid, Row, Col, Navbar, Nav, NavItem , LinkContainer, Button } from 'react-bootstrap'


const linksData = [{
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
  }, {
    title: "Выйти",
    href: "/logout"
}];

const LinksList = ({data}) => {
  return(
    <ul className="nav navbar-nav">
       {data.map((link,index) => {
         return(
           <li  key={index}>
             <Link to={link.href} activeClassName="active" >{link.title}</Link>
           </li>
         )
       })}
    </ul>
  )
}

export const Header = (props) => {
    let {currentLink} = props;
    let { currentLocation } = props;
    console.log(currentLocation);
    if(currentLocation === '/login') {
      return <div></div>
    }
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Taxi system</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinksList data={linksData}/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
};
