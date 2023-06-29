import React, { useRef, useEffect } from 'react';
import Help from '../Help/Help';
import { data } from '../../data/data'
import { columnsAutomat, columnsSemiAutomat } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import { activeAllUsedIdAction } from '../../store/choiceIdProduct/action';
import { promotionAllAction } from '../../store/choicePromotion/action';

const Thead = () => {

    const dispatch = useDispatch();
    const { activeStrategy, usedProduct, promotion, products } = useSelector(state => state);
    const { strategy } = activeStrategy;
    const { productList, fromProducts, toProducts, loading } = products;
    const { promotionCheckboxes } = promotion;
    const { usedCheckboxes } = usedProduct;
    const inputRefUse = useRef(null);
    const inputRefPromo = useRef(null);

    useEffect(() => {

        if (inputRefUse.current !== null) {
            if (!productList.slice(fromProducts, toProducts).map(i => i.id).every(el => usedCheckboxes.includes(el)) &&
                productList.slice(fromProducts, toProducts).map(i => i.id).some(el => usedCheckboxes.includes(el))
            ) {
                inputRefUse.current.indeterminate = true;
            } else {
                inputRefUse.current.indeterminate = false;
            }
        }

        // if (promotion.dataLength !== promotionCheckboxes.length && promotionCheckboxes.length) {
        //     inputRefPromo.current.indeterminate = true;
        // } else {
        //     inputRefPromo.current.indeterminate = false;
        // }

    }, [fromProducts, productList, toProducts, usedCheckboxes]);

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
                                                () => dispatch(activeAllUsedIdAction(productList.slice(fromProducts, toProducts).map(i => i.id), productList.length)) :
                                                () => dispatch(promotionAllAction(productList.map(i => i.id), productList.length))
                                        }
                                        type="checkbox"
                                        checked={column.id === 'use' ?
                                            !loading && productList.slice(fromProducts, toProducts).map(i => i.id).every(el => usedCheckboxes.includes(el))
                                            : promotion.dataLength === promotionCheckboxes.length
                                        }
                                    >
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
                                        id={'allPromo'}
                                        onChange={() => dispatch(promotionAllAction(productList.map(i => i.id), productList.length))}
                                        checked={promotion.dataLength === promotionCheckboxes.length}
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