/**
 * Created by gasya on 14.04.16.
 * DigitalOutlooks corporation.
 */
import moment from 'moment'
import {statusName} from '../dicts/statuses'

export class DriverCollection {
    constructor(/*Map<Driver>*/ mapOfDrivers = null) {
        this._mapOfDrivers = mapOfDrivers;
        this.toArray = this.toArray.bind(this);
    }

    get(id) {
        return this._mapOfDrivers.get(id);
    }

    /**
     * Статический конструктор коллекции водителей
     * @param drivers массив plain объектов водителей
     * @returns {DriverCollection}
     */
    static fromArray(/*Array<Object>*/ drivers) {
        const /*Map<Order>*/ mapOfDrivers = new Map();
        drivers.forEach((driverObj, i) => {
            const /*Driver*/ driver = new Driver(driverObj);
            mapOfDrivers.set(driver.id, driver);
        });
        return new DriverCollection(mapOfDrivers);
    }

    /**
     *
     * @param ids
     * @returns {Array.<*>}
     */
    toArray(/*Array*/ ids = null) {

        if (ids == null) {
            const result = [];
            this._mapOfDrivers.forEach((driver)=> {
                if (driver)
                    result.push(driver);
            });
            return result;
        } else {
            return ids
                .map(id=>this.get(id))
                .filter(driver=>!!driver);
        }
    }
}
// от сервера приходит обьект
//Amount:0
//Bonus:0
//CarNumber:""
//CurrentOrderId:0
//FirstName:"Olexii"
//Fuel:0
//Id:10
//LastLat:48.4591
//LastLng:35.0408
//LastName:""
//LastSeen:"2016-06-17T13:53:30+02:00"
//Login:"380968040999"
//MiddleName:""
//State:"online"
//Status:"new"
let setDefVal = (object) => {
 let def = {};
 for (var key in object) {
   if (object.hasOwnProperty(key)) {
     def[key] = !object[key] || object[key] === "" ? "--" : object[key];
   }
 }
 return def;
}
// полученые обьект с данными передаю в конструктор Driver
export class Driver {
    constructor(driver) {
         this._driver = setDefVal(driver);

    }
    get id() {
        return this._driver.Id;
    }

    get status() {
        return this._driver.Status;
    }

    get state() {
        return this._driver.State;
    }

    get name() {
        return this._driver.FirstName;
    }

    get phone() {
        return this._driver.Login;
    }

    get taxiService() {
        return this._driver.TaxiService;
    }

    get tariff() {
        return this._driver.tariff;
    }

    //Full info
    get firstName() {
        return this._driver.FirstName;
    }

    get lastName() {
        return this._driver.LastName;
    }

    get middleName() {
        return this._driver.MiddleName;
    }

    get sex() {
        return this._driver.Gender;
    }

    get birthDate() {
        return moment(this._driver.Birthday);
    }

    get address() {
        return this._driver.Address;
    }

    get photo() {
        return 'http://image.combotaxi.com/face/small_'+ this._driver.Id +'.jpg';
    }

    get PMT() {
        return this._driver.Inn;
    }

    get passport() {
        return this._driver.Passport;
    }

    get carBrand() {
        return this._driver.CarBrand;
    }

    get carModel() {
        return this._driver.CarModel;
    }

    get carMark() {
        return this._driver.CarMark;
    }

    get carColor() {
        return this._driver.CarColor;
    }

    get carType() {
        return this._driver.CarType;
    }

    get carYear() {
        return this._driver.CarYear;
    }

    get carNumber() {
        return this._driver.CarNumber;
    }

    get carSeats() {
        return this._driver.CarSeats;
    }

    get carPhoto() {
        return 'http://image.combotaxi.com/car/small_'+ this._driver.Id +'.jpg';
    }

    //Evaluated
    get statusName() {
        return statusName(this._driver.Status);
    }
}
