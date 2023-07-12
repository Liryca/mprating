import "./Tbody.scss";
import React from "react";
import { data } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import { activeUsedIdAction } from "../../store/choiceIdProduct/action";
import { enteredValuesAction } from "../../store/enteredValues/action";
import { changePopupShow } from "../../store/popup/action";
import { promotionAction } from "../../store/choicePromotion/action";
import { priceSettingAction } from '../../store/priceSetting/action';
import { radioButtons, radioButtonsSettingPrice } from "./elementsTable";
import { checkInputValue } from "../../utils/utils";
import { Oval } from 'react-loader-spinner';

const Tbody = () => {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { activeStrategy, usedProduct, enteredValues, popup, promotion, priceSetting, products } = state;
    const { activeRadiosWithValue } = priceSetting;
    const { productList, fromProducts, toProducts, loading } = products;
    const { strategy } = activeStrategy;
    const { usedCheckboxes } = usedProduct;
    const { promotionCheckboxes } = promotion;
    const { show, activeId } = popup;

    function changeValueInput(id, key, e) {
        let value;
        if (e.target.type !== 'radio') {
            value = checkInputValue(e.target.value)
        } else {
            value = e.target.value
        }
        dispatch(enteredValuesAction(id, key, value));
    }

    // if (loading) {
    //     return <Oval
    //         height={80}
    //         width={80}
    //         color="#4fa94d"
    //         wrapperStyle={{}}
    //         wrapperClass="wrapper-spiner"
    //         visible={true}
    //         ariaLabel='oval-loading'
    //         secondaryColor="#2e7b60"
    //         strokeWidth={2}
    //         strokeWidthSecondary={2}/>
    // }

    return (
        <tbody>
            {productList.slice(fromProducts, toProducts).map((el) => {
                return (

                    <tr className="tbl__line" key={el.id}>

                        {/* ====================================================================================================== */}

                        {strategy === "automat" && (
                            <td className="tbl__cell notice tbody-cell1" >
                                <label className="tbl__container">
                                    <input
                                        onChange={() => dispatch(activeUsedIdAction(el.id, productList.length))}
                                        type="checkbox"
                                        value={el.id}
                                        id={el.id}
                                        checked={!loading && usedCheckboxes.includes(el.id)}>
                                    </input>
                                </label>
                            </td>
                        )}

                        {/* ============================================================================================================= */}

                        <td className="tbl__cell tbody-cell2 "> <img src={el.img} alt="elem"></img></td>

                        {/* ============================================================================================================= */}

                        <td className="tbl__cell tbody-cell3 notice "><span>{el.art}</span></td>

                        {/* ============================================================================================================= */}

                        <td className="tbl__cell notice tbody-cell4 ">
                            {el.cost.map((i, index) => {
                                return (<p className={index === 0 ? "notice" : "small-font grey"} key={index}>{i}</p>);
                            })}
                        </td>

                        {/* ================================================================================== */}

                        <td className="tbl__cell notice tbody-cell5">
                            <input
                                value={enteredValues[el.id] ? enteredValues[el.id].costPrice : ""}
                                onChange={(e) => changeValueInput(el.id, "costPrice", e)}
                                className=" tbl__cell-input"
                                type="text"
                                name='costPrice'
                                placeholder="000">

                            </input>
                        </td>
                        <td className="tbl__cell notice tbody-cell6">
                            <input
                                value={enteredValues[el.id] ? enteredValues[el.id].minMarzha : ""}
                                onChange={(e) => changeValueInput(el.id, "minMarzha", e)}
                                className=" tbl__cell-input"
                                type="text"
                                name="minMarzha"
                                placeholder="000" >
                            </input>
                        </td>
                        <td className="tbl__cell notice tbody-cell7">
                            <input
                                name='axMarzha'
                                value={enteredValues[el.id] ? enteredValues[el.id].maxMarzha : ""}
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
                                                    onChange={(e) => changeValueInput(el.id, "followingStrategy", e)}
                                                    name={radio.option + el.id}
                                                    className=""
                                                    type='radio'
                                                    value={radio.option}
                                                    checked={enteredValues[el.id] ?
                                                        enteredValues[el.id].followingStrategy === radio.option
                                                        : false
                                                    }>
                                                </input>
                                                <p className={(enteredValues[el.id] ?
                                                    enteredValues[el.id].followingStrategy === radio.option
                                                    : false) ?
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
                                value={enteredValues[el.id] ? enteredValues[el.id].step : ""}
                                onChange={(e) => changeValueInput(el.id, "step", e)}
                                className=" tbl__cell-input"
                                type="text"
                                placeholder="000">
                            </input>
                        </td>

                        {/* ============================================================================================================================================ */}

                        <td className="tbl__cell notice tbody-cell10 ">
                            <label className="tbl__container">
                                <input onChange={() => dispatch(promotionAction((el.id), productList.length))}
                                    type="checkbox"
                                    name="promotion"
                                    value={el.id}
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
                                    value={enteredValues[el.id] ? enteredValues[el.id].ownPrice : ""}
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
                                            name={radio.key+el.id}
                                            className=""
                                            type='radio'
                                            value={radio.key}
                                            onChange={() => dispatch(priceSettingAction(el.id, radio.key))}
                                            checked={activeRadiosWithValue[el.id] === radio.key} >
                                        </input>
                                        <p
                                            className={activeRadiosWithValue[el.id] === radio.key ?
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

