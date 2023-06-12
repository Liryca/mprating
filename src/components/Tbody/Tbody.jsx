import "./Tbody.scss";
import React, { useState, useEffect } from "react";
import { data } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import { activeIdAction } from "../../store/choiceIdProduct/action";
import { enteredValuesAction } from "../../store/enteredValues/action";
import { changePopupShow } from "../../store/popup/action";
import { promotionAction } from "../../store/choicePromotion/action";
import { priceSettingAction } from '../../store/priceSetting/action';
import { increaseAction } from "../../store/products/action";
import { decreaseAction } from "../../store/products/action";

const radioButtons = [
    { option: "Мин", key: "Min" },
    { option: "Сред", key: "Middle" },
    { option: "Mакс", key: "Max" },
];

const radioButtonsSettingPrice = [
    { option: "Своя", key: "Own" },
    { option: "Рекоменд", key: "Recomend" },
    { option: "Не менять", key: "Default" },
];

const Tbody = () => {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { activeStrategy, activeId, enteredValues, popup, promotion, priceSetting } = state;
    // console.log(priceSetting)


function fn(id,dataLength,key){
    console.log(id)
     dispatch(priceSettingAction( id,dataLength,key))

}

    function togglePageAhead() {
        dispatch(increaseAction())
    }

    function togglePageBack() {
    dispatch(decreaseAction())  
    }


    function changeValueInput(id, key, e) {
        let value
        if (e.target.type !== 'radio') {
            console.log(e.target)
            value = e.target.value.replace(/[^\d.]/g, "");
        } else {
            value = e.target.value
        }
        dispatch(enteredValuesAction(id, key, value));
    }

    const openPopup = (id) => {
        dispatch(changePopupShow(popup.show, id))
        // dispatch(enteredValuesAction(id,key))
    }

    return (
        <tbody>
            {/* <button onClick={togglePageBack}>Назад</button>
            <button onClick={togglePageAhead}>Вперед</button> */}
            {data.map((el) => {
                return (
                    <tr className="tbl__line" key={el.id}>

                        {/* ====================================================================================================== */}

                        {activeStrategy.strategy === "automat" && (
                            <td className="tbl__cell notice tbody-cell1" >
                                <label className="tbl__container">
                                    <input
                                        onChange={() => dispatch(activeIdAction(el.id, data.length))}
                                        // className={check === index ? 'tbl__choice-active' : 'tbl__choice'}
                                        type="checkbox"
                                        value={el.id}
                                        id={el.id}
                                        checked={activeId.checkboxes.includes(el.id)}
                                    ></input>
                                </label>
                            </td>
                        )}
                        {/* ============================================================================================================= */}
                        <td className="tbl__cell tbody-cell2 "> <img src={el.img} alt="elem"></img></td>

                        <td className="tbl__cell tbody-cell3 notice "><span>{el.art}</span></td>

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
                                {radioButtons.map((radio,index)=> {
                                    return (
                                        <div key={index} >
                                            <label className="strategy-step">
                                                <input
                                                    onChange={(e) => changeValueInput(el.id, "followingStrategy", e)}
                                                    className=""
                                                    type='radio'
                                                    value={radio.option}
                                                    checked={enteredValues[el.id] ? enteredValues[el.id].followingStrategy === radio.option : false}>
                                                </input>
                                                <span className="checkmark"></span>
                                                <p className={(enteredValues[el.id] ? enteredValues[el.id].followingStrategy === radio.option : false) ?
                                                    'main__radio-label notice' : 'main__radio-label small-font'}>{radio.option}</p>
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </td>

                        {/* =========================================================================================================================================== */}

                        <td className="tbl__cell tbody-cell9 notice tbl__cell-text">00</td>

                        {/* ============================================================================================================================================ */}


                        <td className="tbl__cell notice tbody-cell10 ">
                            <label className="tbl__container">
                                <input onChange={() => dispatch(promotionAction((el.id), data.length))}
                                    type="checkbox"
                                    name="promotion"
                                    value={el.id}
                                    checked={promotion.checkboxes.includes(el.id)}
                                ></input>
                            </label>
                        </td>

                        {/* =============================================================================================================================================== */}

                        <td className="tbl__cell small-font tbody-cell11 ">
                            <button onClick={() => openPopup(el.id)} className={(popup.show && popup.activeId === el.id) ? "tbl__button-active small-font" : 'tbl__button small-font'} type="button">
                                {popup.show && popup.activeId === el.id ? 'Изменить' : 'Загрузить'}
                            </button>
                        </td>

                        {activeStrategy.strategy === "semi-automat" && (
                            <td className="tbl__cell small-font tbody-cell12">000</td>
                        )}
                        
                        {activeStrategy.strategy === "semi-automat" && (
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

                          
                            

                        {activeStrategy.strategy === "semi-automat" && <td className="tbl__cell notice tbody-cell14 ">
                            <div className="wrapper__radio">
                                {radioButtonsSettingPrice.map(radio => {
                                    return <label key={radio.key} className="strategy-step">
                                        <input
                                            // name="strategy-step"
                                            className=""
                                            type='radio'
                                            value={radio.key}
                                            onChange={() =>fn(el.id,data.length,radio.key)}
                                            checked={priceSetting.radios[el.id]===radio.key} >
                                        </input>

                                        <p className={priceSetting.radios[el.id] === radio.key? 'main__radio-label notice' : 'main__radio-label small-font'}>{radio.option}</p>
                                    </label>

                                })}
                            </div>

                        </td>}

                    </tr>
                );
            })}

        </tbody>
    );
};

export default Tbody;

