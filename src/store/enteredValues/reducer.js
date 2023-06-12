
const enteredValuesState = {
    //   '' : {
    //         id: '',
    //         costPrice: '',
    //         minMarzha: 0,
    //         maxMarzha: 0,
    //         followingStrategy: '',
    //         competitors: [],
    //         ownPrice: 0,
    //         priceSetting: ''
    //     }
};

//  {
//     id:'',
//     costPrice: '',
//     minMarzha: 0,
//     maxMarzha: 0,
//     followingStrategy: '',
//     promotion: {all:false,checkbxes:[]},
//     competitors: [],
//     ownPrice: 0,
//     priceSetting: ''
// }



export function enteredValuesReducer(state = enteredValuesState, action) {
    switch (action.type) {

        case 'CHANGE_VAlUE':
            return {
                ...state,
                [action.id]: { ...state[action.id], [action.key]: action.value },
            }
        default: return state
    }


}