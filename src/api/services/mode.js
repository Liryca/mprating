import { $api } from "../http/index";


export const changeMode = (mode) => {
    console.log(mode)
    return $api.post(`/rest/v1/products/autoMode?active${mode}`)
}