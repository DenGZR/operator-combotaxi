import ajax from 'axios'
import * as _Endpoints from './endpoints'
import {Authorisation} from "./Authorisation"
export {_Endpoints as Endpoints}
import { networkManager } from '../utils/service'

const ROOT = 'https://api.psyco.com.ua';

const config = {
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
};

export const makeRequest = ({path, method}, userData = undefined) => {
    let token;
    let netWorkManager = new networkManager();
    if ( token = Authorisation.getToken()) {
        config.headers['Authorization-Token'] = token;
    }
    return ajax({
        method: method,
        headers: config.headers,
        url: `${ROOT}${path}`,
        data: userData
    })
    .then(response=>{
      console.log('Server response :', {...response, netWorkManager});
      netWorkManager.newResponse(response);
      return {...response, netWorkManager}
    })
};

let timeStamp = 0;

export const loadOrder = () => { 

    return makeRequest(_Endpoints.GET_ORDER_LIST_NEW(timeStamp))
        .then(response=> {
            let {time_stamp} = response.data;
            timeStamp = time_stamp;
            console.log(timeStamp);
            return response;
        })
}
