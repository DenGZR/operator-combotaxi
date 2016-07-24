/**
 * Created by gasya on 20.04.16.
 * DigitalOutlooks corporation.
 */
export class Point {
    constructor(lat = 0, lng = 0, placeName = null) {
        this._data = {lat, lng};
        if (placeName) {
            this._placeName = placeName;
            this._placeNameActual = true;
        } else {
            this._placeName = "";
            this._placeNameActual = false;
        }
    }


    static createFromData(data) {
        const p = new Point();
        p._data = data;
        return p;
    }

    get placeName() {
        if (this._placeNameActual) {
            this.fillPlaceName();
        }
        return this._placeName;
    }

    get lat() {
        return this._data.lat;
    }

    get lng() {
        return this._data.lng;
    }

    get title() {
        return this._data.title;
    }

    get addrString() {
        return this._data.addr_string;
    }

    get postalCode() {
        return this._data.postal_code;
    }

    get country() {
        return this._data.country;
    }

    get state() {
        return this._data.state;
    }

    get city() {
        return this._data.city;
    }

    get street() {
        return this._data.street;
    }

    get district() {
        return this._data.district;
    }

    get building() {
        return this._data.building;
    }

    get id() {
        return this._data.id;
    }

    set id(value) {
        this._data.id = value;
    }

    toLatLng() {
        return {
            lat: this.lat,
            lng: this.lng
        }
    }

    prepare() {
        return {
            lat: this._data.lat,
            lng: this._data.lng,
            addr_string: this.placeName
        }
    }


    isEmpty() {
        return (this._data.lat == 0 && this._data.lng == 0)
    }

    fillPlaceName() {
        if (this._placeNameActual) {
            return Promise.resolve(this._placeName);
        }
        if (!this.isEmpty()) {
            const fetchPromise = Point.fetchPlaceName(this);
            fetchPromise
                .then((place) => {
                    console.log(place);
                    this._placeName = place.formatted_address;
                    this._placeNameActual = true;
                })
                .catch((error) => {
                    console.error(error);
                });
            return fetchPromise;
        } else {
            return Promise.resolve("");
        }
    }

    static fetchPlaceName(/*Point*/ point) {
        return new Promise((resolve, reject) => {
            window.geocoder.geocode({location: point.toLatLng()}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        resolve(results[0]);
                    } else {
                        reject(Error("No place found"));
                    }
                } else {
                    reject(Error(`Geocoding fault, status: ${status}`));
                }
            });
        })
    }
}