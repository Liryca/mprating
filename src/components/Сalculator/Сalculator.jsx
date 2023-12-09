import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './Calculator.scss';
import { Snackbar } from "@mui/material";
import copy from '../Tbody/images/copy.svg';
import Button from "../Button/Button";
import { calculateMargin } from "../../api/services";
import { CurrencyInput } from "../InputCurrency/InputCurrency";
import { changePopupCalculatorShow } from "../../store/calculator/action";

const Calculator = () => {

    const dispatch = useDispatch();
    const calculator = useSelector(state => state.calculator);
    const { active, id, el } = calculator;
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState(null);

    const [calculatorValues, setCalculatorValues] = useState({
        payPrice: '',
        costPrice: '',
        article: '',
        wirehousePrice: ''

    });

    const calc = 'calc'

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Escape') {
                dispatch(changePopupCalculatorShow(false, ''));
                setTotal(null);
                // if (id) {
                //     const tr = document.getElementById(`${id}`)
                //     tr.classList.remove('tbl__line-active');
                //     tr.classList.add('tbl__line');
                //     setTimeout(() => tr.classList.remove('tbl__line'), 2000);
            }

        }
        // if (event.key === 'Enter') {
        //     saveChangedProduct()
        // }
        document.addEventListener('keydown', keyDownHandler);
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, [calc]);


    useEffect(() => {
        if (el) {
            setCalculatorValues((prev) => {
                return {
                    ...prev,
                    payPrice: el.wbPrice,
                    article: el.article,
                    costPrice: el.costPrice,
                    wirehousePrice: el.wirehousePrice
                }
            })
        }

    }, [el])



    const handleClick = (art) => {
        setOpen(true)
        navigator.clipboard.writeText(art);
    };

    const closePopup = () => {
        dispatch(changePopupCalculatorShow(false, ''));
        setTotal(null);
    }

    const calculateValue = async () => {
        try {
            const result = await calculateMargin({
                ...calculatorValues,
                costPrice: Number(calculatorValues.costPrice),
                payPrice: Number(calculatorValues.payPrice)
            })

            setTotal(result.data)

        } catch (error) {
            console.log(error)
        }
    }



    function changedValues(key, value) {
        setCalculatorValues((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    return (
        <div className={active ? 'calculator-active' : 'calculator'}>
            <div className='calculator__wrapper'>

                <div className="calculator__content">
                    <div className='calculator__title'>
                        <h2 className='notice'>
                            `Расчитать маржу для артикула:
                            {' '}
                            <a
                                className='popup__title-art'
                                href={`https://www.wildberries.ru/catalog/${calculatorValues?.article}/detail.aspx`} target="_blank">
                                {' '}
                                {calculatorValues?.article}
                            </a>
                        </h2>
                        <div>
                            <img src={copy} alt="copy" onClick={() => handleClick(el?.article)} ></img>
                            <Snackbar
                                message="Артикул скопирован"
                                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                autoHideDuration={1000}
                                onClose={() => setOpen(false)}
                                open={open}
                            />
                        </div>
                    </div>
                    <div className="calculator__setValues">
                        <label className="main-font">Себестоимость </label>
                        <CurrencyInput
                            value={calculatorValues?.costPrice ? calculatorValues?.costPrice : ''}
                            onChange={(e) => changedValues('costPrice', e.target.value)}
                            className="popup__input-add main-font" type="text" />

                        <label className="main-font">Цена продажи</label>
                        <CurrencyInput
                            value={calculatorValues.payPrice}
                            onChange={(e) => changedValues('payPrice', e.target.value)}
                            className="popup__input-add main-font" type="text" />
                        {total &&
                            <div className="calculator__result ">
                                <p className="notice"> Себестоимость: <span className="greenText">{total?.costPrice}</span></p>
                                <p className="notice">Цена продажи: <span className="greenText">{total?.payPrice}</span></p>
                                <p className="notice">Процент комиссии: <span className="greenText">{total?.commissionPercent}</span></p>
                                <p className="notice">Коэффициент логистики: <span className="greenText">{total?.logisticCoefficient}</span></p>
                                <p className="notice">Маржа: <span className="greenText">{total?.margin}</span></p>
                                <p className="notice">Цена хранение на складе: <span className="greenText">{total?.wirehousePrice}</span></p>
                            </div>}
                    </div>
                    <Button fn={calculateValue} text={'Рассчитать'} classN={'but-start popupSettings__but'} />
                    <Button fn={closePopup} text={'Закрыть'} classN={'but-start popup__cancelChange'} />
                </div>
                <div >
                </div>
            </div>
        </div>
    );
};

export default Calculator;