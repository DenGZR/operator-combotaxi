/**
 * Created by gasya on 20.04.16.
 * DigitalOutlooks corporation.
 */
import React from 'react'
import {JsonCode} from '../JsonCode'
export const TariffInfo = (props) => {
    return (
        <div>
            <h1>Тариф</h1>
            <JsonCode>{props.tariff}</JsonCode>
        </div>
    );
};