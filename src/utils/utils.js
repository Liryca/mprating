export const checkValueLogin = (loginInputRef, login) => {
    login === '' ? loginInputRef.current.classList.add('invalid') : loginInputRef.current.classList.remove('invalid')
}

export const checkValuePassword = (passwordInputRef, password) => {
    password === '' ? passwordInputRef.current.classList.add('invalid') : passwordInputRef.current.classList.remove('invalid')
}

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
