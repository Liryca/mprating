import './Main.scss';
import React, { useState, useRef, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import { actionStatusStrategy } from '../../store/strategy/action.js';
import Header from '../../components/Header/Header';
import Popup from '../../components/Popup/Popup';
import { priceAllSettingAction } from '../../store/priceSetting/action';

const radioButtons = [
    { option: "Своя", key: "Own" },
    { option: "Рекомендуемая", key: "Recomend" },
    { option: "Не менять", key: "Default" },
]

const Main = () => {

    const dispatch = useDispatch();
    const { activeStrategy, priceSetting, products } = useSelector(state => state);
    const { productList } = products;
    const { strategy } = activeStrategy;
    const { activeRadios, activeRadiosWithValue} = priceSetting;

    function toggleStatusStrategy(status) {
        dispatch(actionStatusStrategy(status))
    }

    return (
        <><Header />
            <div className='main'>
                <Popup/>
                <div className={'main__buttons-control'} >
                    {strategy === 'automat' ?
                        <>
                            <Button fn={toggleStatusStrategy} value={'start'} text={'Запуск'} classN={"but-start"} />
                            <Button fn={toggleStatusStrategy} value={'stop'} text={'Стоп'} classN={"but-stop"} /></> :
                        <>
                            <div className='main__radio'>
                                <div className='notice'>
                                    <p>Установить </p>
                                    <p>цену для всех:</p>
                                </div>
                                <div className='main__radio-line'></div>
                                <div className='main__radio-decription'>
                                    <div className="wrapper__radio">
                                        {radioButtons.map(radio => {
                                            return <div key={radio.key} className='tbl__option'>
                                                <label className="strategy-step">
                                                    <input onChange={() => dispatch(priceAllSettingAction(productList.map(i => i.id), radio.key))}
                                                        className=""
                                                        type='radio'
                                                        checked=
                                                        {Object.values(activeRadiosWithValue).length && Object.values(activeRadiosWithValue).every(i => i === radio.key) &&
                                                            activeRadios.length === productList.length}
                                                        value={radio.key}>
                                                    </input>
                                                    <p
                                                        className=
                                                        {Object.values(activeRadiosWithValue).length && Object.values(activeRadiosWithValue).every(i => i === radio.key) &&
                                                            activeRadios.length === productList.length ? 'main__radio-label notice' : 'main__radio-label small-font'}>
                                                        {radio.option}
                                                    </p>
                                                </label>
                                            </div>;
                                        })}
                                    </div>
                                </div>
                            </div>
                            <Button text={'Применить цену'} classN={"but-start"} />
                        </>
                    }
                </div>
                <Table />
            </div></>
    );
};

export default Main;