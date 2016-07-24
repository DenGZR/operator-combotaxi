import React, {Component} from 'react'

const configs = {
    warningPercent: 75,
    dangerPercent: 100,
    warningClass: "warning",
    dangerClass: "danger",
};


const chooseColor = (durationPct) => {
    let result = null;
    if (durationPct > configs.warningPercent) {
        result = configs.warningClass;
    }
    if (durationPct > configs.dangerPercent) {
        result = configs.dangerClass;
    }

    return result;
};

if (!window.globalInterval) {
    window.globalHandlers = [];
    window.globalInterval = setInterval(function () {
        window.globalHandlers.forEach(handler=>handler());
    }, 1000);
}

export class StatusTimer extends Component {
    constructor(props) {
        super(props);
        this.setParentColor = this.setParentColor.bind(this);
        this._updater = this.forceUpdate.bind(this);
        //console.log(this._updater);
    }

    componentDidMount() {
        window.globalHandlers.push(this._updater);
    }

    componentWillUnmount() {
        window.globalHandlers = window.globalHandlers.filter(handler=>handler === this._updater);
        clearInterval(window.globalInterval);
    }

    setParentColor(statusClass) {
        if (this.element) {
            this.element.parentElement.classList.remove(configs.dangerClass);
            this.element.parentElement.classList.remove(configs.warningClass);
            if (statusClass != null) this.element.parentElement.classList.add(statusClass);
        }
    }

    render() {
        const order = this.props.order;

        const color = chooseColor(order.statusDurationPct);

        return (
            <div ref={(i)=>{this.element = i; this.setParentColor(color)}}>
                {order.statusDurationStr}
            </div>
        );
    }
}
