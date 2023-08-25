import {
  CHANGE_USE_IN_AUTO_MOOD_ID,
  CHANGE_ALL_USE_IN_AUTO_MOOD_IDS,
  CHECK_USE_IN_AUTO_MOOD_IDS,
  DELETE_USE_IN_AUTO_MOOD_ID,
  DELETE_ALL_USE_IN_AUTO_MOOD_ID
} from "./action"

export const usedProductState = {
  usedCheckboxes: [],
}

export const changeUsedIdReducer = (state = usedProductState, { type, payload }) => {


  switch (type) {

    case CHANGE_USE_IN_AUTO_MOOD_ID: {
      if (!state.usedCheckboxes.includes(payload)) {
        return { ...state, usedCheckboxes: [...state.usedCheckboxes, payload], }
      } else {
        return {
          ...state, usedCheckboxes: state.usedCheckboxes.filter(i => i !== payload),
        }
      }
    }

    case CHANGE_ALL_USE_IN_AUTO_MOOD_IDS: {
      if (state.usedCheckboxes.filter(elem => payload.includes(elem)).length) {
        return { ...state, usedCheckboxes: [...state.usedCheckboxes.filter(e => !payload.includes(e))] }
      } else {
        return { ...state, usedCheckboxes: [...state.usedCheckboxes, ...payload] }
      }
    }

    case CHECK_USE_IN_AUTO_MOOD_IDS: {
      return { usedCheckboxes: [...payload] }
    }

    case DELETE_USE_IN_AUTO_MOOD_ID: {
      return { ...state, usedCheckboxes: state.usedCheckboxes.filter(i => i !== payload) }
    }
    case DELETE_ALL_USE_IN_AUTO_MOOD_ID: {
      return { ...state, usedCheckboxes: [] }
    }

    default:
      return state
  }
}











// export const changeArtReducer = (state = activeArtState, action) => {


//   switch (action.type) {

//     case 'CHANGE_ACTIVE_ART': {
//       if (state.includes(action.art)) {
//         return [...state.filter(i => i !== action.art)]
//       } else {
//         return [
//           ...state,
//           action.art
//         ]
//       }
//     }
//     case 'CHANGE_ACTIVE_ALL_ART': {
//     if(state.length){
//       return []
//     }else{
//       return [
//         ...action.arts
//       ]
//     }
//     }


//     default:
//       return state
//   }
// }