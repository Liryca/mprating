import { data } from '../../data/data';
import { $instance } from "../http/index";




// export function setProduct(page) {
//     const limit = PRODUCT_PER_PAGE;
//     const offset = ((page * limit) - limit);

//     console.log(page, '')
//     console.log(offset, 'of')

//     return data.slice(offset, limit + offset)

// }

export const fetchProducts = () => {
    return $instance.get("/get_table?client_id=1")
}




// export async function fetchProducts(page,perPage) {
//     const limit = perPage;
//     const offset = ((page * limit) - limit);
//     const options = {
//         method: 'GET',
//         url: `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`,
//         headers: { 'Content-Type': 'application/json' }
//     };
//     const response = await axios.request(options)
//     console.log(response.data)
//     return response.data
// }




export function fn(page,perPage) {
    const limit = perPage;
    const offset = ((page * limit) - limit);
    const result = data.slice(offset, offset + limit);
    return result
}

