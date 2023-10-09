import { CHANGE_GENERAL_SETTINGS_STRATEGY } from "./action";

const generalStrategySettingsState = {
    followingStrategy: false,
    promotions: false,
    strategy: '',
    step: '',
    articles: '',
    afterEndPromotion: '',
}

export const generalStrategySettingsReducer = (state = generalStrategySettingsState, action) => {

    switch (action.type) {
        case CHANGE_GENERAL_SETTINGS_STRATEGY: {
            return { ...state, [action.key]: action.value }
        }
        default:
            return state

    }
}
