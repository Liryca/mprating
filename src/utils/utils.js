

export const checkInputValue = (value) => {
    const v = value.replace(/[^\d.]/g, "");
    return v
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


// export function parseJwt(token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload);
// };