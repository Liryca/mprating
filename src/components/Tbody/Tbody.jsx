import React from "react";
import "./Tbody.scss";
import { useDispatch, useSelector } from "react-redux";
import { changePopupShow } from "../../store/popup/action";
import check from '../Popup/images/Ic_chek.svg';
import productImg from './images/Foto.png';
import SwitchToggle from "../Switch/Switch";
import { changePopupSettingsShow } from '../../store/popupSettings/action';
import { radioButtonsSettingPrice } from '../../elements';
import { changeProductThunk } from "../../store/products/action";



const Tbody = () => {

    const dispatch = useDispatch();
    const activeMode = useSelector(state => state.activeMode);
    const products = useSelector(state => state.products);
    const popup = useSelector(state => state.popup);
    const popupSettings = useSelector(state => state.popupSettings);
    const { productList, isLoadingProducts } = products;
    const { mode } = activeMode;
    const { show } = popup;


    function changeUsedAutoMood(el) {
        dispatch(changeProductThunk({ ...el, useInAutoMode: !el.useInAutoMode, priceMode:0 }));
    }


    return (
        <tbody>
            {productList?.map((el) => {
                return (
                    <tr className="tbl__line" key={el.id}>
                        {mode === "automat" && (
                            <td className="tbl__cell notice tbody-cell1" >
                                <SwitchToggle
                                    name='useInAutoMode'
                                    onChange={() => changeUsedAutoMood(el)}
                                    checked={!isLoadingProducts && el.useInAutoMode}
                                    sx={{ m: 1 }} />
                            </td>
                        )}

                        <td className="tbl__cell tbody-cell2 "> <img src={productImg} alt="elem"></img></td>
                        <td className="tbl__cell tbody-cell3 notice "><span>{el.article}</span></td>
                        <td className="tbl__cell notice tbody-cell4 ">

                            <p className="notice">{el.wbPrice}</p>
                            <p className="small-font grey">Изменено</p>
                            <p className="small-font grey"> {el.changeDate?.split('T')[0]}</p>

                        </td>

                        <td className="tbl__cell notice tbody-cell5 tbl__cell-cost_price"
                            onClick={() => dispatch(changePopupSettingsShow(popupSettings.show, el))}>
                            <div className="tbl__cell-settings">
                                <p className="tbl__cell-input">{el.costPrice}</p>
                                <div className="tbl__cell-settings-icon"></div>
                            </div>
                        </td>

                        <td className="tbl__cell notice tbody-cell6"
                            onClick={() => dispatch(changePopupSettingsShow(popupSettings.show, el))}>
                            <div className="tbl__cell-settings">
                                <p className=" tbl__cell-input" > {el.minMarginality}</p>
                                <div className="tbl__cell-settings-icon"></div>
                            </div>
                        </td>

                        <td className={mode === 'automat' ?
                            "tbl__cell notice tbody-cell7 tbl__cell-margaMax" :
                            "tbl__cell notice tbody-cell7"
                        }
                            onClick={() => dispatch(changePopupSettingsShow(popupSettings.show, el))}>
                            <div className="tbl__cell-settings">
                                <p className=" tbl__cell-input" > {el.maxMarginality}</p>
                                <div className="tbl__cell-settings-icon"></div>
                            </div>
                        </td>

                        {mode === "semi-automat" && (<td className="tbl__cell small-font tbody-cell12 tbl__cell-calc-price"
                            onClick={() => dispatch(changePopupSettingsShow(popupSettings.show, el))}>
                            <div className="tbl__cell-settings">
                                <p className="tbl__cell-input"> {el.calcPrice} </p>
                                <div className="tbl__cell-settings-icon"></div>
                            </div>
                        </td>)}

                        {mode === "semi-automat" && (
                            <td className="tbl__cell notice tbody-cell3"
                                onClick={() => dispatch(changePopupSettingsShow(popupSettings.show, el))}>
                                <div className="tbl__cell-settings">
                                    <p className=" tbl__cell-input" >{el.customPrice}</p>
                                    <div className="tbl__cell-settings-icon"></div>
                                </div>
                            </td>
                        )}

                        {mode === "semi-automat" && <td className="tbl__cell notice tbody-cell14 tbl__cell-settingPrice"
                            onClick={() => dispatch(changePopupSettingsShow(popupSettings.show, el))}>
                            <div className="tbl__cell-strategy-step">
                                <div className="wrapper__radio">
                                    {radioButtonsSettingPrice.map(radio => {
                                        return <label key={radio.key} className="strategy-step">
                                            <p className={el?.priceMode === radio.value ?
                                                'main__radio-label notice' :
                                                'main__radio-label small-font'}>
                                                {radio.option}
                                            </p>
                                            {el.priceMode === radio.value && <img src={check} alt="check"></img>}
                                        </label>

                                    })}
                                </div>
                                <div className="tbl__cell-settings-icon"></div>
                            </div>
                        </td>}
                        <td className="tbl__cell small-font tbody-cell11 ">
                            <label className="tbl__container thead-container">
                                <button
                                    onClick={() => dispatch(changePopupShow(show, el))}
                                    className={(el.followingStrategy || el.joinStocks) ?
                                        "tbl__button-active small-font" :
                                        'tbl__button small-font'}
                                    type="button">
                                    Выбрать
                                </button>
                            </label>
                        </td>
                        <td className="tbl__cell small-font tbody-cell11">
                            <ul className="tbl__cell-strategy">
                                {el.followingStrategy && <li>Стратегия следования</li>}
                                {el.joinStocks && <li>Учавствовать в акциях</li>}
                            </ul>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

export default Tbody;


