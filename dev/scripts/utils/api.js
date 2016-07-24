import ajax from 'axios'
import * as _Endpoints from './endpoints'
import {Authorisation} from "./Authorisation"
export {_Endpoints as Endpoints}

const ROOT = 'https://api.psyco.com.ua';

const config = {
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
};

export const makeRequest = ({path, method}, userData = undefined) => {
    let token;
    if ( token = Authorisation.getToken()) {
        config.headers['Authorization-Token'] = token;
    }
    return ajax({
        method: method,
        headers: config.headers,
        url: `${ROOT}${path}`,
        data: userData
    });
};
