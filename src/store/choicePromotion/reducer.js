export const activePromotionState = {
    promotionCheckboxes: [],
    dataLength:''

}



export const promotionReducer = (state = activePromotionState, action) => {

    switch (action.type) {
        case 'CHANGE_ACTIVE_PROMOTION': {
            if (!state.promotionCheckboxes.includes(action.id)) {
              
                return {
                    ...state,
                    promotionCheckboxes: [...state.promotionCheckboxes, action.id],
                    dataLength: action.dataLength,
                }

            } else {
                return {
                    ...state,
                    promotionCheckboxes: state.promotionCheckboxes.filter(i => i !== action.id),
                    dataLength: action.dataLength,
                }
            }
        

        }
        case 'CHANGE_ALL_ACTIVE_PROMOTION': {
            if (!state.promotionCheckboxes.length || (action.dataLength !== state.promotionCheckboxes.length)) {
                return { promotionCheckboxes: [...action.ids], dataLength: action.dataLength, }
            } else {
                return { promotionCheckboxes: [], dataLength: action.dataLength, }
            }
        }


        default:
            return state
    }
}


