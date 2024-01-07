import React from 'react';
import './ButtonsControl.scss';
import Button from '../../components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { radioButtonsSettingPrice1 } from '../../utils/elements';
import { changePriceModeProductsThunk, synchronizationProductsThunk } from '../../store/products/action';
import { applyPriceAcyncAction, changeStatusModeAutoAcyncAction, } from '../../store/client/action.js';
import { changePopupFilesState } from '../../store/FilesPopup/action';
import { CustomWidthTooltip } from '../Thead/Thead';


const ButtonsControl = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const clientInfo = useSelector(state => state.clientInfo);
    const { modeType, user } = clientInfo;
    const { productList, isLoadingProducts } = products;


    const syncPriceProducts = () => dispatch(synchronizationProductsThunk());
    const toggleStatusMode = () => {
        if (productList.length) {
            dispatch(changeStatusModeAutoAcyncAction(user.activeMode ? false : true));
        }
    }
    const changeProducts = (value) => {
        if (productList.length) {
            dispatch(changePriceModeProductsThunk(value));
        }
    }
    const applyPrice = () => {
        if (productList.length) {
            dispatch(applyPriceAcyncAction())
        }
    }

    const openFilesPopup = () => {
        dispatch(changePopupFilesState(true))
    }

    return (
        <div className={modeType === 'AUTO' ? 'buttonsControlWrapper buttonsControlWrapper__auto' : 'buttonsControlWrapper'}>
            <div className='buttonsControl__actions'>
                <CustomWidthTooltip title={<div> <p>Нажмите на эту кнопку, чтобы ваши SKU синхронизировались с личным кабинетом на Wildberries</p></div>}>
                    <span><Button fn={syncPriceProducts} classN='but-start but-sync' text='Синхронизировать'></Button></span>
                </CustomWidthTooltip>
                <CustomWidthTooltip title={
                    <div>
                        <p>Сюда необходимо загрузить Excel с акциями. Для этого:</p>
                        <ul className='tooltipTitle'>
                            <li>Перейдите по ссылке:</li>
                            <li>Скачайте Excel с акциями</li>
                            <li>Загрузите сюда</li>
                        </ul>
                    </div >}>
                    <span><Button fn={openFilesPopup} classN='but-start but-sync' text='Файлы с акциями'></Button></span>
                </CustomWidthTooltip>
            </div>
            <div className={!modeType === 'AUTO' ? 'buttonsControl' : 'buttonsControl buttonsControl__auto'}>
                {modeType === 'AUTO' ?
                    <>
                        <CustomWidthTooltip title={<div>
                            <p>После запуска, цены на ваши SKU будут автоматически изменяться согласно выбранным стратегиям.</p>
                            <p></p>
                            <p>Цены изменяются каждый час.</p>
                        </div>}>
                            <span><Button
                                fn={toggleStatusMode}
                                classN={user.activeMode ? ' but-start but-start_active' : 'but-start'}
                                text={user.activeMode ? 'Остановить' : 'Запустить'}>
                            </Button></span>
                        </CustomWidthTooltip>
                    </>
                    :
                    <>
                        <div className='buttonsControl__radio'>
                            <CustomWidthTooltip title={
                                < div >
                                    <p>Позволяет применить цены сразу для всех SKU:</p>
                                    <ul className='tooltipTitle'>
                                        <li>Собственная (необходимо установить отдельно в каждом SKU)</li>
                                        <li>Стратегическая (необходимо установить отдельно в каждом SKU)</li>
                                        <li>Не изменилась, ваша цена останется как есть</li>
                                    </ul>
                                </div>
                            }>
                                <div className='notice'>
                                    <p>Установить </p>
                                    <p>цену для всех:</p>
                                </div>
                            </CustomWidthTooltip>

                            <div className='buttonsControl__radio-line'></div>
                            <div className='buttonsControl__radio-decription'>
                                <div className="wrapper__radio">
                                    {radioButtonsSettingPrice1.map(radio => {
                                        return <div key={radio.key} className='tbl__option'>
                                            <label className={radio.key==='Default'?'strategy-stepDefault': 'strategy-step'}>
                                                <input
                                                    name={radio.key}
                                                    onChange={() => changeProducts(radio.value)}
                                                    className=""
                                                    type='radio'
                                                    checked={!isLoadingProducts && productList?.length && productList.every(i => i.priceMode === radio.value)}
                                                    value={radio.value}>
                                                </input>
                                                <p className={!isLoadingProducts && productList?.length && productList?.every(i => i.priceMode === radio.value) ?
                                                    'buttonsControl__radio-label notice' :
                                                    'buttonsControl__radio-label small-font'}>
                                                    {radio.key === 'Default' ?
                                                        <><p>{radio.option.split(',')[0]+','}</p>
                                                            <p> {radio.option.split(',')[1]}</p></> :
                                                        radio.option
                                                    }
                                                </p>
                                            </label>
                                        </div>;
                                    })}
                                </div>
                            </div>
                        </div>
                        <Button fn={applyPrice} text={'Применить цену'} classN={"but-start"} />
                    </>
                }
            </div>
        </div>
    );
};

export default ButtonsControl;