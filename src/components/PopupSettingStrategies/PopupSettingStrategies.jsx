import './Popup.scss';
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Help from '../Help/Help';
import { useSelector, useDispatch } from 'react-redux';
import { changePopupSettingStrategiesShow, changeInputShow } from '../../store/popupSettingStrategies/action';
import { checkInputValue } from '../../utils/utils';
import { Collapse } from '@mui/material';
import { changeProductThunk } from '../../store/products/action';
import { radioButtonsStrategy, radioButtonsPromotion } from '../../elements';
import { fetchProduct } from '../../api/services/product';
import IconsSvg from '../Tbody/images/icons.svg';
import { Snackbar } from "@mui/material";
import Icon from "../Icon/Icon";


const PopupSettingStrategies = () => {

    const dispatch = useDispatch();
    const popup = useSelector(state => state.popupSettingStrategies);
    const { id, show, inputShow } = popup;
    const [valueIputArticles, setValueInputArticles] = useState('');
    const [product, setProduct] = useState({});
    const [isLoad, setIsLoad] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClick = (art) => {
        setOpen(true)
        navigator.clipboard.writeText(art);
    };

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Escape') {
                dispatch(changePopupSettingStrategiesShow(false, ''));
            }
        };

        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);


    useEffect(() => {
        async function fetchData() {
            if (id) {
                setIsLoad(true)
                try {
                    const result = await fetchProduct(id)
                    setProduct(result.data)
                } catch (error) {
                    console.log(error)
                } finally {
                    setIsLoad(false)
                }
            }
        }
        fetchData();
    }, [id]);



    console.log(product)


    function changeProduct(key, value) {
        setProduct((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    const showInput = () => dispatch(changeInputShow(inputShow));


    const addArticle = (event) => {
        if (event.key === 'Enter') {
            setProduct((prev) => {
                if (prev.competitors) {
                    return {
                        ...prev,
                        competitors: [...prev.competitors, ...valueIputArticles.split(',').filter(i => !prev.competitors.includes(i))]
                    }
                } else {
                    return {
                        ...prev,
                        competitors: valueIputArticles.split(',')
                    }
                }

                // return [
                //     ...prev,
                //     ...valueIputArticles.split(',').filter(i => !prev.includes(i))
                // ]
            })
            setValueInputArticles('');
            dispatch(changeInputShow(popup.inputShow));
        }
    }


    // const addArticle = (event) => {
    //     if (event.key === 'Enter') {

    // setCopyArticles((prev) => {
    //     if (!prev.includes(valueIputArticles) && valueIputArticles.length) {
    //         event.target.style.border = '1px solid #16a382';
    //         dispatch(changeInputShow(popup.inputShow));
    //         // dispatch(addArticlesThunkAction(product.id, valueIputArticles))
    //         return [
    //             ...prev,
    //             { article: valueIputArticles }
    //         ]

    //     } else {
    //         event.target.style.border = '1px solid red'
    //         return prev

    //     }
    // })
    //         setValueInputArticles('');

    //     }
    // }

    const deleteArticles = (value) => {
        console.log(value)
        setProduct((prev) => {
            return {
                ...prev,
                competitors: prev.competitors.filter(i => i !== value)
            }
        })
    };



    const saveChangedProduct = () => {
        dispatch(changePopupSettingStrategiesShow(false, ''));
        dispatch(changeProductThunk(product));

    }

    const cancelChanges = () => {
        dispatch(changePopupSettingStrategiesShow(false, ''));
    }

    return (
        <div className={popup.show ? 'popup-active' : 'popup'}>
            <div className='popup__wrapper'>
                <div className='popup__content'>

                    <div className='popup__title'>
                        <h2 className='notice'>`Установить стратегию для артикула: <span className='popup__title-art'>{product?.article}</span>
                        </h2>
                        <div onClick={() => handleClick(product?.article)}>
                                    <Icon classN="tbl__cell-copy" id="#copy" size={20} iconsSvg={IconsSvg} />
                             
                                    <Snackbar
                                        message="Артикул скопирован"
                                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                        autoHideDuration={1000}
                                        onClose={() => setOpen(false)}
                                        open={open}
                                    />
                                </div>
                        <a href={`https://global.wildberries.ru/product?card=${product?.article}`} target="_blank">
                            <Icon classN="tbl__cell-export" id="#export" size={17} iconsSvg={IconsSvg} />
                        </a>
                            
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
                                        checked={product?.followingStrategy}>
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
                                                    name={radio?.option + id}
                                                    type='radio'
                                                    value={radio.value} >
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
                                <div className='popup__shift-right'>
                                    <button
                                        className='notice green popup__shiftMode'
                                        type="button" onClick={() => changeProduct('shiftMode', product?.shiftMode === 'more' ? 'less' : 'more')}
                                        value={product?.shiftMode}>
                                        {product.shiftMode === 'more' ? 'больше' : 'меньше'}
                                    </button>
                                    <p className='notice popup__step-text'>на</p>
                                    <input   // ошибка
                                        name='step'
                                        value={product?.shift}
                                        onChange={(e) => changeProduct('shift', checkInputValue(e.target.value))}
                                        className=" popup__cell-input notice"
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
                                {product.competitors !== 0 && product.competitors?.map((i, key) => {
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
                                    value={product?.joinStocks ? product.joinStocks : ''}
                                    checked={product?.joinStocks} >
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
                                        onChange={(e) => changeProduct('afterStock', e.target.value)}
                                        checked={product?.afterStock === radio.value}
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

export default PopupSettingStrategies;