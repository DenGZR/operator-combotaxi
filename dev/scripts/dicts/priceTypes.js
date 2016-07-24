
const priceTypes = {
    "per_distance": "грн/км",
    "per_hour": "грн/час",
    "fixed": "грн",
};


export const priceTypeName = (type) => {
    return priceTypes[type] || `Неизвестный (${type})`;
};
