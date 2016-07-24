import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

const PageNotFound  = () => {
  console.log("PageNotFound");

  return(
      <div className="page-not-found" >
        <Row>
          <Col xs={12}>
            <div className="alert alert-danger" role="alert">
              <h1>Страница не найдена!</h1>
              <hr></hr>
              <h4>Введите корректный URL.</h4>
            </div>
          </Col>
        </Row>
      </div>
  );
};

export default PageNotFound;
