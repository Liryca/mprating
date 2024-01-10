import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './PopupSettingsPrice.scss';
import Button from "../Button/Button";
import { changePopupSettingsPriceShow } from "../../store/popupSettingsPrice/action";
import { radioButtonsSettingPrice1 } from "../../utils/elements";
import { changeProductThunk } from "../../store/products/action";
import { Snackbar } from "@mui/material";
import copy from '../Tbody/images/copy.svg';
import { CurrencyInput, CurrencyInputAllowNegative } from "../InputCurrency/InputCurrency";
import { cleanOneProductLoading } from "../../store/oneProduct/action";
import { CustomWidthTooltip } from '../Thead/Thead';




const PopupSettingsPrice = () => {

    const dispatch = useDispatch();
    const popupSettings = useSelector(state => state.popupSettingsPrice);
    const oneProductState = useSelector(state => state.oneProduct);
    const clientInfo = useSelector(state => state.clientInfo);
    const { active, id } = popupSettings;
    const { oneProduct, isLoadingOneProduct } = oneProductState
    const [product, setProduct] = useState({});
    const [open, setOpen] = useState(false);
    const [activeRow, setActiveRow] = useState(null);

    //     - Запретить ввод цен =< 0 (Допустить отрицательную маржу)
    // - Запретить ввод минимальной маржи больше максимальной маржи

    useEffect(() => {

        const keyDownHandler = event => {
            event.stopPropagation();
            if (event.key === 'Escape' && active) {
                cancelChanges()
            } if (event.key === 'Enter' && active) {
                saveChangedProduct()
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, [id, product]);


    useEffect(() => {
        setActiveRow(document.getElementById(`${id}`));
        setProduct(oneProduct)
    }, [id, oneProduct]);


    function changeProduct(key, value) {
        setProduct((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    const saveChangedProduct = (e) => {

        dispatch(changePopupSettingsPriceShow(false, ''));
        dispatch(cleanOneProductLoading())
        dispatch(changeProductThunk(
            {
                ...product,
                costPrice: Number(product.costPrice),
                minMarginality: Number(product.minMarginality),
                maxMarginality: Number(product.maxMarginality),
                customPrice: Number(product.customPrice),
            }
        ));

        if (activeRow) {
            activeRow.classList.remove('tbl__line-active');
            activeRow.classList.add('tbl__line');
            setTimeout(() => activeRow.classList.remove('tbl__line'), 2000);
        }
    }

    const cancelChanges = () => {
        dispatch(changePopupSettingsPriceShow(false, ''));
        dispatch(cleanOneProductLoading())
        if (activeRow) {
            activeRow.classList.remove('tbl__line-active');
            activeRow.classList.add('tbl__line');
            setTimeout(() => activeRow.classList.remove('tbl__line'), 2000);
        }
    }

    const handleClick = (art) => {
        setOpen(true)
        navigator.clipboard.writeText(art);
    }

    return (
        <div className={active ? 'popupSettings-active' : 'popupSettings'}>
            <div className='popupSettings__wrapper'>
                {!isLoadingOneProduct &&
                    <div className={clientInfo.modeType === 'AUTO' ? 'popupSettings__content' : 'popupSettings__content-wide'}>
                        <div className="popupSettings__title">
                            <h2 className='notice'>`Установить параметры для артикула:
                                {' '}
                                <a
                                    className='popup__title-art'
                                    href={`https://www.wildberries.ru/catalog/${product?.article}/detail.aspx`}
                                    target="_blank">
                                    {product?.article}
                                </a>
                            </h2>
                            <div onClick={() => handleClick(product?.article)}>
                                <img src={copy} alt="copy" ></img>
                                <Snackbar
                                    message="Артикул скопирован"
                                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                    autoHideDuration={1000}
                                    onClose={() => setOpen(false)}
                                    open={open}
                                />
                            </div>
                        </div>
                        <div className="popupSettings__set-content">
                            <div className={clientInfo.modeType === 'AUTO' ? "popupSettings__main" : "popupSettings__main-wide"}>
                                <div className="popupSettings__state popupSettings__costPrice">
                                    <p className="main-font dark-grey hyphens">Себе-<br />стоимость</p>
                                    <CurrencyInput
                                        name="costPrice"
                                        placeholder="000"
                                        value={product?.costPrice ? product?.costPrice : ''}
                                        className="main-font"
                                        onChange={(e) => changeProduct('costPrice', e.target.value)}
                                        onFocus={(e) => e.target.select()}
                                    />

                                </div>
                                <div className="popupSettings__state popupSettings__minMarginality">
                                    <p className="main-font  dark-grey">Маржа<br />(мин), руб</p>
                                    <CurrencyInputAllowNegative
                                        name="minMarzha"
                                        placeholder="000"
                                        value={product?.minMarginality ? product.minMarginality : ''}
                                        className="main-font"
                                        onChange={(e) => changeProduct('minMarginality', e.target.value)}
                                        onFocus={(e) => e.target.select()}
                                    />
                                </div>
                                <div className="popupSettings__state popupSettings__maxMarginality">
                                    <p className="main-font  dark-grey">Маржа<br />(макс), руб</p>
                                    <CurrencyInputAllowNegative
                                        name='maxMarzha'
                                        placeholder="000"
                                        value={product?.maxMarginality ? product.maxMarginality : ''}
                                        className="main-font"
                                        onChange={(e) => changeProduct('maxMarginality', e.target.value)}
                                        onFocus={(e) => e.target.select()}
                                    />
                                </div>
                                {clientInfo.modeType === 'SEMI_AUTO' && (
                                    <div className=" popupSettings__state-price-mode"><div><p className="main-font  dark-grey"> Установка</p>
                                        <p className="main-font dark-grey">цены, руб</p></div><div className="wrapper__radio popupSettings__radio">
                                            {radioButtonsSettingPrice1.map(radio => {
                                                return <label key={radio.key} className="strategy-step popupSettings__strategy-step">
                                                    <div className={radio.key === 'Default' ? 'strategy-stepActionDefault' : 'strategy-stepAction'}>
                                                        <input
                                                            className='main-font'
                                                            name={radio.key + product?.id}
                                                            type='radio'
                                                            value={radio.value}
                                                            onChange={() => changeProduct('priceMode', radio.value)}
                                                            checked={product?.priceMode === radio.value}>
                                                        </input>
                                                        <p className={product?.priceMode === radio.value ?
                                                            'main__radio-label notice' :
                                                            'main__radio-label small-font'}>
                                                            {/* {radio.key === 'Default' ?
                                                                <><p className="defaultTitle"> {radio.option.split(',')[0] + ','}</p>
                                                                    <p className="defaultTitle"> {radio.option.split(',')[1] }<span> {product?.customPrice } ₽</span></p></> :
                                                                radio.option
                                                            } */}
                                                            <p className="defaultTitle">
                                                                {radio.option}
                                                                {radio.key === 'Default' && <span> {product?.customPrice} ₽</span>}</p>
                                                        </p>
                                                        {radio.key !== 'Default' &&
                                                            <CustomWidthTooltip title={radio.key === 'CUSTOM' ?
                                                                <p> Собственная цена, по которой вы <br />хотите продавать товар.</p> :
                                                                <div>
                                                                    <p>Цена, которая рассчитывается по выбранной стратегии.</p>
                                                                    <p>Стратегии настраиваются в блоке "Стратегии" индивидуально на каждый SKU.</p>
                                                                </div>
                                                            }>
                                                                <div className='tbl__tooltipWrapper popupSettings__tooltip'>
                                                                    <div className='tbl__tooltipp'></div>
                                                                </div>
                                                            </CustomWidthTooltip>
                                                        }
                                                    </div>

                                                    {radio.key === 'CUSTOM' &&
                                                        <div className="popupSettings__state popupSettings__customPrice defaultcustomPrice">
                                                            <CurrencyInput
                                                                disabled={!(product?.priceMode === radio.value)}
                                                                name="ownPrice"
                                                                placeholder="000"
                                                                value={product?.customPrice ? product.customPrice : ''}
                                                                className="main-font"
                                                                onChange={(e) => changeProduct('customPrice', e.target.value)}
                                                                onFocus={(e) => e.target.select()}
                                                            />
                                                        </div>
                                                    }
                                                </label>
                                            })}
                                        </div>
                                    </div>)}
                            </div>
                            <div className="notice">
                                {product?.priceMode === 'RECOMMENDED' ?
                                    <p className="defaultTitle" >Ваш товар будет продаваться по цене от <span> NNN ₽ до NNN ₽.</span></p> :
                                    <p className="defaultTitle" >Ваш товар будет продаваться по цене <span> {product?.customPrice} ₽</span></p>
                                }
                            </div>
                        </div>
                        <Button fn={saveChangedProduct} text={'Сохранить'} classN={'but-start popupSettings__but'} />
                        <Button fn={cancelChanges} text={'Отменить'} classN={'but-start popup__cancelChange'} />
                    </div>
                }

            </div>
        </div>

    );
};

export default PopupSettingsPrice;