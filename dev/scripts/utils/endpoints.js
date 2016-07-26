/**
 * Created by gasya on 19.04.16.
 * DigitalOutlooks corporation.
 */

export const GET_TARIFF_ADDONS = () => ({path: `/api/client/tariff/list_addons`, method: "GET"});
export const GET_CURRENT_TARIFF = () => ({path: `/api/client/tariff/getcurrent`, method: "GET"});
export const GET_AUTH_TOKEN = () => ({path: `/api/operator/login`, method: "POST"});
export const REMOVE_AUTH_TOKEN = () => ({path: `/api/operator/logout`, method: "GET"});
export const GET_ORDER_LIST = () => ({path: `/api/operator/orders/list`, method: "GET"});
// получить список измененых заказов по  time_stamp
export const GET_ORDER_LIST_NEW = (time_stamp) => ({path: `/api/operator/orders/list?status=new` + (time_stamp ? "&time_stamp="+time_stamp : ""), method: "GET"});

export const GET_DRIVER_LIST = () => ({path: `/api/operator/drivers/list`, method: "GET"});
export const GET_DRIVER_INFO = () => ({path: `/api/driver/getinfo`, method: "GET"});
export const GET_DRIVER_DESCRIPTION = ( driver_id ) => ({path: `/api/operator/driver/id/` + driver_id, method: "GET"});
// отправка-создание нового заказа
export const POST_CREATE_ORDER = () => ({path: `/api/operator/orders/new`, method: "POST"});
// закрываем заказ как выполненный  -  api/operator/orders/complete
export const POST_ORDER_COMPLETE = () => ({path: `/api/operator/orders/complete`, method: "POST"});
// отменяем заказ  -  /api/operator/orders/cancel
export const POST_ORDER_CANCEL = () => ({path: `/api/operator/orders/cancel`, method: "POST"});
// Ожидает одобрения
export const GET_INACTIVE_DRIVERS = () => ({path: `/api/operator/drivers/list/new`, method: "GET"});
// Заблокированный
export const GET_DRIVERS_SUSPENDED = () => ({path: `/api/operator/drivers/list/suspended`, method: "GET"});

// активирует водителя
export const GET_DRIVER_ACTIVATE = (driver_id) => ({path: `/api/operator/drivers/activate/?driver=`+driver_id , method: "GET"});
// блокирует водителя
export const GET_DRIVER_SUSPEND = (driver_id) => ({path: `/api/operator/drivers/suspend/?driver=`+driver_id , method: "GET"});
// пополняем счет водителя
// /api/operator/drivers/balance/add?driver=%driver_id%&amount=%amount%
export const GET_DRIVER_ADD_CACHE = ( driver_id, amount ) => ({path: `/api/operator/drivers/balance/add?driver=` + driver_id + `&amount=` + amount , method: "GET"});
// назначить водителя на заказ
export const POST_DRIVER_TO_ORDER = () => ({path: `/api/operator/orders/to_driver` , method: "POST"});
