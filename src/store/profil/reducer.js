import { CHANGE_PROFIL } from "./action";

export const profilState = {
    show: false,
}

export const profilReducer = (state = profilState, {type, payload})=> {

    switch (type) {
        case CHANGE_PROFIL: {
            return {
                ...state,
                show: !payload
            }
        }
        default:
            return state
    }
}