export const radioButtonsSettingPrice = [
    { option: "Своя", key: "CUSTOM", value: 'CUSTOM' },
    { option: "Рекоменд", key: "Recomend", value: 'RECOMMENDED' },
    { option: "Не менять", key: "Default", value: "NOT_CHANGE" },
];


export const radioButtonsPromotion = [
    { option: "Оставить цену из акции", key: "promotion", value: 0 },
    { option: "Установить цену до акции", key: "befor_promotion", value: 1 },
    { option: "Вернуться к стратегии следования", key: "following_strategy", value: 2 }
]

export const radioButtonsStrategy = [
    { option: "Мин", key: "MIN", value: 'MIN' },
    { option: "Сред", key: "MEDIUM", value: 'MEDIUM' },
    { option: "Mакс", key: "MAX", value: 'MAX' },
];


export const columnsAutomat = [
    { title: "Использовать", id: 'use' },
    { title: 'Фото', id: 'photo' },
    { title: "Артикул", id: 'art' },
    { title: "Цена продажи до вычета СПП", id: 'cost' },
    { title: "Себе-стоимость", id: 'main' },
    { title: "Маржа (мин), руб", id: 'min' },
    { title: "Маржа (макc), руб", id: 'max' },
    { title: "Стратегии", id: 'strategy' },
    { title: "Выбранные стратегии", id: 'selectedStrategies' }
]

export const columnsSemiAutomat = [
    { title: 'Фото', id: 'photo' },
    { title: "Артикул", id: 'art' },
    { title: "Цена продажи до вычета СПП", id: 'cost' },
    { title: "Себе-стоимость", id: 'main' },
    { title: "Маржа (мин), руб", id: 'min' },
    { title: "Маржа (макс), руб", id: 'max' },
    { title: 'Рекоменду-емая цена', id: 'recommend' },
    { title: 'Своя цена', id: 'custom' },
    { title: 'Установка цены',id:'settingPrice'},
    { title: "Стратегия", id: 'strategy' },
    { title: "Выбранные стратегии", id: 'selectedStrategies' }, 
]
