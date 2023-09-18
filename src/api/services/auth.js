import { $instance } from "../http/index";

export const loginUser = (login, password) => {
    return $instance.post("https://auth.mprating.ru:8765/login", { // login
        login: login,
        password: password   
    })
}


export const refreshToken = () => {
    return $instance.get("/refresh"); ///    /token/refresh
}

export const logout = () => {
    return $instance.post("/logout")  //   /logout
}


