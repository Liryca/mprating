export const profilState = {
    show: false,
}

export const profilReducer = (state = profilState, action)=> {

    switch (action.type) {
        case 'CHANGE_PROFIL': {
            return {
                ...state,
                show: !action.show
            }
        }

        default:
            return state
    }
}