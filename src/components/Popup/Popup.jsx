import './Popup.scss';
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Help from '../Help/Help';
import { useSelector, useDispatch } from 'react-redux';
import { changePopupShow, changePopupInputShow } from '../../store/popup/action';
import { checkInputValue } from '../../utils/utils';
import { fetchArticles, fetchAddArticle, fetchDeleteArticle } from '../../api/services/articles';
import { Collapse } from '@mui/material';
import { changeProductThunk } from '../../store/products/action';
import { radioButtonsStrategy, radioButtonsPromotion } from '../../elements';
import { getArticlesThunk } from '../../store/articles/action';


const Popup = () => {

    const dispatch = useDispatch();
    const popup = useSelector(state => state.popup);
    const loading = useSelector(state => state.products.loading);
    const articles = useSelector(state => state.articles)
    const { el, show, inputShow } = popup;
    const [valueIputArticles, setValueInputArticles] = useState('');
    const [copyArticles, setCopyArticles] = useState([]);
    const [product, setProduct] = useState({})

    console.log(product)

    useEffect(() => {
        setProduct(el)
        console.log(el)
        dispatch(getArticlesThunk(el.id))
        el?.cotrArticles ? setCopyArticles(el.cotrArticles.split(',')) : setCopyArticles([])

    }, [el])


    function changeProduct(key, value) {
        setProduct((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }


    const showInput = () => dispatch(changePopupInputShow(inputShow));
    const deleteArticles = (v) => setCopyArticles((prev) => [...prev.filter(i => i !== v)]);





    const addArticle = (event) => {
        // fetchAddArticle                  // добавить запрос на добавление
        if (event.key === 'Enter') {
            setCopyArticles((prev) => {
                if (valueIputArticles.split(',').filter(i => prev.includes(i))) {
                    event.target.style.border = '1px solid red';
                }
                return [
                    ...prev,
                    ...valueIputArticles.split(',').filter(i => !prev.includes(i))
                ]
            })
            setValueInputArticles('');
            dispatch(changePopupInputShow(popup.inputShow));
        }
    }

    const deleteArticle = () => {

    }

    const saveChangedProduct = () => {
        dispatch(changePopupShow(show, ''));
        dispatch(changeProductThunk(product));
    }

    const cancelChanges = () => {
        dispatch(changePopupShow(show, ''));
    }





    return (
        <div className={popup.show ? 'popup-active' : 'popup'}>
            <div className='popup__wrapper'>
                <div className='popup__content'>

                    <div className='popup__title'>
                        <h2 className='notice'>
                            {`Установить стратегию для артикула: ${product?.article}`}
                        </h2>
                    </div>

                    <div className='popup__settings'>
                        <div className='popup__set-content'>
                            <label className="tbl__container popup__promotin-field">
                                <div>
                                    <input
                                        name='FollowingStrategy'
                                        onChange={(e) => changeProduct('followingStrategy', !product?.followingStrategy)}
                                        type="checkbox"
                                        value={product?.followingStrategy}
                                        checked={!loading && product?.followingStrategy}>
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
                                                    onChange={(e) => changeProduct('strategy', e.target.value)}
                                                    checked={product?.strategy === radio.value}
                                                    name={radio?.option + el?.id}
                                                    type='radio'
                                                    value={radio.value}
                                                >
                                                </input>
                                                <p className={product?.strategy === radio.value ?
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
                                    {/* <button
                                        className='notice green popup__shiftMode'
                                        type="button" onClick={() => changeProduct('shiftMode', product?.shiftMode === 'more' ? 'less' : 'more')}
                                        value={product?.shiftMode}>
                                        {product.shiftMode === 'more' ? 'больше' : 'меньше'}
                                    </button> */}
                                    <p className='notice'>на</p>
                                    <input
                                        name='step'
                                        value={product?.shift}
                                        onChange={(e) => changeProduct('shift', checkInputValue(e.target.value))}
                                        className=" popup__cell-input notice green"
                                        type="text"
                                        placeholder="000">
                                    </input>
                                </div>
                            </label>
                        </div>

                        <div className='popup__add-content'>
                            <div onClick={showInput} className='popup__add'>
                                <div className='popup__icon-add'></div>
                                <p className='notice'>Добавить новый артикул конкурента</p>
                            </div>
                            <Collapse in={inputShow}>
                                <input
                                    onChange={(e) => setValueInputArticles(e.target.value)}
                                    onKeyDown={addArticle}
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
                                    onChange={() => changeProduct('joinStocks', !product?.joinStocks)}
                                    value={product?.joinStocks?product.joinStocks:''}
                                    checked={!loading && product?.joinStocks} >
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
                                        onChange={(e) => changeProduct('afterEndPromotion', Number(e.target.value))}
                                        checked={product?.afterEndPromotion === radio.value}
                                        type='radio'
                                        value={radio.value}>
                                    </input>
                                    <p className='notice dark-grey' >{radio.option}</p>
                                </label>
                            })}
                        </div>
                    </div>
                    <div className='popup__button'>
                        <Button fn={saveChangedProduct} text={'Сохранить'} classN={'but-start popup__button'} />
                        <Button fn={cancelChanges} text={'Отменить'} classN={'but-start popup__cancelChange'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;