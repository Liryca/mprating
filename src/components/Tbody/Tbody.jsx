import "./Tbody.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeUsedIdAction } from "../../store/choiceIdProduct/action";
import { changePopupShow } from "../../store/popup/action";
import { promotionAction } from "../../store/choicePromotion/action";
import { priceSettingAction } from '../../store/priceSetting/action';
import { radioButtons, radioButtonsSettingPrice } from "./elementsTable";
import { checkInputValue } from "../../utils/utils";
import productImg from './images/Foto.png';
import { changeProduct, deleteChangedProduct } from "../../store/products/action";
import { fetchChangeProducts } from "../../api/services/product";



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
    const { productList, fromProducts, toProducts, loading, changedProducts } = products;
    const { strategy } = activeStrategy;
    const { activeId, show } = popup;
    const { usedCheckboxes } = usedProduct;
    const { promotionCheckboxes } = promotion;

    console.log(changedProducts)


    async function changeProductAxios(id) {
           dispatch(deleteChangedProduct(id))
        const response = await fetchChangeProducts({ client_id: auth.userId, rows: productList.filter(i => i.id === id) });
        console.log(response)
    }

    console.log(productList)

    const changeValueInput = (id, key, e) => {
        let value;
        e.target.type !== 'radio' ? value = checkInputValue(e.target.value) : value = Number(e.target.value)
        dispatch(changeProduct(id, key, value));
    }

    const changeActiveId = (id, key, value) => {
        dispatch(changeProduct(id, key, value ? false : true));
        dispatch(activeUsedIdAction(id));
    }

    const changePromotion = (id, key, value) => {
        dispatch(changeProduct(id, key, value ? false : true));
        dispatch(promotionAction(id));
    }

    const changePriceSetting = (id, key, value) => {
        console.log(Number(value))
        dispatch(changeProduct(id, key, Number(value)));
        dispatch(priceSettingAction(id, Number(value)));
    }

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
                                onClick={() => dispatch(changePopupShow(show, el.id,el))}
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
                            <button
                                className={changeProduct.length&& changedProducts.includes(el.id) ? "tbl__button-active small-font" : 'tbl__button small-font'}
                                onClick={() => changeProductAxios(el.id)}>
                                Сохранить
                            </button>
                        </td>
                    </tr>
                );
            })}

        </tbody>
    );
};

export default Tbody;

