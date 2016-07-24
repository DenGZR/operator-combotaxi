import React, {Component} from 'react'
import {Point} from '../../structures/Point'

export class InputPlace extends Component {
    constructor(props) {
        super(props);
        this.setAutocomplete = this.setAutocomplete.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            isFocused: false,
            text: props.point.placeName
        }
    }

    componentDidMount() {
        this.setAutocomplete();
    }

    setAutocomplete() {
        const self = this;
        const input = this._input;
        const autocomplete = new window.google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', function () {
            const place = autocomplete.getPlace();

            if (place.geometry) { //если мы выбрали место из автокомплита, то нам приходит .geometry
                const {geometry} = place;
                self.setState({
                    text: place.formatted_address
                });
                const point = new Point(geometry.location.lat(), geometry.location.lng(), place.formatted_address);
                if (self.props.onChange) {
                    self.props.onChange(point);
                }
            } else if (place.name) {
                // если мы ввели текстом, то нам не приходит .geometry. Тогда пытаемся
                // получить .geometry через геокодер
                self.geocodeAddress(place.name, (place) => {
                    console.log("Geocoding address");
                    if (place) {
                        const {geometry} = place;

                        const point = new Point(geometry.location.lat(), geometry.location.lng(), place.formatted_address);
                        if (self.props.onChange) {
                            self.props.onChange(point);
                        }
                        self.setState({
                            text: place.formatted_address
                        });
                    } else {
                        console.error(Error("Geocoder place wrong"))
                    }
                });
            } else {
                console.error(Error("Autocomplete place wrong"))
            }
        });
    }

    geocodeAddress(address, cb) {
        const g = new google.maps.Geocoder();
        g.geocode({
            address: address
        }, function (data) {
            cb(data[0]);
        })
    }

    handleBlur() {
        this.setState({
            isFocused: false,
            text: this.props.point.placeName
        })
    }

    handleFocus() {
        this.setState({
            isFocused: true,
            text: this.props.point.placeName
        })
    }

    handleChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleDelete(e) {
        //debugger;
        console.log("Handle", e);
        if (this.props.onDelete) {
            this.props.onDelete();
        }

    }

    clicked(e) {
        debugger;
    }

    render() {
        const {point} = this.props;

        var text;
        if (this.state.isFocused) {
            text = this.state.text;
        } else {
            text = point.placeName;
        }

        return (
            <div className="input-group" style={{marginBottom: "15px"}}>
                <input ref={input=>this._input = input}
                       type="text"
                       className="form-control"
                       onChange={this.handleChange}
                       onBlur={this.handleBlur}
                       onFocus={this.handleFocus}
                       value={text}/>
                    <span className="input-group-btn">
                        <a className="btn btn-danger" onClick={this.handleDelete}>&times;</a>
                    </span>
            </div>
        );
    }
}

InputPlace.propTypes = {
    point: React.PropTypes.objectOf(obj=>obj instanceof Point)
};
