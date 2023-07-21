import { $instance } from "../http/index";

export const loginUser = (login, password) => {
    return $instance.post("http://205f6154688e.vps.myjino.ru:49283/login", {
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


