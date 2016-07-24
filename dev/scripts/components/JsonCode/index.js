/**
 * Created by gasya on 20.04.16.
 * DigitalOutlooks corporation.
 */
import React from 'react'
import Highlight from 'react-highlight'

export const JsonCode = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <Highlight className='json'>
                {JSON.stringify(props.children, null, 4)}
            </Highlight>
        </div>
    )
};