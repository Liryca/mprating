export const checkInputValue = (value) => {
    const v = value.replace(/[^\d.]/g, '');
    return v
}


export const checkDataEntry = (value) => {
        const v = value.replace(/[^,\d]/g, '');
        return v
}

export function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
    



export const backTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

export const verefyValue = (costPrice, minMarzha, ownPrice,) => {
    const sum = minMarzha + costPrice;
    if (sum <= ownPrice) {
        return false
    }
    return true
}


