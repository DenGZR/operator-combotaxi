
const statusNames = {
    "new": "Ожидает одобрения",
    "active": "Активный",
    "accepted": "Принимает заказ",
    "suspended": "Заблокированный",
    "closed": "Завершенный"
};

const _statuses = [];
for (var status in statusNames) {
    if (statusNames.hasOwnProperty(status))
        _statuses.push(status);
}

export {_statuses as statuses};

export const statusName = (status) => {
    return statusNames[status] || `Неизвестный (${status})`;
};
