export const INCREASE_PAGE = 'INCREASE_PAGE';
export const DECREASE_PAGE = 'DECREASE_PAGE';

export const increaseAction = (page) => ({
    type: INCREASE_PAGE,
    page

})
export const decreaseAction = (page) => ({
    type: DECREASE_PAGE,
    page
})
