import React, { useRef } from 'react';
import Help from '../Help/Help';
import { columnsAutomat, columnsSemiAutomat } from '../../elements';
import { useDispatch, useSelector } from 'react-redux';
import SwitchToggle from '../Switch/Switch';
import { changeUseAutoProductsThunk } from '../../store/products/action';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import vector from '../Help/images/Hover.svg'


import { tooltipClasses } from '@mui/material/Tooltip';

const CustomWidthTooltip = styled(({ className, ...props }) => (

    <Tooltip placement="top" arrow  {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 280,
        height: 60,
        backgroundColor: '#ffffff',
        border: '1px solid #bdbcdb',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.16)',
        color: '#565555',
        textAligan: 'center'
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
        <thead>
            <tr className='tbl__line'>
                {modeType === 'AUTO' ?
                    columnsAutomat.map((column, i) => {
                        return <th className={`tbl__cell title ${`tbl__cell` + i}`} key={column.id}>
                            {/* <div className='tbl__titleWrapp'> */}
                  
                                <div className='tbl__cell-title title-strategy'>{i !== 0 && column.title}</div>
                                {i !== 0&& <Help />}
                          
                                {/* {i !== 0 &&
                                    <CustomWidthTooltip title={'Подсказка интерфейса'}>
                                        <div className='tbl__tooltipp'></div>
                                    </CustomWidthTooltip>
                                } */}

                                {/* <Tooltip title="WB-Browser" placement="top" arrow>
                                <p>000</p>
                            </Tooltip> */}
                                {/* {i !== 0 && <Help />} */}
                            {/* </div> */}
                            {column.id === 'use' &&
                                <SwitchToggle
                                    name='useInAutoMode'
                                    onChange={(e) => changeProducts(productList?.every((i) => i.useInAutoMode === true ? false : true))}
                                    checked={!isLoadingProducts && productList?.every((i) => i.useInAutoMode === true)} />
                            }
                        </th>
                    }) :
                    columnsSemiAutomat.map((column, i) => {
                        return <th className={
                            `tbl__cell title ${i === 6 || i === 7 || i === 8
                                ? `tbl__cell` + (i + 1 + 'semi') : `tbl__cell` + (i + 1)}`} key={column.id}>
                            <div className='tbl__cell-title'> {column.title}</div>
                            <Help />
                        </th>
                    }
                    )
                }
            </tr>
        </thead>
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