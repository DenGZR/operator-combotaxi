//  AddCacheToDriver
// popup для пополнения счета водителя
// PopupAddCacheToDriver - окно popup
// BtnToAddCache - кнопка по которой открывается popup

import React, {Component} from 'react'
import { Row, Col, Panel, Button } from 'react-bootstrap'

export const BtnToAddCache = (props) => {

  let handleClick =  (e) => {
    e.preventDefault();
    let driver = props.currentDriver;
    props.togglePopup('showPopupAddCache',driver);
  }

  return (
      <Button bsStyle="primary" onClick={handleClick}> + </Button>
    );
};


export class PopupAddCacheToDriver extends Component {
  constructor(props) {
        super(props);
        this.state = {
            сacheVal : ""
        };
  }

  onChangeCountCache(e) {
    let valCache = e.target.value;
    this.setState({
      сacheVal: valCache
    })
  }

  handleClickCancel (e) {
    e.preventDefault();
    this.props.togglePopup('showPopupAddCache');
    console.log("Cancel");
  }

  handleClickAddCache (e) {
    e.preventDefault();
    console.log("AddCache");
    let valCache = this.state.сacheVal;
    let driverId = this.props.dataDriver.id;
    //console.log('DriverID  : ', driverId, ' valCache : ', valCache);
    this.props.makeRequestCache( driverId, valCache );
    this.props.togglePopup('showPopupAddCache');
  }

  render() {
    if(!this.props.showPopup) {
      return <div className="hide"></div>
    }
    let showPopup = this.props.showPopup ? '' : 'hide';
    let driver = this.props.dataDriver;
    return (
      <Row>
        <Col xs={4} xsOffset={4}>
          <div className="popup-dialog" style={PopupStyle.popupDialog}>
            <div className="popup-content" style={PopupStyle.popupContent}>
              <div className="popup-header">
                <Button bsStyle="danger" style={PopupStyle.btnCancel} onClick={this.handleClickCancel.bind(this)} > х </Button>
                <h4 className="popup-title" style={PopupStyle.headerTitle}>Пополнить счет водителя</h4>
                <p className="popup-driver-info">{"ID : " + driver.id} </p>
                <p className="popup-driver-info">{"Имя : " + driver.firstName} </p>
                <p className="popup-driver-info">{"Фамилия : " + driver.lastName} </p>
                <p className="popup-driver-info">{"Телефон : " + driver.phone} </p>
              </div>
              <div className="popup-body" style={PopupStyle.popupBody}>
                <div className="input-group">
                  <input type="text"
                    className="form-control"
                    placeholder="Сумма пополнения"
                    aria-describedby="basic-addon1"
                    onChange={this.onChangeCountCache.bind(this)}/>
                </div>
              </div>
              <div className="popup-footer" style={PopupStyle.popupFooter}>
                <Button onClick={this.handleClickCancel.bind(this)}>Отмена</Button>
                {" "}
                <Button bsStyle="primary" onClick={this.handleClickAddCache.bind(this)}>Пополнить</Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>


    );
  }

};

const PopupStyle = {

  popupDialog : {
    position: 'relative',
    background: '#fff',
    border: '1px solid #000',
    borderRadius: '5px'
  },
  headerTitle : {
    color: '#000',
    fontSize: '16px',
    margin: '10px 0'
  },
  btnCancel: {
    position: 'absolute',
    top: '5px',
    right: '5px'
  },
  popupContent : {
    padding: '30px'
  },
  popupBody : {
    marginTop: '10px'
  },
  popupFooter : {
    marginTop: '10px',
    textAlign: 'right'
  }
}
