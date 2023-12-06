import React, { useRef } from 'react';
import { columnsAutomat, columnsSemiAutomat } from '../../elements';
import { useDispatch, useSelector } from 'react-redux';
import SwitchToggle from '../Switch/Switch';
import { changeUseAutoProductsThunk } from '../../store/products/action';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { tooltipClasses } from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';


const CustomWidthTooltip = styled(({ className, ...props }) => (

    <Tooltip placement="top" arrow  {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 280,
        with: '100%',
        height: 60,
        backgroundColor: '#ffffff',
        border: '1px solid #bdbcdb',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.16)',
        color: '#565555',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const Thead = () => {

    const dispatch = useDispatch();
    const clientInfo = useSelector(state => state.clientInfo);
    const products = useSelector(state => state.products);
    const { modeType } = clientInfo;
    const { productList, isLoadingProducts } = products;

    function changeProducts(value) {
        dispatch(changeUseAutoProductsThunk(value));
    }




    return (

        <TableHead>
            <TableRow sx={{ verticalAlign: 'top' }}>
                {modeType === 'AUTO' ?
                    columnsAutomat.map((column, i) => {
                        return <TableCell
                            align="left"
                            className={`tbl__cell title ${`tbl__cell` + i}`}
                            key={column.id}>
                            <div className='tbl__titleWrapp'>
                                {i !== 0 &&
                                    <CustomWidthTooltip title={'Подсказка интерфейса'}>
                                        <div className='tbl__tooltipWrapper'>
                                            <div className='tbl__tooltipp'></div>
                                        </div>
                                    </CustomWidthTooltip>}
                                {i !== 0 && <div className='tbl__cell-title title'> {column.id === 'min' || column.id === 'max' ?
                                    column.title.split(' ').map((el, i) => <p className={i === 2 && 'boldTitle'}>{el}</p>) :
                                    column.title
                                }</div>}

                            </div>
                            {column.id === 'use' &&
                                <SwitchToggle
                                    name='useInAutoMode'
                                    onChange={(e) => changeProducts(productList?.every((i) => i.useInAutoMode === true ? false : true))}
                                    checked={!isLoadingProducts && productList?.every((i) => i.useInAutoMode === true)} />
                            }
                        </TableCell>
                    }) :
                    columnsSemiAutomat.map((column, i) => {
                        return <TableCell
                            align="left"
                            className={
                                `tbl__cell title ${i === 6 || i === 7 || i === 8
                                    ? `tbl__cell` + (i + 1 + 'semi') : `tbl__cell` + (i + 1)}`}
                            key={column.id}>
                            <div className='tbl__titleWrapp'>
                                <CustomWidthTooltip title={'Подсказка интерфейса'}>
                                    <div className='tbl__tooltipWrapper'>
                                        <div className='tbl__tooltipp'></div>
                                    </div>
                                </CustomWidthTooltip>
                                <div className='tbl__cell-title title'> {column.id === 'min' || column.id === 'max' ?
                                    column.title.split(' ').map((el, i) => <p className={i === 2 && 'boldTitle'}>{el}</p>) :
                                    column.title
                                }</div>

                            </div>
                        </TableCell>
                    }
                    )
                }
            </TableRow>
        </TableHead>




        // <thead>
        //     <tr className='tbl__line'>
        //         {modeType === 'AUTO' ?
        //             columnsAutomat.map((column, i) => {
        //                 return <th className={`tbl__cell title ${`tbl__cell` + i}`} key={column.id}>
        //                     {/* <div className='tbl__titleWrapp'> */}

        //                         <div className='tbl__cell-title title-strategy'>{i !== 0 && column.title}</div>
        //                         {i !== 0&& <Help />}

        //                         {/* {i !== 0 &&
        //                             <CustomWidthTooltip title={'Подсказка интерфейса'}>
        //                                 <div className='tbl__tooltipp'></div>
        //                             </CustomWidthTooltip>
        //                         } */}

        //                         {/* <Tooltip title="WB-Browser" placement="top" arrow>
        //                         <p>000</p>
        //                     </Tooltip> */}
        //                         {/* {i !== 0 && <Help />} */}
        //                     {/* </div> */}
        //                     {column.id === 'use' &&
        //                         <SwitchToggle
        //                             name='useInAutoMode'
        //                             onChange={(e) => changeProducts(productList?.every((i) => i.useInAutoMode === true ? false : true))}
        //                             checked={!isLoadingProducts && productList?.every((i) => i.useInAutoMode === true)} />
        //                     }
        //                 </th>
        //             }) :
        //             columnsSemiAutomat.map((column, i) => {
        //                 return <th className={
        //                     `tbl__cell title ${i === 6 || i === 7 || i === 8
        //                         ? `tbl__cell` + (i + 1 + 'semi') : `tbl__cell` + (i + 1)}`} key={column.id}>
        //                     <div className='tbl__cell-title'> {column.title}</div>
        //                     <Help />
        //                 </th>
        //             }
        //             )
        //         }
        //     </tr>
        // </thead>
    );
};

export default Thead;

    // useEffect(() => {
    //     if (inputRef.current !== null) {
    //         if (!productListOwnPage.every(el => generalsettingsCheckBoxes.includes(el)) &&
    //             productListOwnPage.some(el => generalsettingsCheckBoxes.includes(el))) {
    //             inputRef.current.indeterminate = true;
    //         } else {
    //             inputRef.current.indeterminate = false;
    //         }
    //     }

    // }, [fromProducts, productList, productListOwnPage, toProducts, generalsettingsCheckBoxes, inputRef]);