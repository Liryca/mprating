export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CHANGE_ROWS_PERPAGE = 'CHANGE_ROWS_PERPAGE';
export const CHANGE_TOTAL_ELEMENTS = 'CHANGE_TOTAL_ELEMENTS';

export const paginationAction = (page) => ({
    type: CHANGE_PAGE,
    page

})

export const paginationRowsPerPageAction = (rowsPerPageAction) => ({
    type: CHANGE_ROWS_PERPAGE,
    rowsPerPageAction

})

export const paginationTotalElementsAction = (elem) => ({
    type: CHANGE_TOTAL_ELEMENTS,
    elem

})
