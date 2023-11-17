import React from 'react';
import './ButtonsControl.scss';
import Button from '../../components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { changeStatusAcyncAction} from '../../store/client/action.js';
import { radioButtonsSettingPrice } from '../../elements';
import {changePriceModeProductsThunk, getProductsThunk } from '../../store/products/action';



const ButtonsControl = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const clientInfo = useSelector(state => state.clientInfo);
    const { modeType, activeMode } = clientInfo;
    const { productList,   isLoadingProducts} = products;

    function syncPriceProducts() {
        dispatch(getProductsThunk());
    }

    function toggleStatusMode() {
        dispatch(changeStatusAcyncAction(activeMode ? false : true));
    }

    function changeProducts(value) {
        // const obj = productList.map(i => {
        //     return {
        //         ...i,
        //         priceMode: value,
        //     }
        // })

        // console.log(productList)

        dispatch(changePriceModeProductsThunk(value))
    }


    return (
        <div className={modeType==='AUTO'? 'buttonsControlWrapper buttonsControlWrapper__auto' : 'buttonsControlWrapper'}>
            <Button fn={syncPriceProducts} classN='but-start but-sync' text='Синхронизировать'></Button>
            <div className={!modeType==='AUTO'? 'buttonsControl' : 'buttonsControl buttonsControl__auto'}>

                {modeType==='AUTO' ?
                    <>
                        <Button
                            fn={toggleStatusMode}
                            classN={activeMode ? ' but-start but-start_active' : 'but-start'}
                            text={activeMode ? 'Остановить' : 'Запустить'} />
                    </>
                    :
                    <>
                        <div className='buttonsControl__radio'>
                            <div className='notice'>
                                <p>Установить </p>
                                <p>цену для всех:</p>
                            </div>
                            <div className='buttonsControl__radio-line'></div>
                            <div className='buttonsControl__radio-decription'>
                                <div className="wrapper__radio">
                                    {radioButtonsSettingPrice.map(radio => {
                                        return <div key={radio.key} className='tbl__option'>
                                            <label className="strategy-step">
                                                <input
                                                    name={radio.key}
                                                    onChange={() => changeProducts(radio.value)}
                                                    className=""
                                                    type='radio'
                                                    checked={!isLoadingProducts&& productList.every(i => i.priceMode === radio.value)}
                                                    value={radio.value}>
                                                </input>
                                                <p className={!isLoadingProducts&&productList.every(i => i.priceMode === radio.value) ?
                                                    'buttonsControl__radio-label notice' :
                                                    'buttonsControl__radio-label small-font'}>
                                                    {radio.option}
                                                </p>
                                            </label>
                                        </div>;
                                    })}
                                </div>
                            </div>
                        </div>
                        <Button fn={toggleStatusMode} text={'Применить цену'} classN={"but-start"} />
                    </>
                }
            </div>
        </div>
    );
};

export default ButtonsControl;