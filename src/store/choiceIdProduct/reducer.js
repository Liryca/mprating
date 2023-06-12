export const activeIdState = {
  checkboxes: [],
  dataLength:''

}

export const changeIdReducer = (state = activeIdState, action) => {
  switch (action.type) {
    case 'CHANGE_ACTIVE_ID': {
      if (!state.checkboxes.includes(action.id)) {
        return {
          ...state,
          checkboxes: [...state.checkboxes, action.id],
          dataLength:action.dataLength,
        }

      } else {
        return {
          ...state,
          checkboxes: state.checkboxes.filter(i => i !== action.id),
          dataLength: action.dataLength,
        }
      }


    }
    case 'CHANGE_ALL_ACTIVE_ID': {
      if (!state.checkboxes.length||(action.dataLength!==state.checkboxes.length)) {
        return { checkboxes: [...action.ids], dataLength: action.dataLength, }
      } else {
        return { checkboxes: [], dataLength: action.dataLength, }
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