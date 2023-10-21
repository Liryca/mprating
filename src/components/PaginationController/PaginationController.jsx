import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { increaseAction } from "../../store/pagination/action";
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../../store/products/action';
import { backTop } from '../../utils/utils';




export default function PaginationControlled() {
    const dispatch = useDispatch();
    const paginationState = useSelector(state => state.pagination);
    const [p, setP] = React.useState(1)

    const handleChange = (event, value) => {
        setP(value)
        dispatch(increaseAction(value))
        // dispatch(getProductsThunk());
        backTop()
    };

    return (
        <Stack spacing={2}>
            <Pagination count={10} page={p} onChange={handleChange} />
        </Stack>
    );
}