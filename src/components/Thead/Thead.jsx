import React, { useRef, useEffect } from 'react';
import Help from '../Help/Help';
import { columnsAutomat, columnsSemiAutomat } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeProducts } from "../../api/services/product";
import { changePopupShowIds } from '../../store/popup/action';
import { changeGroupProducts, deleteChangedProductsGroup } from '../../store/products/action';
import { checkBoxesAllAction, deleteAllCheckBoxesdAction } from '../../store/checkBoxes/action';
import { deleteAllRadioButtonsAction } from '../../store/radiobuttons/action';
// import { deletAllPriceSettingAction } from '../../store/priceSetting/action';
import SwitchToggle from '../Switch/Switch';



const Thead = () => {

    const dispatch = useDispatch();
    const activeMode = useSelector(state => state.activeMode);
    const products = useSelector(state => state.products);
    const checkBoxes = useSelector(state => state.checkBoxes);
    const pagination = useSelector(state => state.pagination)
    const auth = useSelector(state => state.auth);
    const popup = useSelector(state => state.popup);
    const { mode } = activeMode;
    const { productList, loading, changedProducts } = products;
    const { fromProducts, toProducts, totalProducts } = pagination
    const { promotionCheckBoxes, useInAutoModeCheckBoxes, generalsettingsCheckBoxes } = checkBoxes;
    const inputRef = useRef(null);

    const productListOwnPage = productList.slice(fromProducts, toProducts).map(i => i.id);




    useEffect(() => {
        if (inputRef.current !== null) {
            if (!productListOwnPage.every(el => generalsettingsCheckBoxes.includes(el)) &&
                productListOwnPage.some(el => generalsettingsCheckBoxes.includes(el))) {
                inputRef.current.indeterminate = true;
            } else {
                inputRef.current.indeterminate = false;
            }
        }

    }, [fromProducts, productList, productListOwnPage, toProducts, generalsettingsCheckBoxes, inputRef]);


    function handleCheckboxesUse(ids, key, value) {
        dispatch(checkBoxesAllAction(ids, 'useInAutoModeCheckBoxes'));
        dispatch(changeGroupProducts(ids, key, value === 'true' ? false : true));
        if (!useInAutoModeCheckBoxes.length) {
            dispatch(deleteAllRadioButtonsAction('priceSettingRadios', 'priceSettingRadiosWithValue', ids, ''));
            dispatch(changeGroupProducts(ids, "price_mode", ''));
        }
    }


    async function changeProductsAxios() {
        dispatch(deleteChangedProductsGroup())
        const response = await fetchChangeProducts({ client_id: auth.userId, rows: productList.filter(i => changedProducts.includes([i.id])) });
    }

    const changeAllProductGeneralSettings = (ids) => {
        dispatch(checkBoxesAllAction(ids, 'generalsettingsCheckBoxes'))
    }


    return (
        <thead>
            <tr className='tbl__line'>
                {mode === 'automat' ?
                    columnsAutomat.map((column, i) => {
                        return <th className={`tbl__cell title ${`tbl__cell` + i}`} key={column.id}>
                            <div className='tbl__cell-title title-strategy'>{i !== 0 && column.title}</div>

                            {column.id === 'strategy' &&
                                <label className="tbl__container thead-container">
                                    <button
                                        onClick={() => dispatch(changePopupShowIds(popup.show, productListOwnPage, productList.slice(fromProducts, toProducts)))}
                                        className='tbl__button small-font'
                                        type="button">
                                        Выбрать
                                    </button>
                                    <div>
                                        <input
                                            ref={inputRef}
                                            onChange={() => changeAllProductGeneralSettings(productListOwnPage)}
                                            checked={!loading && generalsettingsCheckBoxes.length > 0 &&
                                                productListOwnPage.every(el => generalsettingsCheckBoxes.includes(el))}
                                            name='strategy'
                                            className='thead-input'
                                            type="checkbox">
                                        </input>
                                    </div>

                                </label>
                            }
                            {i !== 0 && <Help />}

                            {column.id === 'use' &&
                                <SwitchToggle
                                    onChange={(e) => handleCheckboxesUse(productListOwnPage, 'useInAutoMode', e.target.value)}
                                    checked={!loading && useInAutoModeCheckBoxes.length > 0 &&
                                        productListOwnPage.every(el => useInAutoModeCheckBoxes.includes(el))} />
                            }
                        </th>
                    }) :
                    columnsSemiAutomat.map((column, i) => {
                        return <th className={`tbl__cell title ${`tbl__cell` + (i + 1)}`} key={column.id}>
                            <div className='tbl__cell-title'> {column.title}</div>
                            {column.id === 'strategy' &&
                                <label className="tbl__container thead-container">
                                    <button
                                        onClick={() => dispatch(changePopupShowIds(popup.show, productListOwnPage, productList.slice(fromProducts, toProducts)))}
                                        className='tbl__button small-font'
                                        type="button">
                                        Выбрать
                                    </button>
                                    <div>
                                        <input
                                            ref={inputRef}
                                            onChange={() => changeAllProductGeneralSettings(productListOwnPage)}
                                            checked={!loading && generalsettingsCheckBoxes.length > 0 &&
                                                productListOwnPage.every(el => generalsettingsCheckBoxes.includes(el))}
                                            name='strategy'
                                            className='thead-input'
                                            type="checkbox">
                                        </input>
                                    </div>
                                </label>
                            }
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

