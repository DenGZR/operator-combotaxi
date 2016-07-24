import React from 'react'
import moment from 'moment'

const configs = {
    outputDateFormat: "HH:mm DD.MM.YYYY"
};

export const DateTime = (props)=> {
    return (
        <span>
            {moment(props.children).format(configs.outputDateFormat)}
        </span>
    );
};
