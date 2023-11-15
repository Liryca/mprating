import React, { useRef } from 'react';
import Help from '../Help/Help';
import { columnsAutomat, columnsSemiAutomat } from '../../elements';
import { useDispatch, useSelector } from 'react-redux';
import SwitchToggle from '../Switch/Switch';
import { changeProductGroupThunk } from '../../store/products/action';


const Thead = () => {

    const dispatch = useDispatch();
    const activeMode = useSelector(state => state.activeMode);
    const products = useSelector(state => state.products);
    const { autoMode} = activeMode;
    const { productList, isLoadingProducts } = products;

    function changeProducts(e) {

      const obj =  productList.map(i => {
            if (e) {
                return {
                    ...i,
                    useInAutoMode: false
                }
            } else {
                return {
                    ...i,
                    useInAutoMode: true,
                }
            }
        })
        dispatch(changeProductGroupThunk(obj))
    }

    return (
        <thead>
            <tr className='tbl__line'>
                {autoMode ?
                    columnsAutomat.map((column, i) => {
                        return <th className={`tbl__cell title ${`tbl__cell` + i}`} key={column.id}>
                            <div className='tbl__cell-title title-strategy'>{i !== 0 && column.title}</div>
                            {i !== 0 && <Help />}

                            {column.id === 'use' &&
                                <SwitchToggle
                                    name='useInAutoMode'
                                    onChange={(e) => changeProducts(productList?.every((i) => i.useInAutoMode === true))}
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