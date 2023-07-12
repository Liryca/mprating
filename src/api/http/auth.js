import { instance } from "../authConfig";



export const loginUser = (login, password) => {
    return instance.post("/login", {
        login: login,
        password: password   
    })
}


export const refreshToken = () => {
    return instance.get("/refresh"); ///    /token/refresh
}

export const logout = () => {
    return instance.post("/logout")  //   /logout
}


