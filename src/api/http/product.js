import axios from 'axios';




// export function setProduct(page) {
//     const limit = PRODUCT_PER_PAGE;
//     const offset = ((page * limit) - limit);

//     console.log(page, '')
//     console.log(offset, 'of')

//     return data.slice(offset, limit + offset)

// }


export async function fetchProducts(page) {

    const PRODUCT_PER_PAGE = 5;
    const limit = PRODUCT_PER_PAGE;
    const offset = ((page * limit) - limit);

    const options = {
        method: 'GET',
        url: `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`,
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await axios.request(options)
    return response.data
}