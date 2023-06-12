import React, { useState, useRef, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import './Main.scss';
import { useSelector, useDispatch } from 'react-redux';
import { actionStatusStrategy } from '../../store/strategy/action.js';
import Header from '../../components/Header/Header';
import Popup from '../../components/Popup/Popup';
import { priceAllSettingAction } from '../../store/priceSetting/action';
import { data } from '../../data/data';

const radioButtons = [
    { option: "Своя", key: "Own" },
    { option: "Рекомендуемая", key: "Recomend" },
    { option: "Не менять", key: "Default" },
]

const Main = () => {

    console.log()

    const dispatch = useDispatch();
    const { activeStrategy, priceSetting, popup } = useSelector(state => state);
    const inputRef = useRef(null);
    const [popupTop, setPopupTop] = useState('');
    const [a, seta] = useState(true)

    function toggleStatusStrategy(status) {
        dispatch(actionStatusStrategy(status))

    }

    useEffect(() => {
        //    console.log(inputRef.current)
        //     console.log((window.innerHeight-432)/127)

        setPopupTop(window.innerHeight / 2 - inputRef.current.offsetHeight/2 + (window.scrollY));
        inputRef.current.top = popupTop + 'px'
    }, [popup.show, popupTop])



    return (
        <><Header />
            <div className='main'>
                <Popup top={popupTop} ref={inputRef} />

                <div className={'main__buttons-control'} >
                    {activeStrategy.strategy === 'automat' ?
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
                                                    <input onChange={() => dispatch(priceAllSettingAction(data.map(i => i.id), data.length, radio.key,))}
                                                        className=""
                                                        type='radio'
                                                        checked={Object.values(priceSetting.radios).length && Object.values(priceSetting.radios).every(i => i === radio.key) &&
                                                            priceSetting.activeRadios.length === priceSetting.dataLength}
                                                        value={radio.key}>
                                                    </input>
                                                    <p
                                                        className={Object.values(priceSetting.radios).length && Object.values(priceSetting.radios).every(i => i === radio.key) &&
                                                            priceSetting.activeRadios.length === priceSetting.dataLength ? 'main__radio-label notice' : 'main__radio-label small-font'}>
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