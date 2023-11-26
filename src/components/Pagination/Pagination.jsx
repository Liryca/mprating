import { useDispatch, useSelector } from 'react-redux';
import { backTop } from '../../utils/utils';
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { paginationAction } from '../../store/pagination/action';
import './Pagination.scss';

export default function Pagination() {

    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);
    const { page, totalElements, rowsPerPage } = pagination;

    const handleChangePage = (event, newPage) => {
        dispatch(paginationAction(newPage))
    };

    return (
        <div>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={50}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                labelDisplayedRows={
                    ({ from, to, count }) => {
                        return '' + from + '-' + to + ' из ' + count
                    }
                }
            />
        </div>
    );
}




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
