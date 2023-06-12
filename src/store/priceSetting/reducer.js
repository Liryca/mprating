export const activePriceSettingState = {
    activeRadios: [],
    radios: {},
    dataLength: '',
    key: '',


    
}

export const priceSettingReducer = (state = activePriceSettingState, action) => {
 

    switch (action.type) {



        case 'CHANGE_ACTIVE_PRICE_SETTING': {
          
           if (!state.activeRadios.includes(action.id)) {
                return {
                    activeRadios: [...state.activeRadios, action.id],
                    radios: { ...state.radios, [action.id]: action.key },
                    dataLength: action.dataLength,

                }

            } else {
                return {
                    ...state,
                    radios: { ...state.radios, [action.id]: action.key },
                    // dataLength: action.dataLength,
                    // key: action.key
                }
            }


        }
        case 'CHANGE_ACTIVE_ALL_PRICE_SETTING': {
            if (!state.radios.length) {
                return {
                    activeRadios: [...action.ids],
                    radios: { ...action.ids.reduce((a, i) => (a[i] = action.key, a), {}) },
                    dataLength: action.dataLength,
                    key: action.key
                }
            } else {
                return { ...state }
            }

        }
        default:
            return state
    }
}
