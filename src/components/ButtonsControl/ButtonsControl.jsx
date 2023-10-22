import React from 'react';
import './ButtonsControl.scss';
import Button from '../../components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { actionStatusMode } from '../../store/mode/action.js';
import { radioButtonsAllAction } from '../../store/radiobuttons/action';
import { changeGroupProducts } from '../../store/products/action';
import { deleteAllCheckBoxesdAction } from '../../store/checkBoxes/action';
import { radioButtonsSettingPrice } from '../../elements';


const ButtonsControl = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const products = useSelector(state => state.products);
    const activeMode = useSelector(state => state.activeMode);
    const radioButtonsState = useSelector(state => state.radioButtons);
    const { priceSettingRadiosWithValue } = radioButtonsState;
    const productListOwnPage = products.productList.map(i => i.id);

 
    function toggleStatusMode() {
        dispatch(actionStatusMode())
    }


    function changePriceSetting(value) {
        dispatch(radioButtonsAllAction('priceSettingRadios', 'priceSettingRadiosWithValue', productListOwnPage, value));
        dispatch(changeGroupProducts(productListOwnPage, "priceMode", value));
        dispatch(deleteAllCheckBoxesdAction(productListOwnPage, 'useInAutoModeCheckBoxes'));
        dispatch(changeGroupProducts(productListOwnPage, 'useInAutoMode', false));
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
                                                onChange={() => changePriceSetting(radio.value)}
                                                className=""
                                                type='radio'
                                                checked={ productListOwnPage.length && productListOwnPage.every(element => priceSettingRadiosWithValue[element] === radio.value)}
                                                value={radio.value}>
                                            </input>
                                            <p className={productListOwnPage.every(element => priceSettingRadiosWithValue[element] === radio.value) ?
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