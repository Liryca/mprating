import React from "react";
import "./Tbody.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkBoxesAction } from '../../store/checkBoxes/action';
import { changePopupShow } from "../../store/popup/action";
import check from '../Popup/images/Ic_chek.svg';
import { radioButtonsAction, deletAllRadioButtonsAction, deleteRadioButtonsAction } from "../../store/radiobuttons/action";
import productImg from './images/Foto.png';
import { changeProduct } from "../../store/products/action";
import SwitchToggle from "../Switch/Switch";
import { changePopupSettingsShow} from '../../store/popupSettings/action';
import { radioButtonsSettingPrice } from '../../elements';


const Tbody = () => {

    const dispatch = useDispatch();
    const activeMode = useSelector(state => state.activeMode);
    const products = useSelector(state => state.products);
    const popup = useSelector(state => state.popup);
    const popupSettings = useSelector(state => state.popupSettings);
    const checkboxes = useSelector(state => state.checkBoxes);
    const radioButtons = useSelector(state => state.radioButtons);
    const { productList, loading } = products;
    const { mode } = activeMode;
    const { show } = popup;
    const { priceSettingRadiosWithValue } = radioButtons;
    const { useInAutoModeCheckBoxes, promotionCheckBoxes, followingStrategyCheckBoxes } = checkboxes;
   

    function changeUsedAutoMood(e, id, key, value) {
        dispatch(changeProduct(id, key, value));
        dispatch(checkBoxesAction(id, 'useInAutoModeCheckBoxes'));
        dispatch(deleteRadioButtonsAction('priceSettingRadios', 'priceSettingRadiosWithValue', id, ''));
        dispatch(changeProduct(id, 'price_mode', ''));
    }

    // async function changeProductAxios(id) {
    //     dispatch(deleteChangedProduct(id))
    //     try {
    //         const response = await fetchChangeProducts({ client_id: auth.userId, rows: productList.filter(i => i.id === id) });
    //     } catch (e) {
    //         setErrorChangedProduct(e.message)
    //     }
    // }


    // function handleCheckboxesUse(ids, key, value) {
    //     dispatch(checkBoxesAllAction(ids, 'useInAutoModeCheckBoxes'));
    //     dispatch(changeGroupProducts(ids, key, value === 'true' ? false : true));
    //     if (!useInAutoModeCheckBoxes.length) {
    //         dispatch(deletAllPriceSettingAction(ids, ''));
    //         dispatch(changeGroupProducts(ids, "price_mode", ''));
    //     }
    // }

    return (
        <tbody>
            {productList?.map((el) => {
                return (
                    <tr className="tbl__line" key={el.id}>
                        {mode === "automat" && (
                            <td className="tbl__cell notice tbody-cell1" >
                                <SwitchToggle
                                    name='useInAutoMode'
                                    onChange={(e) => changeUsedAutoMood(e, el.id, "useInAutoMode", el.useInAutoMode)}
                                    checked={!loading && useInAutoModeCheckBoxes.includes(el.id)}
                                    sx={{ m: 1 }} />
                            </td>
                        )}

                        <td className="tbl__cell tbody-cell2 "> <img src={productImg} alt="elem"></img></td>
                        <td className="tbl__cell tbody-cell3 notice "><span>{el.article}</span></td>
                        <td className="tbl__cell notice tbody-cell4 ">

                            <p className="notice">{el.wb_price}</p>
                            <p className="small-font grey">Изменено</p>
                            <p className="small-font grey"> {el.changeDate?.split(' ').join(' / ').slice(0, -3).replace(/[\-\/]/g, '.')}</p>
                        </td>

                        <td className="tbl__cell notice tbody-cell5 tbl__cell-cost_price"
                            onClick={() => dispatch(changePopupSettingsShow(popupSettings.show, el.id, el))}>
                            <div className="tbl__cell-settings">
                                <p className="tbl__cell-input">{el.costPrice}</p>
                                <div className="tbl__cell-settings-icon"></div>
                            </div>
                        </td>

                        <td className="tbl__cell notice tbody-cell6"
                            onClick={() => dispatch(changePopupSettingsShow(popupSettings.show, el.id, el))}>
                            <div className="tbl__cell-settings">
                                <p className=" tbl__cell-input" > {el.minMarginality}</p>
                                <div className="tbl__cell-settings-icon"></div>
                            </div>
                        </td>

                        <td className={mode === 'automat' ?
                            "tbl__cell notice tbody-cell7 tbl__cell-margaMax" :
                            "tbl__cell notice tbody-cell7"
                        }
                            onClick={() => dispatch(changePopupSettingsShow(popupSettings.show, el.id, el))}>
                            <div className="tbl__cell-settings">
                                <p className=" tbl__cell-input" > {el.maxMarginality}</p>
                                <div className="tbl__cell-settings-icon"></div>
                            </div>
                        </td>

                        {mode === "semi-automat" && (<td className="tbl__cell small-font tbody-cell12 tbl__cell-calc-price"
                            onClick={() => dispatch(changePopupSettingsShow(popupSettings.show, el.id, el))}>
                            <div className="tbl__cell-settings">
                                <p className="tbl__cell-input"> {el.calcPrice} </p>
                                <div className="tbl__cell-settings-icon"></div>
                            </div>
                        </td>)}

                        {mode === "semi-automat" && (
                            <td className="tbl__cell notice tbody-cell3"
                                onClick={() => dispatch(changePopupSettingsShow(popupSettings.show, el.id, el))}>
                                <div className="tbl__cell-settings">
                                    <p className=" tbl__cell-input" >{el.customPrice}</p>
                                    <div className="tbl__cell-settings-icon"></div>
                                </div>
                            </td>
                        )}

                        
                      

                        {mode === "semi-automat" && <td className="tbl__cell notice tbody-cell14 tbl__cell-settingPrice"
                            onClick={() => dispatch(changePopupSettingsShow(popupSettings.show, el.id, el))}>
                            <div className="tbl__cell-strategy-step">
                                <div className="wrapper__radio">
                                    {radioButtonsSettingPrice.map(radio => {
                                        return <label key={radio.key} className="strategy-step">
                                            <p className={priceSettingRadiosWithValue[el.id] === radio.value ?
                                                'main__radio-label notice' :
                                                'main__radio-label small-font'}>
                                                {radio.option}
                                            </p>
                                            {priceSettingRadiosWithValue[el.id] === radio.value && <img src={check} alt="check"></img>}
                                        </label>

                                    })}
                                </div>
                                <div className="tbl__cell-settings-icon"></div>
                            </div>
                        </td>}
                        <td className="tbl__cell small-font tbody-cell11 ">
                            <label className="tbl__container thead-container">
                                <button
                                    onClick={() => dispatch(changePopupShow(show, el.id, el))}
                                    className={(
                                 promotionCheckBoxes?.length&&followingStrategyCheckBoxes?.length&&promotionCheckBoxes.includes(el.id) || followingStrategyCheckBoxes.includes(el.id)) ? "tbl__button-active small-font" : 'tbl__button small-font'}
                                    type="button">
                                    Выбрать
                                </button>
                            </label>
                        </td>
                        <td className="tbl__cell small-font tbody-cell11">
                            <ul className="tbl__cell-strategy">
                                { followingStrategyCheckBoxes?.length&&followingStrategyCheckBoxes.includes(el.id) && <li>Стратегия следования</li>}
                                { promotionCheckBoxes?.length&&  promotionCheckBoxes.includes(el.id) && <li>Учавствовать в акциях</li>}
                            </ul>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

export default Tbody;


    // const changeProductGeneralSettings = (id) => {
    //     dispatch(checkBoxesAction(id, 'generalsettingsCheckBoxes'))

    //     console.log(id)

    //     // dispatch(changeProduct(activeId, 'cotrArticles', copyArticles.join()));
    //     // dispatch(changeProduct(activeId, 'shift', shift));
    //     dispatch(changeProduct(id, 'join_stocks', promotions));
    //     dispatch(checkBoxesAction(id, 'promotionCheckBoxes'));

    //     dispatch(changeProduct(id, 'followingStrategy', followingStrategy));
    //     dispatch(checkBoxesAction(id, 'followingStrategyCheckBoxes'));

    //     dispatch(changeProduct(id, 'afterEndPromotion', afterEndPromotion));
    //     dispatch(radioButtonsAction('afterEndPromotionRadios', 'afterEndPromotionRadiosWithValue', id, afterEndPromotion));

    //     dispatch(changeProduct(id, 'strategy', strategy))
    //     dispatch(radioButtonsAction('strategyRadios', 'strategyRadiosWithValue', id, strategy));
    // }

