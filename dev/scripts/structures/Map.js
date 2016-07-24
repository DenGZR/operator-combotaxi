/**
 * Created by gasya on 20.04.16.
 * DigitalOutlooks corporation.
 */
import {Point} from './Point'

export class Map {
    constructor(maxMarkerCount = 20) {
        const self = this;

        const latitude = 48.45;
        const longitude = 35.05;
        const zoom = 16;
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoom,
            center: new google.maps.LatLng(latitude, longitude)
        });
        const geocoder = new google.maps.Geocoder();

        this._map = map;
        this._markers = [];
        this._markersCount = maxMarkerCount;

        window.geocoder = geocoder;
        for (let i = 0; i < this._markersCount; i++) {
            const marker = new google.maps.Marker({
                position: new Point().toLatLng(),
                map: null,
                draggable: true,
                label: (i + 1).toString()
            });

            google.maps.event.addListener(marker, 'dragend', function (event) {
                const lat = event.latLng.lat();
                const lng = event.latLng.lng();

                if (self.onMarkerDrag)
                    self.onMarkerDrag(this.id, new Point(lat, lng));
            });

            this._markers.push(marker);
        }

        google.maps.event.addListener(this._map, 'click', (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();

            if (self.onMarkerAdd)
                self.onMarkerAdd(new Point(lat, lng));
        });
    }

    setPoints(points) {
        points.forEach((point, i)=> {
            if (i < this._markersCount) {
                this._markers[i].setPosition(point.toLatLng());
                this._markers[i].setLabel(point.id.toString());
                this._markers[i].id = point.id;
                if (!this._markers[i].map)
                    this._markers[i].setMap(this._map);
            }
        });
        for (let i = points.length; i < this._markersCount; i++) {
            this._markers[i].setMap(null);
        }
    }

    centerToPoint(/*Point*/ point) {
        const latLng = point.toLatLng();
        this._map.panTo(latLng);
    }
}

