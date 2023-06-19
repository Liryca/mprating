import React, { useEffect, useState } from 'react';
import './Table.scss';
import stop from './images/Stop.svg';
import start from './images/Start.svg';
import arrow from './images/up-arrow-button.png';
import Thead from '../Thead/Thead';
import Tbody from '../Tbody/Tbody';
import { useDispatch, useSelector } from 'react-redux';
import { actionStrategy, actionStatusStrategy } from '../../store/strategy/action';
import { increaseAction } from "../../store/products/action";
import { decreaseAction } from "../../store/products/action";
import { getProductsThunk } from '../../store/products/action';

const Table = () => {

    const dispatch = useDispatch();
    const { activeStrategy, products } = useSelector(state => state);
  
    useEffect(() => {
        dispatch(getProductsThunk())
    }, [dispatch, products.page]);


    function changeStateStrategy(str) {
        dispatch(actionStrategy(str))
        if (activeStrategy === 'semi-automat') {
            dispatch(actionStatusStrategy(''))
        }
    }

    const togglePageAhead = () => dispatch(increaseAction());
    const togglePageBack = () => dispatch(decreaseAction());


    const backTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (

        <div className='table'>
            <div className='table__buttons'>
                <button onClick={() => changeStateStrategy('automat')} className={activeStrategy.strategy === 'automat' ? 'table__button-active main-font ' : 'table__button main-font'} type='button'>
                    <img
                        className={activeStrategy.strategy === 'automat' ? 'table__button-icon' : 'table__button-icon-active'}
                        src={activeStrategy.status === 'start' ? start : stop}
                        alt='circle'>
                    </img>
                    Автомат
                </button>
                <button
                    onClick={() => changeStateStrategy('semi-automat')}
                    className={activeStrategy.strategy === 'semi-automat' ? 'table__button-active main-font' : 'table__button main-font'}
                    type='button'>
                    {/* {activeStrategy.strategy === 'semi-automat'} */}
                    Полуавтомат
                </button>
            </div>
            {/* <div className='wrapper__table'> */}
      
                  {/* <div className='table__wr-arrow'>
                 
                    </div> */}
            {/* </div> */}
                         <table className='table__tbl'>
                    <Thead />
                    <Tbody />
                
                </table>
                {/* <div className='table__buttons-control'>
               <button className='main-font' onClick={togglePageBack}>Назад</button>
               <button className='main-font' onClick={togglePageAhead}>Вперед</button>
                </div>
                    <div className='table__container-arrow'>
                            <img onClick={backTop} className='table__up-button' src={arrow} alt='arrow'>
                            </img>
                        </div> */}
               
        </div>

    );
};

export default Table;