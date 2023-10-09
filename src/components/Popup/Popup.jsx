import './Popup.scss';
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Help from '../Help/Help';
import { useSelector, useDispatch } from 'react-redux';
import { changePopupShow, changePopupInputShow } from '../../store/popup/action';
import { changeProduct } from '../../store/products/action';
import { radioButtonsPromotion } from './popupElements';
import { radioButtonsStrategy } from './popupElements';
import { checkBoxesAction } from '../../store/checkBoxes/action';
import { checkInputValue } from '../../utils/utils';
import { radioButtonsAction } from '../../store/radiobuttons/action';
import { changeGeneralSettingsAction } from '../../store/generalSettings/action';
import { act } from '@testing-library/react';

const Popup = () => {

    const dispatch = useDispatch();
    const popup = useSelector(state => state.popup);
    const checkboxes = useSelector(state => state.checkBoxes);
    const loading = useSelector(state => state.products.loading);
    const radioButtons = useSelector(state => state.radioButtons);
    const generalStrategySettings = useSelector(state => state.generalStrategySettings);
    const { activeId, el, show, inputShow, activeIds, elems } = popup;
    const { promotionCheckBoxes, followingStrategyCheckBoxes } = checkboxes;
    const { afterEndPromotionRadiosWithValue, strategyRadiosWithValue } = radioButtons;
    const { followingStrategy, strategy, promotions, step, articles, afterEndPromotion } = generalStrategySettings;
    const [valueIputArticles, setValueInputArticles] = useState('');
    const [copyArticles, setCopyArticles] = useState([]);
    const [shift, setShift] = useState(0);

    console.log(el?.strategy)


    useEffect(() => {
        dispatch(changeGeneralSettingsAction('articles', copyArticles));
    }, [])


    useEffect(() => {
        // el?.shift ? setShift(el.shift) : setShift('');
        el?.cotrArticles ? setCopyArticles(el.cotrArticles.split(',')) : setCopyArticles([])


        // (elems?.length && articles) ? setCopyArticles(articles.split(',')) : setCopyArticles([]);
    }, [el])



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

    const showInput = () => dispatch(changePopupInputShow(popup.inputShow));
    const deleteArticles = (v) => setCopyArticles((prev) => [...prev.filter(i => i !== v)]);

    const toggleStatePopup = () => {
        dispatch(changePopupShow(show, ''))
        dispatch(changeProduct(activeId, 'cotrArticles', copyArticles.join()));
        dispatch(changeProduct(activeId, 'join_stocks', promotionCheckBoxes.includes(activeId)));
        dispatch(changeProduct(activeId, 'followingStrategy', followingStrategyCheckBoxes.includes(activeId)));
        dispatch(changeProduct(activeId, 'shift', shift));
        dispatch(changeProduct(activeId, 'afterEndPromotion', afterEndPromotionRadiosWithValue[activeId]))
        dispatch(changeProduct(activeId, 'strategy', strategyRadiosWithValue[activeId]))
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
                            {activeId ?
                                `Установить стратегию для артикула: ${el?.article}` :
                                `Установить стратегию для артикулов: ${activeIds.map(i => {
                                    return `${i}`
                                })}`
                            }
                        </h2>
                    </div>

                    <div className='popup__settings'>
                        <div className='popup__set-content'>
                            <label className="tbl__container popup__promotin-field">
                                <div>
                                    <input
                                        onChange={activeId ?
                                            (e) => changeFollowingStrategy(activeId) :
                                            () => dispatch(changeGeneralSettingsAction('followingStrategy', !followingStrategy))
                                        }
                                        type="checkbox"
                                        value={activeId ? el?.followingStrategy : followingStrategy}
                                        checked={activeId ?
                                            !loading && followingStrategyCheckBoxes.includes(activeId) :
                                            followingStrategy
                                        }
                                    >
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
                                                    onChange={activeId ?
                                                        (e) => changeStrategy(activeId, Number(e.target.value)) :
                                                        (e) => dispatch(changeGeneralSettingsAction('strategy', Number(e.target.value)))
                                                    }
                                                    checked={activeId ?
                                                        strategyRadiosWithValue[activeId] === radio.value :
                                                        strategy === radio.value
                                                    }
                                                    name={radio?.option + el?.id}
                                                    type='radio'
                                                    value={radio.value}
                                                >
                                                </input>
                                                <p className={strategyRadiosWithValue[activeId] === radio.value || strategy === radio.value ?
                                                    'main__radio-label notice' : 'main__radio-label small-font'}>{radio.option}</p>
                                            </label>
                                        </div>
                                    );
                                })}
                                <Help />
                            </div>

                            <label className='popup__shift'>
                                <p className='notice'>Шаг в рублях:</p>
                                <div><p className='notice green'>Больше</p>
                                    <p className='notice'>на</p>
                                    <input
                                        name='step'
                                        value={activeId ? shift : step}
                                        onChange={activeId ?
                                            (e) => setShift(checkInputValue(e.target.value)) :
                                            (e) => dispatch(changeGeneralSettingsAction('step', checkInputValue(e.target.value)))}
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
                            <input
                                onChange={(e) => setValueInputArticles(e.target.value)}
                                onKeyDown={handleKeyDown}
                                name='addArts'
                                value={valueIputArticles}
                                className={inputShow ? 'popup__input-add small-font' : 'popup__input-add hidden '}
                                type='text'>
                            </input>
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
                                    onChange={activeId ?
                                        () => changePromotion(activeId) :
                                        () => dispatch(changeGeneralSettingsAction('promotions', !promotions))}
                                    value={activeId ? el?.join_stocks : promotions}
                                    checked={activeId ?
                                        !loading && promotionCheckBoxes.includes(activeId) :
                                        promotions
                                    }
                                >
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
                                        onChange={activeId ? (e) => changePromotionStateAfter(activeId, Number(e.target.value)) :
                                            (e) => dispatch(changeGeneralSettingsAction('afterEndPromotion', Number(e.target.value)))}
                                        checked={activeId ?
                                            afterEndPromotionRadiosWithValue[activeId] === radio.value :
                                            afterEndPromotion === radio.value}
                                        className=""
                                        type='radio'
                                        value={radio.value}>
                                    </input>
                                    <p className='notice dark-grey' >{radio.option}</p>
                                </label>
                            })}
                        </div>
                    </div>


                    <div className='popup__button'>
                        <Button fn={toggleStatePopup} value={show} text={'Сохранить'} classN={'but-start popup__button'} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Popup;