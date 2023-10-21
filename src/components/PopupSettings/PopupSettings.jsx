import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkInputValue } from "../../utils/utils";
import './PopupSettings.scss';
import Button from "../Button/Button";
import { changeProduct } from "../../store/products/action";
import { changePopupSettingsShow } from "../../store/popupSettings/action";
import { deleteCheckBoxdAction } from "../../store/checkBoxes/action";
import { radioButtonsAction } from "../../store/radiobuttons/action";
import { radioButtonsSettingPrice } from "../../elements";




const PopupSettings = () => {

    const dispatch = useDispatch();
    const popupSettings = useSelector(state => state.popupSettings);
    const mode = useSelector(state => state.activeMode);
    const radioButtons = useSelector(state => state.radioButtons);
    const { activeId, el, active } = popupSettings;
    const { priceSettingRadiosWithValue } = radioButtons;
    const [valueCostPrice, setValueCostPrice] = useState();
    const [minMarginality, setMinMarginality] = useState();
    const [maxMarginality, setMaxMarginality] = useState();
    const [customPrice, setCustomPrice] = useState(0);
    const product = useSelector(state => state.products.productList);

    useEffect(() => {
        setValueCostPrice(el?.costPrice);
        setMaxMarginality(el?.maxMarginality);
        setMinMarginality(el?.minMarginality);
        setCustomPrice(el?.customPrice);
    }, [el])



    const changePriceSetting = (id, value) => {
        dispatch(radioButtonsAction('priceSettingRadios', 'priceSettingRadiosWithValue', id, value));
        dispatch(changeProduct(activeId, "useInAutoMode", false));
        dispatch(deleteCheckBoxdAction(activeId, 'useInAutoModeCheckBoxes'));

    }

    const toggleStatePopup = (e) => {

        dispatch(changePopupSettingsShow(active, ''))
        dispatch(changeProduct(activeId, 'costPrice', valueCostPrice));
        dispatch(changeProduct(activeId, 'minMarginality', minMarginality));
        dispatch(changeProduct(activeId, 'maxMarginality', maxMarginality));
        dispatch(changeProduct(activeId, 'customPrice', customPrice));
        dispatch(changeProduct(activeId, 'priceMode', priceSettingRadiosWithValue[activeId]));

        setValueCostPrice(0);
        setMaxMarginality(0);
        setMinMarginality(0);
        setCustomPrice(0)
    }

    const cancelChanged = () => {

    }

    return (
        <div className={active ? 'popupSettings-active' : 'popupSettings'}>
            <div className='popupSettings__wrapper'>
                <div className={mode.mode === 'automat' ? 'popupSettings__content' : 'popupSettings__content-wide'}>
                    <div className="popupSettings__title">
                        <h2 className='notice'>  {`Установить стратегию для артикула: ${el?.article}`} </h2>
                    </div>
                    <div className="popupSettings__set-content">
                        <div className={mode.mode === 'automat' ? "popupSettings__main" : "popupSettings__main-wide"}>
                            <label className="popupSettings__state popupSettings__costPrice">
                                <p className="main-font dark-grey hyphens">Себе-<br />стоимость</p>
                                <input
                                    value={valueCostPrice}
                                    onChange={(e) => setValueCostPrice(checkInputValue(e.target.value))}
                                    className="main-font"
                                    type="text"
                                    name='cost_price'
                                    placeholder="000">
                                </input>
                            </label>
                            <label className="popupSettings__state popupSettings__minMarginality">
                                <p className="main-font  dark-grey">Маржа<br />(мин), руб</p>
                                <input
                                    value={minMarginality}
                                    onChange={(e) => setMinMarginality(checkInputValue(e.target.value))}
                                    className=" main-font"
                                    type="text"
                                    name="minMarzha"
                                    placeholder="000">
                                </input>
                            </label>
                            <label className="popupSettings__state popupSettings__maxMarginality">
                                <p className="main-font  dark-grey">Маржа<br />(макс), руб</p>
                                <input
                                    name='maxMarzha'
                                    value={maxMarginality}
                                    onChange={(e) => setMaxMarginality(checkInputValue(e.target.value))}
                                    className=" main-font"
                                    type="text"
                                    placeholder="000">
                                </input>
                            </label>
                            {mode.mode === "semi-automat" && (
                                <label className="popupSettings__state popupSettings__customPrice">
                                    <p className="main-font  dark-grey"> Своя<br />цена, руб</p>
                                    <input
                                        name="ownPrice"
                                        value={customPrice}
                                        onChange={(e) => setCustomPrice(checkInputValue(e.target.value))}
                                        className=" main-font"
                                        type="text"
                                        placeholder="000">
                                    </input>
                                </label>
                            )}
                            {mode.mode === "semi-automat" && (
                                <div className=" popupSettings__state-price-mode"><div><p className="main-font  dark-grey"> Установка</p>
                                    <p className="main-font dark-grey">цены, руб</p></div><div className="wrapper__radio">
                                        {radioButtonsSettingPrice.map(radio => {
                                            return <label key={radio.key} className="strategy-step">
                                                <input
                                                    className='main-font'
                                                    name={radio.key + el?.id}
                                                    type='radio'
                                                    value={radio.value}
                                                    onChange={(e) => changePriceSetting(el.id, e.target.value)}
                                                    checked={priceSettingRadiosWithValue[el?.id] === radio.value}>
                                                </input>
                                                <p className={priceSettingRadiosWithValue[el?.id] === radio.value ?
                                                    'main__radio-label notice' :
                                                    'main__radio-label small-font'}>
                                                    {radio.option}
                                                </p>
                                            </label>;
                                        })}
                                    </div></div>)}
                        </div>
                    </div>
                    <Button fn={toggleStatePopup} text={'Сохранить'} classN={'but-start popupSettings__but'} />
                    <Button fn={cancelChanged} text={'Отменить'} classN={'but-start popup__cancelChange'} />
                </div>
            </div>
        </div>

    );
};

export default PopupSettings;