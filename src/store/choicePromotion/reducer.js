export const activePromotionState = {
    checkboxes: [],
    dataLength:''

}



export const promotionReducer = (state = activePromotionState, action) => {

    switch (action.type) {
        case 'CHANGE_ACTIVE_PROMOTION': {
            if (!state.checkboxes.includes(action.id)) {
              
                return {
                    ...state,
                    checkboxes: [...state.checkboxes, action.id],
                    dataLength: action.dataLength,
                }

            } else {
                return {
                    ...state,
                    checkboxes: state.checkboxes.filter(i => i !== action.id),
                    dataLength: action.dataLength,
                }
            }
        

        }
        case 'CHANGE_ALL_ACTIVE_PROMOTION': {
            if (!state.checkboxes.length || (action.dataLength !== state.checkboxes.length)) {
                return { checkboxes: [...action.ids], dataLength: action.dataLength, }
            } else {
                return { checkboxes: [], dataLength: action.dataLength, }
            }
        }


        default:
            return state
    }
}


