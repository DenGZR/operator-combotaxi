/**
 * Created by gasya on 15.04.16.
 * DigitalOutlooks corporation.
 */
import React from 'react'


export const StatusSelect = (props) => {

  let statuses = Object.keys(props.statuses);

  console.log(status);

    return (
        <div className="btn-group box">
          {statuses.map((status, i) =>
              <button className={`btn btn-${(props.activeStatuses.indexOf(status) != -1) ? "success" : "default"}`}
                      key={i}
                      onClick={props.onSelect.bind(null, status)}>
                  {props.statuses[status]}
              </button>)
          }
        </div>
    );
};
