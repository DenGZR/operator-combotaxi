import React from 'react';

const FormAddDriverToOrder = (props) => {

    let handlerMakeRequest = () => {
      let orderID = document.getElementById("orderId").value;
      let driverID = document.getElementById("driverId").value;
      let comments = document.getElementById("comments").value;
      props.onMakeRequest(driverID, orderID, comments);
    }

    return (
        <div className="panel panel-default form-add-driver-to-order">
            <div className="panel-heading">
              <h3 className="panel-title">Назначить водителя на заказ : </h3>
            </div>
            <div className="panel-body">
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon1">ID заказа</span>
              <input type="text"
                value={props.orderId}
                id="orderId"
                className="form-control"
                placeholder="ID заказа ... "
                aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon1">ID водителя</span>
              <input type="text"
                value={props.driverId}
                id="driverId"
                className="form-control"
                placeholder="ID водителя ... "
                aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group">
              <label htmlFor ="comments">Комментарии клиента :</label>
              <textarea className="form-control" rows="5" id="comments" data-input-name="comment" placeholder="Комментарии ..."/>
            </div>
            <div className="input-group">
              <button type="button" className="btn btn-primary" onClick={handlerMakeRequest} >Назначить</button>
            </div>

            </div>
        </div>

    )
};

export default FormAddDriverToOrder;
