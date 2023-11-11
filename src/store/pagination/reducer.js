import { useState } from 'react';
import { DECREASE_PAGE, INCREASE_PAGE } from './action';

export const paginationState = {
    page: 0,
    perPage: 6,
    count:''
}

export const paginationReducer = (state = paginationState, action) => {
    switch (action.type) {
        case INCREASE_PAGE: {
            return {
                ...state,
                page: action.page,
            }
        }
        case DECREASE_PAGE: {
            return {
                ...state,
                page: state.page 
            }
        }
        default: return state;
    }
}

// export const paginationReducer = (state = paginationState, action) => {

//     switch (action.type) {
//         case INCREASE_PAGE: {
//             if ((state.totalProducts - state.toProducts) < state.perPage) {
//                 return {
//                     ...state,
//                     toProducts: state.toProducts + (state.totalProducts - state.toProducts),
//                     fromProducts: state.fromProducts + state.perPage,
//                     page: state.page + 1,
//                 }
//             } else {
//                 return {
//                     ...state,
//                     page: state.page + 1,
//                     fromProducts: state.fromProducts + state.perPage,
//                     toProducts: state.toProducts + state.perPage
//                 }
//             }
//         }
//         case DECREASE_PAGE: {
//             if (state.totalProducts === state.toProducts) {
//                 return {
//                     ...state,
//                     toProducts: state.toProducts - (state.totalProducts - state.fromProducts),
//                     page: state.page - 1,
//                     fromProducts: state.fromProducts - state.perPage,

//                 }
//             }
//             else {
//                 return {
//                     ...state,
//                     page: state.page - 1,
//                     fromProducts: state.fromProducts - state.perPage,
//                     toProducts: state.toProducts - state.perPage
//                 }
//             }
//         }
//         default: return state;

//     }
// }
