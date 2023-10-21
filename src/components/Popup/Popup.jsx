import './Popup.scss';
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Help from '../Help/Help';
import { useSelector, useDispatch } from 'react-redux';
import { changePopupShow, changePopupInputShow } from '../../store/popup/action';
import { changeProduct } from '../../store/products/action';
import { radioButtonsPromotion, radioButtonsStrategy } from '../../elements';
import { checkBoxesAction } from '../../store/checkBoxes/action';
import { checkInputValue } from '../../utils/utils';
import { radioButtonsAction } from '../../store/radiobuttons/action';
import { Collapse } from '@mui/material';

const Popup = () => {

    const dispatch = useDispatch();
    const popup = useSelector(state => state.popup);
    const checkboxes = useSelector(state => state.checkBoxes);
    const loading = useSelector(state => state.products.loading);
    const radioButtons = useSelector(state => state.radioButtons);
    const { activeId, el, show, inputShow } = popup;
    const { promotionCheckBoxes, followingStrategyCheckBoxes } = checkboxes;
    const { afterEndPromotionRadiosWithValue, strategyRadiosWithValue } = radioButtons;
    const [valueIputArticles, setValueInputArticles] = useState('');
    const [copyArticles, setCopyArticles] = useState([]);
    const [copyShift, setCopyShift] = useState(0);
    const [shiftMode, setShiftMode] = useState('');


    useEffect(() => {

        const fetchData = async () => {
            el?.cotrArticles ? setCopyArticles(el.cotrArticles.split(',')) : setCopyArticles([])
            setCopyShift(el?.shift);
            setShiftMode(el?.shiftMode)
        }
      
        // call the function
        fetchData()
          // make sure to catch any error
          .catch(console.error);
      }, [])



    // useEffect(() => {
    //     el?.cotrArticles ? setCopyArticles(el.cotrArticles.split(',')) : setCopyArticles([])
    //     setCopyShift(el?.shift);
    //     setShiftMode(el?.shiftMode)
    // }, [el])

    const changePromotion = (id) => {
        dispatch(checkBoxesAction(id, 'promotionCheckBoxes'));
    }

    const changeFollowingStrategy = (id) => {
        dispatch(checkBoxesAction(id, 'followingStrategyCheckBoxes'));
    }

    const changePromotionStateAfter = (id, key) => {
        dispatch(radioButtonsAction('afterEndPromotionRadios', 'afterEndPromotionRadiosWithValue', id, key));
    }

    const changeStrategy = (id, key) => {
        dispatch(radioButtonsAction('strategyRadios', 'strategyRadiosWithValue', id, key));
    }

    const showInput = () => dispatch(changePopupInputShow(inputShow));
    const deleteArticles = (v) => setCopyArticles((prev) => [...prev.filter(i => i !== v)]);

    const toggleStatePopup = () => {
        dispatch(changePopupShow(show, ''))
        dispatch(changeProduct(activeId, 'cotrArticles', copyArticles.join()));
        dispatch(changeProduct(activeId, 'joinStocks', promotionCheckBoxes.includes(activeId)));
        dispatch(changeProduct(activeId, 'followingStrategy', followingStrategyCheckBoxes.includes(activeId)));
        dispatch(changeProduct(activeId, 'shift', copyShift));
        dispatch(changeProduct(activeId, 'shiftMode', shiftMode));
        dispatch(changeProduct(activeId, 'afterEndPromotion', afterEndPromotionRadiosWithValue[activeId]))
        dispatch(changeProduct(activeId, 'strategy', strategyRadiosWithValue[activeId]))
    }

    const cancelChanged = () => {

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setCopyArticles((prev) => {
                return [
                    ...prev,
                    ...valueIputArticles.split(',').filter(i => !prev.includes(i))
                ]
            })
            setValueInputArticles('');
            dispatch(changePopupInputShow(popup.inputShow))
        }
    }

    return (
        <div className={popup.show ? 'popup-active' : 'popup'}>
            <div className='popup__wrapper'>
                <div className='popup__content'>

                    <div className='popup__title'>
                        <h2 className='notice'>
                            {`Установить стратегию для артикула: ${el?.article}`}
                        </h2>
                    </div>

                    <div className='popup__settings'>
                        <div className='popup__set-content'>
                            <label className="tbl__container popup__promotin-field">
                                <div>
                                    <input
                                        name='FollowingStrategy'
                                        onChange={(e) => changeFollowingStrategy(activeId)}
                                        type="checkbox"
                                        value={el?.followingStrategy}
                                        checked={!loading && followingStrategyCheckBoxes.includes(activeId)}>
                                    </input>
                                </div>

                                <div className='popup__promotion-discription'>
                                    <p className='popup__promotion-title title'>Стратегия следования</p>
                                    <p className='notice'>Описание описание описание описание описание описание описание описание</p>
                                </div>
                            </label>


                            <div className="popup__strategy-step">
                                {radioButtonsStrategy.map((radio, index) => {
                                    return (
                                        <div key={index} >
                                            <label className="strategy-step">
                                                <input
                                                    onChange={(e) => changeStrategy(activeId, e.target.value)}
                                                    checked={strategyRadiosWithValue[activeId] === radio.value}
                                                    name={radio?.option + el?.id}
                                                    type='radio'
                                                    value={radio.value}
                                                >
                                                </input>
                                                <p className={strategyRadiosWithValue[activeId] === radio.strategyRadiosWithValue ?
                                                    'main__radio-label notice' : 'main__radio-label small-font'}>{radio.option}</p>
                                            </label>
                                        </div>
                                    );
                                })}
                                <Help />
                            </div>

                            <label className='popup__shift'>
                                <p className='notice'>Шаг в рублях:</p>
                                <div>
                                    <button
                                        className='notice green popup__shiftMode'
                                        type="button" onClick={() => setShiftMode(shiftMode === 'more' ? 'less' : 'more')}
                                        value={shiftMode}>
                                        {shiftMode === 'more' ? 'больше' : 'меньше'}
                                    </button>
                                    <p className='notice'>на</p>
                                    <input
                                        name='step'
                                        value={copyShift}
                                        onChange={(e) => setCopyShift(checkInputValue(e.target.value))}
                                        className=" popup__cell-input notice green"
                                        type="text"
                                        placeholder="000">
                                    </input>
                                </div>
                            </label>
                        </div>

                        <div className='popup__add-content'>
                            <div className='popup__add'>
                                <div onClick={showInput} className='popup__icon-add'></div>
                                <p className='notice'>Добавить новый артикул конкурента</p>
                            </div>
                            <Collapse in={inputShow}>
                                <input
                                    onChange={(e) => setValueInputArticles(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    name='addArts'
                                    value={valueIputArticles}
                                    className={'popup__input-add small-font'}
                                    type='text'>
                                </input>
                            </Collapse>
                            <div className='popup__arts'>
                                {copyArticles.map((i, key) => {
                                    return <div key={key} className='popup__art-item'>
                                        <p className='popup__delete-button small-font'>{i}</p>
                                        <div onClick={() => deleteArticles(i)} className='popup__icon-delete'></div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>

                    <div className='popup__promotion'>
                        <label className="tbl__container popup__promotin-field">
                            <div>
                                <input
                                    type="checkbox"
                                    name="promotion"
                                    onChange={() => changePromotion(activeId)}
                                    value={el?.joinStocks}
                                    checked={!loading && promotionCheckBoxes.includes(activeId)} >
                                </input>
                            </div>

                            <div className='popup__promotion-discription'>
                                <p className='popup__promotion-title title'>Участвовать в акциях</p>
                                <p className='notice'>Описание описание описание описание описание описание описание описание</p>
                            </div>
                        </label>
                        <div className='popup__state-promotion'>
                            <p className='small-font'>После окончания акции изменить цену:</p>
                            {radioButtonsPromotion.map(radio => {
                                return <label key={radio.key} className="popup__state-promotion-input">
                                    <input
                                        name='state-promotion'
                                        onChange={(e) => changePromotionStateAfter(activeId, Number(e.target.value))}
                                        checked={afterEndPromotionRadiosWithValue[activeId] === radio.value}
                                        type='radio'
                                        value={radio.value}>
                                    </input>
                                    <p className='notice dark-grey' >{radio.option}</p>
                                </label>
                            })}
                        </div>
                    </div>
                    <div className='popup__button'>
                        <Button fn={toggleStatePopup} text={'Сохранить'} classN={'but-start popup__button'} />
                        <Button fn={cancelChanged} text={'Отменить'} classN={'but-start popup__cancelChange'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;