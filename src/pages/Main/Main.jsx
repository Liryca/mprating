import './Main.scss';
import React, { useEffect } from 'react';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import { actionStatusStrategy } from '../../store/strategy/action.js';
import Header from '../../components/Header/Header';
import Popup from '../../components/Popup/Popup';
import { priceAllSettingAction } from '../../store/priceSetting/action';
import { Oval } from 'react-loader-spinner';
import { TailSpin } from 'react-loader-spinner';
import { authAction } from '../../store/auth/action';
import { getApiKeyThunk } from '../../store/apiKey/action';
import { parseJwt } from '../../utils/utils';

const radioButtons = [
    { option: "Своя", key: "Own" },
    { option: "Рекомендуемая", key: "Recomend" },
    { option: "Не менять", key: "Default" },
]

const Main = () => {

    const dispatch = useDispatch();
    const { activeStrategy, priceSetting, products, auth, apiKey } = useSelector(state => state);
    const { productList, fromProducts, toProducts, loading } = products;
    const { strategy } = activeStrategy;
    const { isLoading } = auth;
    const { activeRadiosWithValue } = priceSetting;
    const productListOwnPage = productList.slice(fromProducts, toProducts).map(i => i.id);

    function toggleStatusStrategy(status) {
        dispatch(actionStatusStrategy(status))
    }


    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(authAction(true,localStorage.getItem('id')))
            dispatch(getApiKeyThunk())
            // navigate(fromPage, { replace: true });

        }
    }, [])


    if ((!apiKey.statistic_key || !apiKey.standard_key) && !apiKey.status) {
        return <TailSpin
            height="140"
            width="140"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass="tail-spin-loading"
            visible={true}
            color='#E5E7EB'
        />
    }

    return (
        <><Header />
            {(!apiKey.statistic_key || !apiKey.standard_key)||(apiKey.statistic_key==='' || !apiKey.standard_key==='') ? <div className='notice-api-key main-font'>Для получения доступа к репрайсеру перейдите на страницу настроек</div> : <div className='main'>
                {/* <Popup /> */}
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
                                                    <input
                                                        name={radio.key}
                                                        onChange={() => dispatch(priceAllSettingAction(productList.slice(fromProducts, toProducts).map(i => i.id), radio.key))}
                                                        className=""
                                                        type='radio'
                                                        checked={!loading && productListOwnPage.every(element => activeRadiosWithValue[element] === radio.key)}
                                                        value={radio.key}>
                                                    </input>
                                                    <p className={!loading && productListOwnPage.every(element => activeRadiosWithValue[element] === radio.key) ?
                                                        'main__radio-label notice' :
                                                        'main__radio-label small-font'}>
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
            </div>}
        </>
    );
};

export default Main;