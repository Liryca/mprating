export const usedProductState = {
  usedCheckboxes: [],
  dataLength: '',
  all: false

}

export const changeUsedIdReducer = (state = usedProductState, action) => {



  switch (action.type) {

    case 'CHANGE_ACTIVE_ID': {
      if (!state.usedCheckboxes.includes(action.id)) {
        return {
          ...state,
          usedCheckboxes: [...state.usedCheckboxes, action.id],
          dataLength: action.dataLength,
        }

      } else {
        return {
          ...state,
          usedCheckboxes: state.usedCheckboxes.filter(i => i !== action.id),
          dataLength: action.dataLength,
        }
      }


    }
    case 'CHANGE_ALL_ACTIVE_ID': {
      if (state.usedCheckboxes.filter(elem => action.ids.includes(elem)).length) {
        return { usedCheckboxes: [...state.usedCheckboxes.filter(e => !action.ids.includes(e))], dataLength: action.dataLength, }
      } else {
        return { usedCheckboxes: [...state.usedCheckboxes, ...action.ids], dataLength: action.dataLength, }
      }
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