import React from 'react';
import './ButtonsControl.scss';
import Button from '../../components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { actionStatusMode } from '../../store/mode/action.js';
import { radioButtonsAllAction } from '../../store/radiobuttons/action';
import { changeGroupProducts } from '../../store/products/action';
import { deleteAllCheckBoxesdAction } from '../../store/checkBoxes/action';


const radioButtons = [
    { option: "Своя", key: "Own", value: 0 },
    { option: "Рекомендуемая", key: "Recomend", value: 1 },
    { option: "Не менять", key: "Default", value: 2 },
]


const ButtonsControl = () => {


    const dispatch = useDispatch();


    const apiKey = useSelector(state => state.apiKey);
    const auth = useSelector(state => state.auth);
    const products = useSelector(state => state.products);
    const activeMode = useSelector(state => state.activeMode);
    const pagination = useSelector(state => state.pagination);
    const radioButtonsState = useSelector(state => state.radioButtons);
    const { priceSettingRadiosWithValue } = radioButtonsState;


    const productListOwnPage = products.productList.slice(pagination.fromProducts, pagination.toProducts).map(i => i.id);

    function toggleStatusMode() {
        dispatch(actionStatusMode())
    }


    function changePriceSetting(value) {
        dispatch(radioButtonsAllAction('priceSettingRadios', 'priceSettingRadiosWithValue', productListOwnPage, Number(value)));
        dispatch(changeGroupProducts(productListOwnPage, "price_mode", Number(value)));
        dispatch(deleteAllCheckBoxesdAction(productListOwnPage, 'useInAutoModeCheckBoxes'));
        dispatch(changeGroupProducts(productListOwnPage, 'useInAutoMode', false));
    }


    return (
        <div className={'buttonsControl'} >

            {activeMode.mode === 'automat' ?
                <>
                    <Button fn={toggleStatusMode} text={activeMode.status ? 'Остановить' : 'Запустить'} classN={"but-start"} />
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
                                {radioButtons.map(radio => {
                                    return <div key={radio.key} className='tbl__option'>
                                        <label className="strategy-step">
                                            <input
                                                name={radio.key}
                                                onChange={() => changePriceSetting(radio.value)}
                                                className=""
                                                type='radio'
                                                checked={!auth.loading && productListOwnPage.length && productListOwnPage.every(element => priceSettingRadiosWithValue[element] === radio.value)}
                                                value={radio.value}>
                                            </input>
                                            <p className={!auth.loading && productListOwnPage.every(element => priceSettingRadiosWithValue[element] === radio.value) ?
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