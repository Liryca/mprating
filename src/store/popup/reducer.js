export const popupState = {
    show: false,
    activeId:''
}

export const popupReducer = (state = popupState, action) => {

    switch (action.type) {
        case 'CHANGE_POPUP': {
            return {
                ...state,
                show: !action.show,
                activeId: action.id
            }
        }

        default:
            return state
    }
}