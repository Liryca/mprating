import { $instance } from "../http/index";

export const changeMode = (id, mode) => {
    return $instance.post("http://ovz21.j90211046.m6zkp.vps.myjino.ru:49156/set_mode", {
        "client_id": id,
        "auto_mode": mode
    })
}