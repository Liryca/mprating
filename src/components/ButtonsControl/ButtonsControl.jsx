import React from 'react';
import './ButtonsControl.scss';
import Button from '../../components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { actionStatusMode } from '../../store/mode/action.js';
import { radioButtonsSettingPrice } from '../../elements';
import { changeProductGroupThunk } from '../../store/products/action';


const ButtonsControl = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const activeMode = useSelector(state => state.activeMode);
    const { productList } = products;

    function toggleStatusMode() {
        dispatch(actionStatusMode())
    }

    function changeProducts(value) {
        const obj = productList.map(i => {
            return {
                ...i,
                priceMode: value,
                useInAutoMode:false
           }
        })
        
        dispatch(changeProductGroupThunk(obj))
    }


    return (
        <div className= {activeMode.mode==='automat'?'buttonsControl':'buttonsControl buttonsControl__auto'}>
            {activeMode.mode === 'automat' ?
                <>
                    <Button fn={toggleStatusMode} classN={activeMode.status?' but-start but-start_active':'but-start'} text={activeMode.status ? 'Остановить' : 'Запустить'} />
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
                                                checked={ productList.every(i=>i.priceMode===radio.value)}
                                                value={radio.value}>
                                            </input>
                                            <p className={productList.every(i=>i.priceMode===radio.value) ?
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
                    <Button text={'Применить цену'} classN={"but-start"} />
                </>
            }
        </div>

    );
};

export default ButtonsControl;