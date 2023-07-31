import "./Tbody.scss";
import React, { useCallback, useMemo, useEffect } from "react";
import { data } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import { activeUsedIdAction } from "../../store/choiceIdProduct/action";
import { changePopupShow } from "../../store/popup/action";
import { promotionAction } from "../../store/choicePromotion/action";
import { priceSettingAction } from '../../store/priceSetting/action';
import { radioButtons, radioButtonsSettingPrice } from "./elementsTable";
import { checkInputValue } from "../../utils/utils";
import productImg from './images/Foto.png';
import { debounce } from "lodash";
import { changeProduct } from "../../store/products/action";
import { fetchChangeProducts } from "../../api/services/product";
import { useState } from "react";



const Tbody = () => {

    const dispatch = useDispatch();
    const activeStrategy = useSelector(state => state.activeStrategy);
    const products = useSelector(state => state.products);
    const popup = useSelector(state => state.popup);
    const priceSetting = useSelector(state => state.priceSetting);
    const promotion = useSelector(state => state.promotion);
    const usedProduct = useSelector(state => state.usedProduct);
    const auth = useSelector(state => state.auth);

    const { activeRadiosWithValue } = priceSetting;
    const { productList, fromProducts, toProducts, loading } = products;
    const { strategy } = activeStrategy;
    const { activeId, show } = popup;
    const { usedCheckboxes } = usedProduct;
    const { promotionCheckboxes } = promotion;
    const [val, setval] = useState({});

    // const sendQuery = useCallback((obj) => {
    //     const response = fetchChangeProducts(obj);
    //     console.log(response)
    // }, []);

    // const debouncedSendQuery = useMemo(() => {
    //     return debounce(sendQuery, 500);
    // }, [sendQuery]);

    async function changeProductAxios(id) {
        const response = await fetchChangeProducts({ client_id: auth.userId, rows: productList.filter(i => i.id === id) });
        setval((prev) => {
            return {
                ...prev,
                [id]: 'done'
            }
        }
        )

        console.log(response)
    }

console.log(val)

    const changeValueInput = (id, key, e) => {

        let value;
        e.target.type !== 'radio' ? value = checkInputValue(e.target.value) : value = Number(e.target.value)
        console.log(value)
        dispatch(changeProduct(id, key, value));
        // debouncedSendQuery({ client_id: auth.userId, rows: productList.filter(i => i.id === id) })
    }

    const changeActiveId = (id, key, value) => {
        dispatch(changeProduct(id, key, value ? false : true));
        dispatch(activeUsedIdAction(id));
        // debouncedSendQuery({ client_id: auth.userId, rows: productList.filter(i => i.id === id) })
    }

    const changePromotion = (id, key, value) => {
        dispatch(changeProduct(id, key, value ? false : true));
        dispatch(promotionAction(id));
        // debouncedSendQuery({ client_id: auth.userId, rows: productList.filter(i => i.id === id) })
    }

    const changePriceSetting = (id, key, value) => {
        console.log(Number(value))
        dispatch(changeProduct(id, key, Number(value)));
        dispatch(priceSettingAction(id, Number(value)));
        // debouncedSendQuery({ client_id: auth.userId, rows: productList.filter(i => i.id === id) })
    }

    //     "client_id": 1,
    //     "rows": [
    //         {
    //             "calcPrice": 0,
    //             "custom_price": 0,
    //             "useInAutoMode": true,
    //             "change_date": "2023-07-27 09:06:50",
    //             "maxMarginality": 0,
    //             "shift": 0,
    //             "discount": 82,
    //             "cost_price": 0,
    //             "client_id": 1,
    //             "article": 81310124,
    //             "join_stocks": false,
    //             "logistic": -2,
    //             "commission": 17,
    //             "id": 81310124,
    //             "current_price": 0,
    //             "strategy": 0,
    //             "minMarginality": 0,
    //             "cotrArticles": "",
    //             "wb_price": 1,
    //             "price_mode": 1
    //         }
    //     ]
    // }'


    return (
        <tbody>
            {productList?.map((el) => {
                return (

                    <tr className="tbl__line" key={el.id}>

                        {/*====================================================================================================== */}

                        {strategy === "automat" && (
                            <td className="tbl__cell notice tbody-cell1" >
                                <label className="tbl__container">
                                    <input
                                        onChange={() => changeActiveId(el.id, "useInAutoMode", el.useInAutoMode)}
                                        type="checkbox"
                                        value={el.useInAutoMode}
                                        id={el.id}
                                        checked={!loading && usedCheckboxes.includes(el.id)}>
                                    </input>
                                </label>
                            </td>
                        )}

                        {/* ============================================================================================================= */}

                        <td className="tbl__cell tbody-cell2 "> <img src={productImg} alt="elem"></img></td>

                        {/* ============================================================================================================= */}

                        <td className="tbl__cell tbody-cell3 notice "><span>{el.article}</span></td>

                        {/* ============================================================================================================= */}

                        <td className="tbl__cell notice tbody-cell4 ">
                            <p className="notice">{el.wb_price}</p>
                            <p className="small-font grey">Изменено</p>
                            <p className="small-font grey"> {el.change_date.split(' ').join(' / ').slice(0, -3).replace(/[\-\/]/g, '.')}</p>

                        </td>

                        {/* ================================================================================== */}

                        <td className="tbl__cell notice tbody-cell5">
                            <input
                                value={el.cost_price}
                                onChange={(e) => changeValueInput(el.id, "cost_price", e)}
                                className=" tbl__cell-input"
                                type="text"
                                name='cost_price'
                                placeholder="000">
                            </input>
                        </td>
                        <td className="tbl__cell notice tbody-cell6">
                            <input
                                value={el.minMarginality}
                                onChange={(e) => changeValueInput(el.id, "minMarginality", e)}
                                className=" tbl__cell-input"
                                type="text"
                                name="minMarzha"
                                placeholder="000">
                            </input>
                        </td>
                        <td className="tbl__cell notice tbody-cell7">
                            <input
                                name='maxMarzha'
                                value={el.maxMarginality}
                                onChange={(e) => changeValueInput(el.id, "maxMarginality", e)}
                                className=" tbl__cell-input"
                                type="text"
                                placeholder="000">
                            </input>
                        </td>

                        {/* =========================================================================================================================== */}

                        <td className="tbl__cell notice tbody-cell8">
                            <div className="wrapper__radio">
                                {radioButtons.map((radio, index) => {
                                    return (
                                        <div key={index} >
                                            <label className="strategy-step">
                                                <input
                                                    onChange={(e) => changeValueInput(el.id, "strategy", e)}
                                                    name={radio.option + el.id}
                                                    className=""
                                                    type='radio'
                                                    value={radio.value}
                                                    checked={el.strategy === radio.value}>
                                                </input>
                                                <p className={el.strategy === radio.value ?
                                                    'main__radio-label notice' : 'main__radio-label small-font'}>{radio.option}</p>
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </td>

                        {/* =========================================================================================================================================== */}

                        <td className="tbl__cell tbody-cell9 notice tbl__cell-text">
                            <input
                                name='step'
                                value={el.shift}
                                onChange={(e) => changeValueInput(el.id, "shift", e)}
                                className=" tbl__cell-input"
                                type="text"
                                placeholder="000">
                            </input>
                        </td>

                        {/* ============================================================================================================================================ */}

                        <td className="tbl__cell notice tbody-cell10 ">
                            <label className="tbl__container">
                                <input
                                    onChange={() => changePromotion(el.id, "join_stocks", el.join_stocks)}
                                    type="checkbox"
                                    name="promotion"
                                    value={el.join_stocks}
                                    checked={!loading && promotionCheckboxes.includes(el.id)}
                                ></input>
                            </label>
                        </td>

                        {/* ========================================================================================== */}

                        <td className="tbl__cell small-font tbody-cell11 ">
                            <button
                                onClick={() => dispatch(changePopupShow(show, el.id))}
                                className={(show && activeId === el.id) ? "tbl__button-active small-font" : 'tbl__button small-font'}
                                type="button">
                                {show && activeId === el.id ? 'Изменить' : 'Загрузить'}
                            </button>
                        </td>
                        {/* cotrArticles */}

                        {/* ========================================================================================== */}

                        {strategy === "semi-automat" && (
                            <td className="tbl__cell small-font tbody-cell12">{el.calcPrice}</td>
                        )}

                        {/*    ========================================================================================== */}

                        {strategy === "semi-automat" && (
                            <td className="tbl__cell notice tbody-cell3">
                                <input
                                    name="ownPrice"
                                    value={el.custom_price}
                                    onChange={(e) => changeValueInput(el.id, "custom_price", e)}
                                    className=" tbl__cell-input"
                                    type="text"
                                    placeholder="000">
                                </input>
                            </td>
                        )}

                        {/* ==================================================================================================================================== */}

                        {strategy === "semi-automat" && <td className="tbl__cell notice tbody-cell14 ">

                            <div className="wrapper__radio">
                                {radioButtonsSettingPrice.map(radio => {
                                    return <label key={radio.key} className="strategy-step">
                                        <input
                                            name={radio.key + el.id}
                                            className=""
                                            type='radio'
                                            value={radio.value}
                                            onChange={() => changePriceSetting(el.id, "price_mode", radio.value)}
                                            checked={activeRadiosWithValue[el.id] === radio.value}>
                                        </input>
                                        <p className={activeRadiosWithValue[el.id] === radio.value ?
                                            'main__radio-label notice' :
                                            'main__radio-label small-font'}>
                                            {radio.option}
                                        </p>
                                    </label>
                                })}
                            </div>
                        </td>}


                        {/* ====================================================================================================================================  */}
                        <td className="tbl__cell small-font ">
                            <button style={val[el.id]!=='done'?{ background: '#2e7b60', color: '#ffffff' }: {background: 'grey', color: '#ffffff' }}
                             className="tbl__button small-font notice " onClick={() => changeProductAxios(el.id)}>Сохранить</button>
                        </td>
                    </tr>
                );
            })}

        </tbody>
    );
};

export default Tbody;

