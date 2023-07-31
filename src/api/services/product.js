import { data } from '../../data/data';
import { $instance } from "../http/index";




// export function setProduct(page) {
//     const limit = PRODUCT_PER_PAGE;
//     const offset = ((page * limit) - limit);

//     console.log(page, '')
//     console.log(offset, 'of')

//     return data.slice(offset, limit + offset)

// }

// curl--location 'https://devrepricer.mprating.ru:8765/set_row' \
// --header 'Content-Type: application/json' \
// --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJyZWYiOjEyMywiaWQiOjEsImlhdCI6IkZyaSBKdWwgMTQgMDA6MDA6NTYgTVNLIDIwMjMifQ.3tkIdFDNxOTIkgCotDOIWGM6WkmPm8Owl8SyKKciN_0' \
// --data '{
// "client_id": 1,
//     "rows": [
//         {
//             "calcPrice": 0,
//             "custom_price": 0,
//             "useInAutoMode": true,
//             "change_date": "2023-07-27 09:06:50",
//             "maxMarginality": 0,
//             "shift": 0,
//             "discount": 82,
//             "cost_price": 0,
//             "client_id": 1,
//             "article": 81310124,
//             "join_stocks": false,
//             "logistic": -2,
//             "commission": 17,
//             "id": 81310124,
//             "current_price": 0,
//             "strategy": 0,
//             "minMarginality": 0,
//             "cotrArticles": "",
//             "wb_price": 1,
//             "price_mode": 1
//         }
//     ]
// }'




export const fetchProducts = (id) => {
    return $instance.get(`https://devrepricer.mprating.ru:8765/get_table?client_id=${id}`)
}


export const fetchChangeProducts = (obj) => {
    return $instance.put(`https://devrepricer.mprating.ru:8765/set_row`,obj )
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



// export function fn(page,perPage) {
//     const limit = perPage;
//     const offset = ((page * limit) - limit);
//     const result = data.slice(offset, offset + limit);
//     return result
// }

