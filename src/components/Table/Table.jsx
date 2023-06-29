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
import { actionStrategy, actionStatusStrategy } from '../../store/strategy/action';
import { getProductsThunk } from '../../store/products/action';
import { increaseAction } from "../../store/products/action";
import { decreaseAction } from "../../store/products/action";
import { activeAllUsedIdAction } from '../../store/choiceIdProduct/action';


const Table = () => {

    const dispatch = useDispatch();
    const { activeStrategy, products } = useSelector(state => state);
    const { status, strategy } = activeStrategy;
    const { fromProducts, toProducts, totalProducts, page, perPage, loading,productList } = products;
    const upbuttonRef = useRef(null);

  

    useEffect(() => {
        dispatch(getProductsThunk());
    }, []);

  console.log(productList)

    useEffect(() => {
        window.onscroll = function () {
            const scrolled = window.pageYOffset
            if (upbuttonRef.current !== null) {
                scrolled > 200 ? upbuttonRef.current.style.display = 'block' : upbuttonRef.current.style.display = 'none';
            }
        }
    }, [])

    function changeStateStrategy(str) {
        dispatch(actionStrategy(str))
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
            backTop();
        }
    }

    return (
        <div className='table'>
            <div className='table__buttons'>
                <button onClick={() => changeStateStrategy('automat')}
                    className={strategy === 'automat' ? 'table__button-active main-font ' : 'table__button main-font'}
                    type='button'>
                    <img
                        className={strategy === 'automat' ? 'table__button-icon' : 'table__button-icon-active'}
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
            <table className={!loading ? 'table__tbl' : 'table__tbl-opacity'} >
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
            {!loading && <div className='table__container-arrow'>
                <img ref={upbuttonRef} onClick={backTop} className='table__up-button' src={arrow} alt='arrow'></img>
            </div>}
        </div>
    );
};

export default Table;