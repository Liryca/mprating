import { $instance } from "../http/index";

export const changeMode = (id, mode) => {
    return $instance.post("/set_mode", {
        "client_id": id,
        "auto_mode": mode
    })
}