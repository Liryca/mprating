import React, { useRef, useEffect } from 'react';
import Help from '../Help/Help';
import { columnsAutomat, columnsSemiAutomat } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import { promotionAllAction } from '../../store/promotion/action';
import { fetchChangeProducts } from "../../api/services/product";
import { allUsedIdsAction } from '../../store/useInAutoMode/action';
import { deletAllPriceSettingAction } from '../../store/priceSetting/action';
import { changeGroupProducts, deleteChangedProductsGroup } from '../../store/products/action';

const Thead = () => {

    const dispatch = useDispatch();

    const activeStrategy = useSelector(state => state.activeStrategy);
    const products = useSelector(state => state.products);
    const usedProduct = useSelector(state => state.usedProduct);
    const promotion = useSelector(state => state.promotion);
    const pagination = useSelector(state=>state.pagination)
    const auth = useSelector(state => state.auth);
  
    const { strategy } = activeStrategy;
    const { productList, loading,  changedProducts } = products;
    const {fromProducts,toProducts,totalProducts} = pagination
    const { promotionCheckboxes } = promotion;
    const { usedCheckboxes } = usedProduct;

    const inputRefUse = useRef(null);
    const inputRefPromo = useRef(null);
    const productListOwnPage = productList.slice(fromProducts, toProducts).map(i => i.id);

    useEffect(() => {
        if (inputRefUse.current !== null) {
            if (!productListOwnPage.every(el => usedCheckboxes.includes(el)) &&
                productListOwnPage.some(el => usedCheckboxes.includes(el))) {
                inputRefUse.current.indeterminate = true;
            } else {
                inputRefUse.current.indeterminate = false;
            }
        }
        if (inputRefPromo.current !== null) {
            if (!productListOwnPage.every(el => promotionCheckboxes.includes(el)) &&
                productListOwnPage.some(el => promotionCheckboxes.includes(el))) {
                inputRefPromo.current.indeterminate = true;
            } else {
                inputRefPromo.current.indeterminate = false;
            }
        }
    }, [fromProducts, productList, productListOwnPage, promotionCheckboxes, toProducts, usedCheckboxes]);

    function handleCheckboxesUse(ids, key, value) {
        dispatch(allUsedIdsAction(ids));
        dispatch(changeGroupProducts(ids, key, value === 'true' ? false : true));
        if (!usedCheckboxes.length) {
            dispatch(deletAllPriceSettingAction(ids, ''));
            dispatch(changeGroupProducts(ids, "price_mode", ''));
        }
    }

    function handleCheckboxesPromotion(ids, key, value) {
        dispatch(promotionAllAction(ids));
        dispatch(changeGroupProducts(ids, key, value === 'true' ? false : true));
    }

    async function changeProductsAxios() {
        dispatch(deleteChangedProductsGroup())
        const response = await fetchChangeProducts({ client_id: auth.userId, rows: productList.filter(i => changedProducts.includes([i.id])) });
        console.log(response);
    }


    console.log(changedProducts)
    console.log(productListOwnPage)
    console.log(changedProducts.length ===  productListOwnPage.length)

    return (
        <thead>
            <tr className='tbl__line'>
                {strategy === 'automat' ?
                    columnsAutomat.map((column, i) => {
                        return <th className={`tbl__cell title ${`tbl__cell` + i}`} key={column.id}>
                            <div lang="ru" className='tbl__cell-title'>{column.title}</div>
                            <Help />
                            {(column.id === 'use' || column.id === 'promotion') &&
                                <label className="tbl__container thead-container">
                                    <input
                                        ref={column.id === 'use' ? inputRefUse : inputRefPromo}
                                        id={column.id === 'use' ? 'allUse' : 'allPromo'}
                                        className='thead-input'
                                        value={column.id === 'use' ? (usedCheckboxes.length === totalProducts ? true : false) :
                                            (promotionCheckboxes.length === totalProducts ? true : false)}
                                        onChange={
                                            column.id === 'use' ?
                                                (e) => handleCheckboxesUse(productListOwnPage, 'useInAutoMode', e.target.value) :
                                                (e) => handleCheckboxesPromotion(productListOwnPage, 'join_stocks', e.target.value)}
                                        type="checkbox"
                                        checked={column.id === 'use' ?
                                            !loading && usedCheckboxes.length && productListOwnPage.every(el => usedCheckboxes.includes(el)) :
                                            !loading && promotionCheckboxes.length && productListOwnPage.every(el => promotionCheckboxes.includes(el))
                                        }>
                                    </input>
                                </label>
                            }
                            {column.id === 'but' && <button
                                style={{ marginTop: '20px' }}
                                onClick={changeProductsAxios}
                                className={changedProducts?.length === productListOwnPage?.length ? "tbl__button-active small-font" : 'tbl__button small-font'}>
                                Сохранить
                            </button>}
                        </th>
                    }) :
                    columnsSemiAutomat.map((column, i) => {
                        return <th className={`tbl__cell title ${`tbl__cell` + (i + 1)}`} key={column.id}>
                            <div className='tbl__cell-title'> {column.title}</div>
                            <Help />
                            {column.id === 'promotion' &&
                                <label className="tbl__container thead-container">
                                    <input
                                        ref={inputRefPromo}
                                        name='allPromo'
                                        onChange={() => dispatch(promotionAllAction(productListOwnPage))}
                                        checked={!loading && promotionCheckboxes.length && productListOwnPage.every(el => promotionCheckboxes.includes(el))}
                                        className='thead-input'
                                        type="checkbox">
                                    </input>
                                </label>
                            }
                            {column.id === 'but' && <button
                                onClick={changeProductsAxios}
                                style={{ marginTop: '20px' }}
                                className={changedProducts?.length ===  productListOwnPage?.length? "tbl__button-active small-font" : 'tbl__button small-font'}
                            >Сохранить</button>}
                        </th>
                    })
                }

            </tr>
        </thead>
    );
};

export default Thead;