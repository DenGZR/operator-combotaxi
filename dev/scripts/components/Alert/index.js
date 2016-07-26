/**
 * Created by gasya on 22.04.16.
 * DigitalOutlooks corporation.
 */
import React, {Component} from 'react'

export const TYPE_ERROR = 'danger';
export const TYPE_INFO = 'info';
export const TYPE_WARNING = 'warning';
export const TYPE_SUCCESS = 'success';

const config = {
    defaultType: TYPE_INFO,
    icon: {
        [TYPE_ERROR]: 'fa-ban',
        [TYPE_INFO]: 'fa-info',
        [TYPE_WARNING]: 'fa-warning',
        [TYPE_SUCCESS]: 'fa-check'
    },
    alert: {
        [TYPE_ERROR]: 'alert-danger',
        [TYPE_INFO]: 'alert-info',
        [TYPE_WARNING]: 'alert-warning',
        [TYPE_SUCCESS]: 'alert-success'
    },
    title: {
        [TYPE_ERROR]: 'Ошибка!',
        [TYPE_INFO]: 'Информация',
        [TYPE_WARNING]: 'Предупреждение!',
        [TYPE_SUCCESS]: 'Успех'
    }
};


export class Alert extends Component {

    render() {
        const {children, type = config.defaultType, handleClose = undefined} = this.props;
        const {title = config.title[type]} = this.props;
        if (!children) {
            return null;
        }
        return (
            <div className={`alert ${config.alert[type]} alert-dismissible`}>
                {(handleClose) ?
                    <button type="button" className="close" onClick={handleClose}>×</button>
                    : null}
                <h4><i className={`icon fa ${config.icon[type]}`}/> {title}</h4>
                {children}
            </div>
        );
    }
}

export class AlertPopup extends Component {

    render() {
        const {children, type = config.defaultType, onClose, isOpened } = this.props;
        const {title = config.title[type]} = this.props;
        const isShow = isOpened ? "" : " hide"
        return (
            <div className={`alert ${config.alert[type]} alert-dismissible`+ isShow}>
              <button type="button" className="close" onClick={onClose}>×</button>
              <h4><i className={`icon fa ${config.icon[type]}`}/>{title}</h4>
              {children}
            </div>
        );
    }
}
