import './Main.scss';
import React, { useEffect,useState } from 'react';
import Table from '../../components/Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import Popup from '../../components/Popup/Popup';
import { getProductsThunk } from '../../store/products/action';
import { TailSpin } from 'react-loader-spinner'
import Menu from '../../components/Menu/Menu';
import ButtonsControl from '../../components/ButtonsControl/ButtonsControl';
import PopupSettings from '../../components/PopupSettings/PopupSettings';



const Main = () => {

    const dispatch = useDispatch();

    const apiKey = useSelector(state => state.apiKey);
    const auth = useSelector(state => state.auth);
    const products = useSelector(state => state.products);
    const priceSetting = useSelector(state => state.priceSetting);
    const activeMode = useSelector(state => state.activeMode);
    const pagination = useSelector(state => state.pagination);
    const productListOwnPage = products.productList.slice(pagination.fromProducts, pagination.toProducts).map(i => i.id);

    useEffect(() => {
        dispatch(getProductsThunk(auth.userId));
    }, [auth.userId, dispatch]);




    // if ((!apiKey.statistic_key || !apiKey.standard_key) && !apiKey.status) {
    //     return <TailSpin
    //         height="140"
    //         width="140"
    //         ariaLabel="tail-spin-loading"
    //         radius="1"
    //         wrapperStyle={{}}
    //         wrapperClass="tail-spin-loading"
    //         visible={true}
    //         color='#E5E7EB'
    //     />
    // }

    return (
        <><Header />

            {/* {(!apiKey.statistic_key || !apiKey.standard_key) || (apiKey.statistic_key === '' || !apiKey.standard_key === '') ? <div className='notice-api-key main-font'>Для получения доступа к репрайсеру перейдите на страницу настроек</div> :*/
                <div className='main'>
                    <Menu />
                    <div className='main__left-block'>
                        <Popup />
                        <PopupSettings/>
                        <ButtonsControl />
                        <Table />
                    </div>
                </div>}
        </>
    );
};

export default Main;