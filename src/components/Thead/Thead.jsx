import React, { useRef, useEffect } from 'react';
import Help from '../Help/Help';
import { columnsAutomat, columnsSemiAutomat } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import { activeAllUsedIdAction } from '../../store/choiceIdProduct/action';
import { promotionAllAction } from '../../store/choicePromotion/action';

const Thead = () => {

    const dispatch = useDispatch();

    const activeStrategy = useSelector(state => state.activeStrategy);
    const products =  useSelector(state => state.products);
    const usedProduct =  useSelector(state=>state.usedProduct);
    const promotion =  useSelector(state=>state.promotion);

    const { strategy } = activeStrategy;
    const { productList, fromProducts, toProducts, loading, currentProductGroup } = products;
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
                                        onChange={
                                            column.id === 'use' ?
                                                () => dispatch(activeAllUsedIdAction(productListOwnPage)) :
                                                () => dispatch(promotionAllAction(productListOwnPage))
                                        }
                                        type="checkbox"
                                        checked={column.id === 'use' ?
                                            !loading &&usedCheckboxes.length && productListOwnPage.every(el => usedCheckboxes.includes(el)) :
                                            !loading && promotionCheckboxes.length&& productListOwnPage.every(el => promotionCheckboxes.includes(el))
                                        }>
                                    </input>
                                </label>
                            }
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
                                        checked={!loading && promotionCheckboxes.length&& productListOwnPage.every(el => promotionCheckboxes.includes(el))}
                                        className='thead-input'
                                        type="checkbox">
                                    </input>
                                </label>
                            }
                        </th>
                    })
                }
            </tr>
        </thead>
    );
};

export default Thead;