import React, { Component, PropTypes } from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
//import Store from '../stores/Store';
//import Actions from '../actions/Actions';

//components
import {Header} from '../components/Header'

class PageLayout extends React.Component {

   constructor(props){
        super(props);
        this.order = {};
   }  

    render() {

        console.log("PageLayout");
        let { location } = this.props;
        return (
            <Row className="page-layout">
              <Col xs={12}>
                <Header currentLocation={location.pathname}/>
              </Col>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
        )
    }
}

PageLayout.contextTypes = {
    router: PropTypes.object.isRequired
};

export default PageLayout;
