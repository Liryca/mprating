


export const checkValuePhone = (phoneInputRef,phone) => {
    phone === '' ? phoneInputRef.current.classList.add('invalid') : phoneInputRef.current.classList.remove('invalid')
}

export const checkValuePassword = (passwordInputRef,password) => {
    password === '' ? passwordInputRef.current.classList.add('invalid') : passwordInputRef.current.classList.remove('invalid')

}

export const checkInputValue=(value)=>{
    const v = value.replace(/[^\d.]/g, "");
    return v
}