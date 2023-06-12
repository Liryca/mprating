import React, { useEffect, useState } from 'react';
import stop from './images/Stop.svg';
import start from './images/Start.svg';
import './Table.scss';
import Thead from '../Thead/Thead';
import Tbody from '../Tbody/Tbody';
import { useDispatch, useSelector } from 'react-redux';
import { actionStrategy, actionStatusStrategy } from '../../store/strategy/action';
import { getProductsThunk } from '../../store/products/action';

const Table = () => {

    const dispatch = useDispatch();
    const { activeStrategy, products } = useSelector(state => state);
    const [a, seta] = useState(true)

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [dispatch, products.page]);


    function changeStateStrategy(str) {
        setTimeout(() => seta(true), 500)
        dispatch(actionStrategy(str))
        if (activeStrategy === 'semi-automat') {
            dispatch(actionStatusStrategy(''))
        }
        seta(false)

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

            <div className='wrapper__table'>

                <table className='table__tbl'>

                    {/* <col class="column-1" />
                    <col class="column-2" />
                    <col class="column-3" />
                    <col class="column-4" />
                    <col class="column-5" />
                    <col class="column-6" />
                    <col class="column-7" />
                    <col class="column-8" />
                    <col class="column-9" />
                    <col class="column-10" />
                    <col class="column-11" />
                    <col class="column-12" />
                    <col class="column-13" />
                    <col class="column-14" /> */}


                    <Thead />
                    <Tbody />
                </table>

            </div>

        </div>

    );
};

export default Table;