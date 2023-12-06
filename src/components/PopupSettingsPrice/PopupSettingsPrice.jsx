import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './PopupSettingsPrice.scss';
import Button from "../Button/Button";
import { changePopupSettingsPriceShow } from "../../store/popupSettingsPrice/action";
import { radioButtonsSettingPrice } from "../../elements";
import { changeProductThunk } from "../../store/products/action";
import { Snackbar } from "@mui/material";
import copy from '../Tbody/images/copy.svg';
import { CurrencyInput, CurrencyInputAllowNegative } from "../InputCurrency/InputCurrency";
import { fetchProduct } from '../../api/services/product';


const PopupSettingsPrice = () => {

    const dispatch = useDispatch();
    const popupSettings = useSelector(state => state.popupSettingsPrice);
    const clientInfo = useSelector(state => state.clientInfo);
    const { active, id } = popupSettings;
    const [product, setProduct] = useState({});
    const [open, setOpen] = useState(false);
    const [isLoad, setIsLoad] = useState(false);


    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Escape') {
                dispatch(changePopupSettingsPriceShow(false, ''));
            }
            // if (event.key === 'Enter') {
            //     saveChangedProduct()
            // }
        };

        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (id) {
                setIsLoad(true)
                try {
                    const result = await fetchProduct(id)
                    setProduct({ ...result.data });

                } catch (error) {
                    console.log(error)
                } finally {
                    setIsLoad(false)
                }
            }
        }
        fetchData();
    }, [id]);



    function changeProduct(key, value) {
        setProduct((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    const saveChangedProduct = () => {
        dispatch(changePopupSettingsPriceShow(false, ''));
        dispatch(changeProductThunk(
            {
                ...product,
                costPrice: Number(product.costPrice),
                minMarginality: Number(product.minMarginality),
                maxMarginality: Number(product.maxMarginality),
                customPrice: Number(product.customPrice),
            }
        ));
    }

    const cancelChanges = () => {
        dispatch(changePopupSettingsPriceShow(false, ''));

    }

    const handleClick = (art) => {
        setOpen(true)
        navigator.clipboard.writeText(art);
    }

    return (
        <div className={active ? 'popupSettings-active' : 'popupSettings'}>
            <div className='popupSettings__wrapper'>
                {!isLoad &&
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
                                        value={product?.maxMarginality?product.maxMarginality:''}
                                        className="main-font"
                                        onChange={(e) => changeProduct('maxMarginality', e.target.value)}
                                        onFocus={(e) => e.target.select()}
                                    />
                                </div>
                                {clientInfo.modeType === 'SEMI_AUTO' && (
                                    <div className="popupSettings__state popupSettings__customPrice">
                                        <p className="main-font  dark-grey"> Своя<br />цена, руб</p>
                                        <CurrencyInput
                                            name="ownPrice"
                                            placeholder="000"
                                            value={product?.customPrice?product.customPrice:''}
                                            className="main-font"
                                            onChange={(e) => changeProduct('customPrice', e.target.value)}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    </div>
                                )}

                                {clientInfo.modeType === 'SEMI_AUTO' && (
                                    <div className=" popupSettings__state-price-mode"><div><p className="main-font  dark-grey"> Установка</p>
                                        <p className="main-font dark-grey">цены, руб</p></div><div className="wrapper__radio">
                                            {radioButtonsSettingPrice.map(radio => {
                                                return <label key={radio.key} className="strategy-step">
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
                }

            </div>
        </div>

    );
};

export default PopupSettingsPrice;