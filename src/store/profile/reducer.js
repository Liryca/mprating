import { CHANGE_PROFILE } from "./action";

export const profileState = {
    show: false,
}

export const profileReducer = (state = profileState, {type, payload})=> {

    switch (type) {
        case CHANGE_PROFILE: {
            return {...state, show: !payload }
        }
        default:
            return state
    }
}