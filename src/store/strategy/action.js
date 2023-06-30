export const CHANGE_STRATEGY = 'CHANGE_STRATEGY';
export const CHANGE_STATUS = 'CHANGE_STATUS';

export const actionStrategy = (str) => ({
    type: CHANGE_STRATEGY,
    payload:str
})

export const actionStatusStrategy= (status) => ({
    type: CHANGE_STATUS,
    payload:status
})



