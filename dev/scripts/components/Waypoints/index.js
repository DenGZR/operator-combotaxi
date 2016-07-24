/**
 * Created by gasya on 14.04.16.
 * DigitalOutlooks corporation.
 */
import React from 'react'

export const Waypoints = (props) => {
    const waypoints = props.children;
    return (
        <ol>
            { waypoints.map((point, i)=><li key={i}>{point.addrString}</li>)}
        </ol>
    );
};