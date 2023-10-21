import React, { useRef } from 'react';
import Help from '../Help/Help';
import { columnsAutomat, columnsSemiAutomat } from '../../elements';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeProducts } from "../../api/services/product";
import { changeGroupProducts, deleteChangedProductsGroup } from '../../store/products/action';
import { checkBoxesAllAction } from '../../store/checkBoxes/action';
import { deleteAllRadioButtonsAction } from '../../store/radiobuttons/action';
import SwitchToggle from '../Switch/Switch';


const Thead = () => {

    const dispatch = useDispatch();
    const activeMode = useSelector(state => state.activeMode);
    const products = useSelector(state => state.products);
    const checkBoxes = useSelector(state => state.checkBoxes);
    const { mode } = activeMode;
    const { productList, loading, changedProducts } = products;
    const { useInAutoModeCheckBoxes, } = checkBoxes;
    const inputRef = useRef(null);
    const productListOwnPage = productList.map(i => i.id);

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


    function handleCheckboxesUse(ids, key, value) {
        dispatch(checkBoxesAllAction(ids, 'useInAutoModeCheckBoxes'));
        dispatch(changeGroupProducts(ids, key, value === 'true' ? false : true));
        if (!useInAutoModeCheckBoxes.length) {
            dispatch(deleteAllRadioButtonsAction('priceSettingRadios', 'priceSettingRadiosWithValue', ids, ''));
            dispatch(changeGroupProducts(ids, "price_mode", ''));
        }
    }


    async function changeProductsAxios() {

    }

    return (
        <thead>
            <tr className='tbl__line'>
                {mode === 'automat' ?
                    columnsAutomat.map((column, i) => {
                        return <th className={`tbl__cell title ${`tbl__cell` + i}`} key={column.id}>
                            <div className='tbl__cell-title title-strategy'>{i !== 0 && column.title}</div>
                            {i !== 0 && <Help />}

                            {column.id === 'use' &&
                                <SwitchToggle
                                name='useInAutoMode'
                                    onChange={(e) => handleCheckboxesUse(productListOwnPage, 'useInAutoMode', e.target.value)}
                                    checked={!loading && useInAutoModeCheckBoxes.length > 0 &&
                                        productListOwnPage.every(el => useInAutoModeCheckBoxes.includes(el))} />
                            }
                        </th>
                    }) :
                    columnsSemiAutomat.map((column, i) => {
                        return <th className={
                            `tbl__cell title ${i === 6 ||i===7||i==8
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

