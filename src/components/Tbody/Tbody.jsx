import React, { useState } from "react";
import "./Tbody.scss";
import { useDispatch, useSelector } from "react-redux";
import productImg from './images/Foto.png';
import SwitchToggle from "../Switch/Switch";
import Icon from "../Icon/Icon";
import { radioButtonsSettingPrice } from '../../elements';
import { changeProductThunk } from "../../store/products/action";
import check from '../PopupSettingStrategies/images/Ic_chek.svg';
import IconsSvg from './images/icons.svg';
import { Snackbar } from "@mui/material"
import { changePopupSettingsPriceShow } from '../../store/popupSettingsPrice/action';
import { changePopupSettingStrategiesShow } from "../../store/popupSettingStrategies/action";


const Tbody = () => {

    const dispatch = useDispatch();
    const clientInfo = useSelector(state => state.clientInfo);
    const products = useSelector(state => state.products);
    const { productList, isLoadingProducts } = products;
    const { modeType } = clientInfo;
    const [open, setOpen] = useState(false);

    function changeUsedAutoMood(el) {
        dispatch(changeProductThunk({ ...el, useInAutoMode: !el.useInAutoMode }));
    }

    const handleClick = (art) => {
        setOpen(true)
        navigator.clipboard.writeText(art);
    };



    return (
        <tbody>
            {productList?.map((el) => {
                return (
                    <tr className="tbl__line" key={el.id}>
                        {modeType === 'AUTO' && (
                            <td className="tbl__cell notice tbody-cell1" >
                                <SwitchToggle
                                    name='useInAutoMode'
                                    onChange={() => changeUsedAutoMood(el)}
                                    checked={!isLoadingProducts && el.useInAutoMode}
                                    sx={{ m: 1 }} />
                            </td>
                        )}

                        <td className="tbl__cell tbody-cell2 "> <img src={productImg} alt="elem"></img></td>
                        <td className="tbl__cell tbody-cell3 notice ">
                            <div className="tbl__cell-art">
                                <span>{el.article}</span>
                                <div className="tbl__cell-art-icon" >
                                <div onClick={() => handleClick(el.article)}>
                                    <Icon classN="tbl__cell-copy" id="#copy" size={17} iconsSvg={IconsSvg} />
                                    <Snackbar
                                        message="Артикул скопирован"
                                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                        autoHideDuration={1000}
                                        onClose={() => setOpen(false)}
                                        open={open}
                                    />
                                    </div>
                                    <a href={`https://global.wildberries.ru/product?card=${el.article}`} target="_blank">
                                    <Icon classN="tbl__cell-export" id="#export" size={14} iconsSvg={IconsSvg} />
                                    </a>
                                </div>
                            </div>
                        </td>
                        <td className="tbl__cell notice tbody-cell4 ">
                            <p className="notice">{el.wbPrice}</p>
                            <p className="small-font grey">Изменено</p>
                            <p className="small-font grey"> {el.changeDate?.split('T')[0]}</p>
                        </td>
                        <td className="tbl__cell notice tbody-cell5 tbl__cell-cost_price"
                            onClick={() => dispatch(changePopupSettingsPriceShow(true, el))}>
                            <div className="tbl__cell-settings">
                                <p className="tbl__cell-input">{el.costPrice}</p>
                                <div className="tbl__cell-settings-icon"></div>
                            </div>
                        </td>

                        <td className="tbl__cell notice tbody-cell6"
                            onClick={() => dispatch(changePopupSettingsPriceShow(true, el))}>
                            <div className="tbl__cell-settings">
                                <p className=" tbl__cell-input" > {el.minMarginality}</p>
                                <div className="tbl__cell-settings-icon"></div>
                            </div>
                        </td>

                        <td className={modeType === 'AUTO' ?
                            "tbl__cell notice tbody-cell7 tbl__cell-margaMax" :
                            "tbl__cell notice tbody-cell7"
                        }
                            onClick={() => dispatch(changePopupSettingsPriceShow(true, el))}>
                            <div className="tbl__cell-settings">
                                <p className=" tbl__cell-input" > {el.maxMarginality}</p>
                                <div className="tbl__cell-settings-icon"></div>
                            </div>
                        </td>


                        {modeType === 'SEMI_AUTO' && (
                            <td className="tbl__cell notice tbody-cell3"
                                onClick={() => dispatch(changePopupSettingsPriceShow(true, el))}>
                                <div className="tbl__cell-settings">
                                    <p className=" tbl__cell-input" >{el.customPrice}</p>
                                    <div className="tbl__cell-settings-icon"></div>
                                </div>
                            </td>
                        )}

                        {modeType === 'SEMI_AUTO' && <td className="tbl__cell notice tbody-cell14 tbl__cell-settingPrice"
                            onClick={() => dispatch(changePopupSettingsPriceShow(true, el))}>
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
                        {modeType === 'SEMI_AUTO' && (<td className="tbl__cell small-font tbody-cell12 tbl__cell-calc-price">
                            <div className="tbl__cell-settings">
                                <p className="tbl__cell-input"> {el.calcPrice} </p>
                            </div>
                        </td>)}

                        <td className="tbl__cell small-font tbody-cell11 ">
                            <label className="tbl__container thead-container">
                                <button
                                    onClick={() => dispatch(changePopupSettingStrategiesShow(true, el.id))}
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


