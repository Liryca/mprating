import { instance } from "../authConfig";



export const login = (login, password) => {
    console.log()
    return instance.post("/test", { login, password })//    /login
}


export const refreshToken = () => {
    return instance.get("/refresh"); ///    /token/refresh
}

export const logout = () => {
    return instance.post("/logout")  //   /logout
} 


