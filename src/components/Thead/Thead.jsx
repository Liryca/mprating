import React, { useRef } from 'react';
import { columnsAutomat, columnsSemiAutomat } from '../../utils/elements';
import { useDispatch, useSelector } from 'react-redux';
import SwitchToggle from '../Switch/Switch';
import { changeUseAutoProductsThunk } from '../../store/products/action';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { tooltipClasses } from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';


export const CustomWidthTooltip = styled(({ className, ...props }) => (

    <Tooltip placement="top" arrow  {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 280,
        with: '100%',
        height: 'minContent',
        backgroundColor: '#ffffff',
        border: '1px solid #bdbcdb',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.16)',
        color: '#565555',
        display: 'flex',
        fontSize: '12px',
        lineHeight: '18px',
        padding: '15px',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
});

const Thead = () => {

    const dispatch = useDispatch();
    const clientInfo = useSelector(state => state.clientInfo);
    const products = useSelector(state => state.products);
    const { modeType } = clientInfo;
    const { productList, isLoadingProducts } = products;

    function changeProducts(value) {
        if (productList.length) {
            dispatch(changeUseAutoProductsThunk(value));
        }
    }

    return (
        <TableHead>
            <TableRow sx={{ verticalAlign: 'top' }}>
                {modeType === 'AUTO' ?
                    columnsAutomat.map((column, i) => {
                        return <TableCell
                            align="left"
                            className={`tbl__cell main-font ${`tbl__cell` + i}`}
                            key={column.id}>
                            <div className='tbl__titleWrapp'>
                                {i !== 0 &&
                                    <CustomWidthTooltip
                                        title={column.id === 'main' ?
                                            < div >
                                                <p>Себестоимость (заполняется в рублях) = </p>
                                                <p>+</p>
                                                <p>фулфилмент (стоимость услуг по упаковке, стоимость самой упаковки, стоимость короба в расчете на 1 единицу товара)</p>
                                                <p>+</p>
                                                <p>стоимость транспортной логистики на склад WB </p>
                                                <p>+</p>
                                                <p>налоги</p>
                                            </div> : column.tooltip
                                        }>
                                      
                                            {(column.id !== 'photo' && column.id !== 'art') &&
                                                <div className='tbl__tooltipWrapper'>
                                                    <div className='tbl__tooltipp'></div>
                                                </div>}
                                                </CustomWidthTooltip>}
                                            {i !== 0 && <div className='tbl__cell-title main-font'> {column.id === 'min' || column.id === 'max' ?
                                                <>
                                                    <p>{column.title.split(' ')[0]}</p>
                                                    <p> {column.title.split(' ')[1]} {column.title.split(' ')[2]} </p>
                                                </> :
                                                column.title
                                            }</div>}
                                        </div>
                            {column.id === 'use' &&
                                <SwitchToggle
                                    name='useInAutoMode'
                                    onChange={() => changeProducts(productList?.every((i) => i.useInAutoMode === true ? false : true))}
                                    checked={!isLoadingProducts && productList?.length !== 0 && productList?.every((i) => i.useInAutoMode === true)} />
                            }
                        </TableCell>
                    }) :
                    columnsSemiAutomat.map((column, i) => {
                        return <TableCell
                            align="left"
                            className={
                                `tbl__cell main-font ${i === 6 || i === 7 || i === 8
                                    ? `tbl__cell` + (i + 1 + 'semi') : `tbl__cell` + (i + 1)}`}
                            key={column.id}>
                            <div className='tbl__titleWrapp'>
                                <CustomWidthTooltip
                                    title={column.id === 'main' ?
                                        < div >
                                            <p>Себестоимость (заполняется в рублях) = </p>
                                            <p>+</p>
                                            <p>фулфилмент (стоимость услуг по упаковке, стоимость самой упаковки, стоимость короба в расчете на 1 единицу товара)</p>
                                            <p>+</p>
                                            <p>стоимость транспортной логистики на склад WB </p>
                                            <p>+</p>
                                            <p>налоги</p>
                                        </div> : column.id === 'settingPrice' ?
                                            <div>
                                                <p>Показывает, какая цена установлена:</p>
                                                < ul className='tooltipTitle' >
                                                    <li>Собственная (необходимо установить отдельно в каждом SKU)</li>
                                                    <li>Стратегическая (необходимо установить отдельно в каждом SKU)</li>
                                                    <li>Не изменилась, ваша цена останется как есть
                                                    </li>
                                                </ul>
                                            </div>
                                            : column.tooltip}>
                                        {(column.id !== 'photo' && column.id !== 'art') &&
                                            <div className='tbl__tooltipWrapper'>
                                                <div className='tbl__tooltipp'></div>
                                            </div>}
                                            </CustomWidthTooltip>
                                        {<div className='tbl__cell-title main-font'> {column.id === 'min' || column.id === 'max' ?
                                            <>
                                                <p>{column.title.split(' ')[0]}</p>
                                                <p> {column.title.split(' ')[1]} {column.title.split(' ')[2]} </p>
                                            </> :
                                            column.title
                                        }</div>}
                                    </div>
                        </TableCell>
                    }
                    )
                }
            </TableRow>
        </TableHead >
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