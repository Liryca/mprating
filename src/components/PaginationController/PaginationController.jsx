import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { paginationAction } from "../../store/pagination/action";
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../../store/products/action';
import { backTop } from '../../utils/utils';




export default function PaginationControlled() {
    const dispatch = useDispatch();
    const [numberPage, setNumberPage] = React.useState(1);
    const pagination = useSelector(state => state.pagination);

    const handleChange = (event, value) => {
        console.log(value)
        setNumberPage(value)
        dispatch(paginationAction(value))
        dispatch(getProductsThunk());
        backTop()
    };

    return (
        <Stack spacing={2}>
            <Pagination count={3} page={numberPage} onChange={handleChange} />
        </Stack>
    );
}