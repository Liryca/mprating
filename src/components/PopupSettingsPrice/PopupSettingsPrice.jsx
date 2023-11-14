import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkInputValue } from "../../utils/utils";
import './PopupSettingsPrice.scss';
import Button from "../Button/Button";
import { changePopupSettingsPriceShow } from "../../store/popupSettingsPrice/action";
import { radioButtonsSettingPrice } from "../../elements";
import { verefyValue } from "../../utils/utils";
import { changeProductThunk } from "../../store/products/action";


const PopupSettingsPrice = () => {

    const dispatch = useDispatch();
    const popupSettings = useSelector(state => state.popupSettingsPrice);
    const mode = useSelector(state => state.activeMode);
    const { active, el } = popupSettings;
    const [product, setProduct] = useState({})

    useEffect(() => {
        setProduct(el)
    }, [el])


    function changeProduct(key, value) {
        setProduct((prev) => {
            // if (key === 'priceMode') {
            //     return {
            //         ...prev,
            //         [key]: value,
            //         useInAutoMode: false
            //     }
            // } else {
                return {
                    ...prev,
                    [key]: value
                }
            // }

        })
    }

    const saveChangedProduct = () => {
        dispatch(changePopupSettingsPriceShow(active, ''))
        dispatch(changeProductThunk(product))
    }

    const cancelChanges = () => {
        dispatch(changePopupSettingsPriceShow(active, ''))
    }

    return (
        <div className={active ? 'popupSettings-active' : 'popupSettings'}>
            <div className='popupSettings__wrapper'>
                <div className={mode.mode === 'automat' ? 'popupSettings__content' : 'popupSettings__content-wide'}>
                    <div className="popupSettings__title">
                        <h2 className='notice'>  {`Установить стратегию для артикула: ${product?.article}`} </h2>
                    </div>
                    <div className="popupSettings__set-content">
                        <div className={mode.mode === 'automat' ? "popupSettings__main" : "popupSettings__main-wide"}>
                            <label className="popupSettings__state popupSettings__costPrice">
                                <p className="main-font dark-grey hyphens">Себе-<br />стоимость</p>
                                <input
                                    value={product?.costPrice}
                                    onChange={(e) => changeProduct('costPrice', checkInputValue(e.target.value))}
                                    className="main-font"
                                    type="text"
                                    name='cost_price'
                                    placeholder="000">
                                </input>
                            </label>
                            <label className="popupSettings__state popupSettings__minMarginality">
                                <p className="main-font  dark-grey">Маржа<br />(мин), руб</p>
                                <input
                                    value={product?.minMarginality}
                                    onChange={(e) => changeProduct('minMarginality', checkInputValue(e.target.value))}
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
                                    value={product?.maxMarginality}
                                    onChange={(e) => changeProduct('maxMarginality', checkInputValue(e.target.value))}
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
                                        value={product?.customPrice}
                                        onChange={(e) => changeProduct('customPrice', checkInputValue(e.target.value))}
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
                                                    onChange={() => changeProduct('priceMode', radio.value)}
                                                    checked={product?.priceMode === radio.value}>
                                                </input>
                                                <p className={product?.priceMode === radio.value ?
                                                    'main__radio-label notice' :
                                                    'main__radio-label small-font'}>
                                                    {radio.option}
                                                </p>
                                            </label>;
                                        })}
                                    </div></div>)}
                        </div>
                    </div>
                    <Button fn={saveChangedProduct} text={'Сохранить'} classN={'but-start popupSettings__but'} />
                    <Button fn={cancelChanges} text={'Отменить'} classN={'but-start popup__cancelChange'} />
                </div>
            </div>
        </div>

    );
};

export default PopupSettingsPrice;