import React from 'react'

//table-bordered
export class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {        
        const props = this.props;
        const toggleShowTable = this.props.showTable ? "" : "hide";
        return (
          <div className={"table-responsive " + toggleShowTable}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  { props.fields.map((field, i) => <th key={i}>{field.title}</th>) }
                </tr>
              </thead>
              <tbody>
                { props.data.map((dataItem, i)=><TableItem key={i} data={dataItem} fields={props.fields}/>) }
              </tbody>
            </table>
          </div>
        );
    }
}


export class Field {
    constructor(title, render, width) {
        if (typeof render != "function") throw new TypeError("render should be a function");
        if (typeof title != "string") throw new TypeError("title should be a string");
        if (typeof width != "number") throw new TypeError("width should be a number");
        this.title = title;
        this._width = width;
        this.render = render;
    }

    get width() {
        return this._width + "%";
    }
}

export const TableItem = (props) => {

    return (
        <tr key={props.key}>
            {
                props.fields.map((field, i) => {

                    return (
                        <td key={i} >
                            {
                                field.render(props.data)
                            }
                        </td>
                    );
                })
            }
        </tr>
    );
};
