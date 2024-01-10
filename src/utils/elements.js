export const radioButtonsSettingPrice1 = [
    { option: "Свою", key: "CUSTOM", value: 'CUSTOM' },
    { option: "Стратегическую", key: "Recomend", value: 'RECOMMENDED' },
    { option: "Останется как есть", key: "Default", value: "NOT_CHANGE" },
];

export const radioButtonsSettingPrice2 = [
    { option: "Своя", key: "CUSTOM", value: 'CUSTOM' },
    { option: "Стратегическая", key: "Recomend", value: 'RECOMMENDED' },
    { option: "Цена останется как есть", key: "Default", value: "NOT_CHANGE" },
];

export const radioButtonsPromotion = [
    { option: "Оставить цену из акции", key: "EQUAL_STOCK", value: 'EQUAL_STOCK' },
    { option: "Установить цену до акции", key: "   BEFORE_STOCK", value: 'BEFORE_STOCK' },
    { option: "Вернуться к стратегии следования", key: " STRATEGY", value: 'STRATEGY' }
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
    { title: "Цена продажи", id: 'cost', tooltip: 'Цена, по которой ваш товар продается в данный момент на сайте Wildberries' },
    { title: "Себестоимость", id: 'main' },
    { title: "Маржа мин ₽", id: 'min', tooltip: 'Маржа (мин) - это самая минимальная сумма, которую вы хотите зарабатывать с продажи товара. Заполняется в рублях.' },
    { title: "Маржа макс ₽", id: 'max', tooltip: 'Маржа (макс) - это самая максимальная сумма, которую вы хотите зарабатывать с продажи товара. Заполняется в рублях.' },
    { title: "Стратегии", id: 'strategy', tooltip: 'Стратегии, по которым будут изменяться цены на ваши товары. Настраиваются индивидуально на каждый SKU.' },
    { title: "Выбранные стратегии", id: 'selectedStrategies', tooltip: 'Стратегии, которые сейчас активны для каждого SKU' }
]

export const columnsSemiAutomat = [
    { title: 'Фото', id: 'photo' },
    { title: "Артикул", id: 'art' },
    { title: "Цена продажи", id: 'cost', tooltip: 'Цена, по которой ваш товар продается в данный момент на сайте Wildberries' },
    { title: "Себе-стоимость", id: 'main' },
    { title: "Маржа мин ₽", id: 'min', tooltip: 'Маржа (мин) - это самая минимальная сумма, которую вы хотите зарабатывать с продажи товара. Заполняется в рублях.' },
    { title: "Маржа макс ₽", id: 'max', tooltip: 'Маржа (макс) - это самая максимальная сумма, которую вы хотите зарабатывать с продажи товара. Заполняется в рублях.' },
    { title: 'Своя цена', id: 'custom', tooltip: 'Собственная цена, по которой вы хотите продавать товар' },
    { title: 'Установка цены', id: 'settingPrice' },
    { title: 'Итоговая цена', id: 'recommend', tooltip: 'Это цена, которая будет применена к конкретному SKU в ближайший час. Зависит от активной стратегии.' },
    { title: "Стратегии", id: 'strategy', tooltip: 'Стратегии, по которым будут изменяться цены на ваши товары. Настраиваются индивидуально на каждый SKU.' },
    { title: "Выбранные стратегии", id: 'selectedStrategies', tooltip: 'Стратегии, которые сейчас активны для каждого SKU' }
]
