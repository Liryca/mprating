import './Main.scss';
import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import PopupSettingStrategies from '../../components/PopupSettingStrategies/PopupSettingStrategies';
import { getProductsThunk } from '../../store/products/action';
import { TailSpin } from 'react-loader-spinner'
import Menu from '../../components/Menu/Menu';
import ButtonsControl from '../../components/ButtonsControl/ButtonsControl';
import PopupSettingsPrice from '../../components/PopupSettingsPrice/PopupSettingsPrice';
import { getClientInfoAcyncAction } from '../../store/client/action';

const Main = () => {

    const dispatch = useDispatch();
    const apiKey = useSelector(state => state.apiKey);

    useEffect(() => {
        dispatch(getClientInfoAcyncAction());
    }, []);

    if (apiKey.loadingKey) {
        return <TailSpin
            height="140"
            width="140"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass="tail-spin-loading"
            visible={true}
            color='#E5E7EB' />
    }

    return (
        <><Header />
            <div className='main'>
                <Menu />
                {((!apiKey.statisticsKey || !apiKey.standardKey)
                    || (apiKey.statisticskey === '' || !apiKey.standardKey === '') && !apiKey.loadingKey) ?
                    <div className='notice-api-key main-font'>
                        <div><h2>Для получения доступа к репрайсеру перейдите на страницу настроек</h2></div>
                    </div> :
                    <div className='main__left-block'>
                        <PopupSettingsPrice />
                        <PopupSettingStrategies/>
                        <ButtonsControl />
                        <Table />
                    </div>}
            </div>
        </>
    );
};

export default Main;