import { CHANGE_ACTIVE_PROMOTION, CHANGE_ALL_ACTIVE_PROMOTION } from './action';

export const activePromotionState = {
    promotionCheckboxes: []
}

export const promotionReducer = (state = activePromotionState, { type, payload }) => {

    switch (type) {
        case CHANGE_ACTIVE_PROMOTION: {
            if (!state.promotionCheckboxes.includes(payload)) {

                return {
                    ...state,
                    promotionCheckboxes: [...state.promotionCheckboxes, payload],
                }

            } else {
                return {
                    ...state,
                    promotionCheckboxes: state.promotionCheckboxes.filter(i => i !== payload),
                }
            }
        }
        case CHANGE_ALL_ACTIVE_PROMOTION: {
            if (state.promotionCheckboxes.filter(elem => payload.includes(elem)).length) {
                return {
                    ...state,
                    promotionCheckboxes: [...state.promotionCheckboxes.filter(e => !payload.includes(e))]
                }
            } else {
                return {
                    ...state,
                    promotionCheckboxes: [...state.promotionCheckboxes, ...payload]
                }
            }
        }
        default:
            return state
    }
}


