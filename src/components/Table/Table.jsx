import React, { useEffect, useRef } from 'react';
import './Table.scss';
import stop from './images/Stop.svg';
import start from './images/Start.svg';
import left from './images/left.svg';
import right from './images/right.svg';
import arrow from './images/up-arrow-button.png';
import Thead from '../Thead/Thead';
import Tbody from '../Tbody/Tbody';
import { backTop } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { actionStatusStrategy, changeModeAcyncAction } from '../../store/strategy/action';
import { getProductsThunk } from '../../store/products/action';
import { increaseAction } from "../../store/pagination/action";
import { decreaseAction } from "../../store/pagination/action";
import { activeAllUsedIdAction } from '../../store/choiceIdProduct/action';
import { TailSpin } from 'react-loader-spinner';


const Table = () => {

    const dispatch = useDispatch();
    const activeStrategy = useSelector(state => state.activeStrategy);
    const products = useSelector(state => state.products);
    const auth = useSelector(state => state.auth);
    const { status, strategy } = activeStrategy;
    const { fromProducts, toProducts, totalProducts, page, perPage, loading } = products;
    const upbuttonRef = useRef(null);

//     const state = useSelector(state=>state)
// console.log(state)

    useEffect(() => {
        dispatch(getProductsThunk(auth.userId));

    }, [dispatch]);

    useEffect(() => {
        window.onscroll = function () {
            const scrolled = window.pageYOffset
            if (upbuttonRef.current !== null) {
                scrolled > 200 ? upbuttonRef.current.style.display = 'block' : upbuttonRef.current.style.display = 'none';
            }
        }
    }, [])

    function changeStateStrategy(str) {
        dispatch(changeModeAcyncAction(str))
        if (activeStrategy === 'semi-automat') {
            dispatch(actionStatusStrategy(''))
        }
    }

    const togglePageAhead = () => {
        if (toProducts !== totalProducts) {
            dispatch(increaseAction());
            dispatch(getProductsThunk());
            backTop();
        }
    }

    const togglePageBack = () => {
        if (page !== 1) {
            dispatch(decreaseAction());
            // dispatch(getProductsThunk());
            console.log(loading)
            backTop();
        }
    }


    if(products.loading){
              return <TailSpin
            height="140"
            width="140"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{background:'ffffff'}}
            wrapperClass="tail-spin-loading"
            visible={true}
            color='#E5E7EB'
        />
    }

    return (
        <div className='table'>
            <div className='table__buttons'>
                <button onClick={() => changeStateStrategy('automat')}
                    className={strategy === 'automat' ? 'table__button-active main-font ' : 'table__button main-font'}
                    type='button'>
                    <img
                        className='table__button-icon'
                        src={status === 'start' ? start : stop}
                        alt='circle'>
                    </img>
                    Автомат
                </button>
                <button
                    onClick={() => changeStateStrategy('semi-automat')}
                    className={strategy === 'semi-automat' ? 'table__button-active main-font' : 'table__button main-font'}
                    type='button'>
                    Полуавтомат
                </button>
            </div>
            <table className='table__tbl' >
                <Thead />
                <Tbody />
            </table>
            {totalProducts > perPage && !loading &&
                <div className='table__pagination'>
                    <div
                        className={page === 1 ? 'table__pagination-left disabled ' : 'table__pagination-left '}
                        onClick={togglePageBack}>
                        <img src={left} alt='left arrow'></img>
                    </div>
                    <p className='notice'>{fromProducts} - {toProducts} из {totalProducts}</p>
                    <div
                        className={toProducts === totalProducts ? 'table__pagination-right disabled ' : 'table__pagination-right '}
                        onClick={togglePageAhead}>
                        <img src={right} alt='right arrow'></img>
                    </div>
                </div>
            }
            {<div className='table__container-arrow'>
                <img ref={upbuttonRef} onClick={backTop} className='table__up-button' src={arrow} alt='arrow'></img>
            </div>}
        </div>
    );
};

export default Table;