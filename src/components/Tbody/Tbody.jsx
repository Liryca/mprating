import "./Tbody.scss";
import React from "react";
import { data } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import { activeUsedIdAction } from "../../store/choiceIdProduct/action";
import { changePopupShow } from "../../store/popup/action";
import { promotionAction } from "../../store/choicePromotion/action";
import { priceSettingAction } from '../../store/priceSetting/action';
import { radioButtons, radioButtonsSettingPrice } from "./elementsTable";
import { checkInputValue } from "../../utils/utils";
import productImg from './images/Foto.png';
import { changeProduct } from "../../store/products/action";


const Tbody = () => {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { activeStrategy, usedProduct, promotion, priceSetting, products, auth, apiKey, popup } = state;
    const { activeRadiosWithValue } = priceSetting;
    const { productList, fromProducts, toProducts, loading } = products;
    const { strategy } = activeStrategy;
    const { activeId, show } = popup;
    const { usedCheckboxes } = usedProduct;
    const { promotionCheckboxes } = promotion;


    const changeValueInput = (id, key, e) => {
        let value;
        e.target.type !== 'radio' ? value = checkInputValue(e.target.value) : value = e.target.value
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
        console.log(key, value)
        dispatch(changeProduct(id, key, value));
        dispatch(priceSettingAction(id, value))
    }

    return (
        <tbody>
            {productList?.map((el) => {
                return (

                    <tr className="tbl__line" key={el.id}>

                        {/* доделать====================================================================================================== */}

                        {strategy === "automat" && (
                            <td className="tbl__cell notice tbody-cell1" >
                                <label className="tbl__container">
                                    <input
                                        onChange={() => changeActiveId(el.id, "used", el.used)}
                                        type="checkbox"
                                        value={el.used}
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
                            <p className="notice">{el.wb}</p>
                            <p className="small-font grey">Изменено</p>
                            {/* <p className="small-font grey"> {el.change_date.split(' ').join(' / ').slice(0,-3).replace(/[\-\/]/g,'.')}</p> */}

                        </td>

                        {/* ================================================================================== */}

                        <td className="tbl__cell notice tbody-cell5">
                            <input
                                value={el.coast_price}
                                onChange={(e) => changeValueInput(el.id, "coast_price", e)}
                                className=" tbl__cell-input"
                                type="text"
                                name='coast_price'
                                placeholder="000">
                            </input>
                        </td>
                        <td className="tbl__cell notice tbody-cell6">
                            <input
                                value={el.minMarzha}
                                onChange={(e) => changeValueInput(el.id, "minMarzha", e)}
                                className=" tbl__cell-input"
                                type="text"
                                name="minMarzha"
                                placeholder="000">
                            </input>
                        </td>
                        <td className="tbl__cell notice tbody-cell7">
                            <input
                                name='maxMarzha'
                                value={el.maxMarzha}
                                onChange={(e) => changeValueInput(el.id, "maxMarzha", e)}
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
                                  onChange={() => changePromotion(el.id, "promotion", el.promotion)}
                                    type="checkbox"
                                    name="promotion"
                                    value={el.promotion}
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

                        {/* ========================================================================================== */}

                        {strategy === "semi-automat" && (
                            <td className="tbl__cell small-font tbody-cell12">000</td>
                        )}

                        {/*    ========================================================================================== */}

                        {strategy === "semi-automat" && (
                            <td className="tbl__cell notice tbody-cell3">
                                <input
                                    name="ownPrice"
                                    value={el.ownPrice}
                                    onChange={(e) => changeValueInput(el.id, "ownPrice", e)}
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
                                             onChange={() => changePriceSetting(el.id, "setPrice", radio.value)}
                                            checked={activeRadiosWithValue[el.id] === radio.value} >
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
                    </tr>
                );
            })}

        </tbody>
    );
};

export default Tbody;

