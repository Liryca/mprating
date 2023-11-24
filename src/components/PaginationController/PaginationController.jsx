import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../../store/products/action';
import { backTop } from '../../utils/utils';




// export default function PaginationControlled() {
//     const dispatch = useDispatch();
//     const [page, setPage] = React.useState(1);
//     const pagination = useSelector(state => state.pagination);
//     console.log(pagination)
//     console.log(page)

//     const handleChange = (event, value) => {
//         setPage(value);
//         // dispatch(paginationAction(value))
//         // dispatch(getProductsThunk());
//         backTop()
//     };

//     return (
//         <Stack spacing={2}>
//             <Pagination count={5} page={page} onChange={handleChange} />
//         </Stack>
//     );
// }


import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { paginationAction, paginationRowsPerPageAction } from '../../store/pagination/action';
import './Pagination.scss';

export default function TablePaginationDemo() {

    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);
    const { page, totalElements, rowsPerPage } = pagination;


    const handleChangePage = (event, newPage) => {
        dispatch(paginationAction(newPage))
    };

    // const handleChangeRowsPerPage = (event) => {
    //     console.log(event.target.value, ';;;')
    //     dispatch(paginationRowsPerPageAction(+event.target.value))
    //     dispatch(paginationAction(0))
    // };

    return (
        <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={totalElements}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage} 
            lang='RU'
        //  onRowsPerPageChange={handleChangeRowsPerPage} 
        />
    );
}