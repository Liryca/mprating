import './Popup.scss';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from '../Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { changePopupShow, changePopupInputShow } from '../../store/popup/action';
import { changeProduct } from '../../store/products/action';
import { debounce } from "lodash";

const Popup = () => {

    const popup = useSelector(state => state.popup);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [value, setValue] = useState();
    const [art, setArt] = useState([]);

    const sendQuery = useCallback((v) => {
        setArt((prev) => {
            return [  ...prev,v] 
        })
        setValue('')
    }, []);

    const debouncedSendQuery = useMemo(() => {
        return debounce(sendQuery, 1000);
    }, [sendQuery]);



    const openPopup = (e) => {
        dispatch(changePopupShow(popup.show))
        dispatch(changeProduct(popup.activeId, 'cotrArticles', art.join()))
    }


    useEffect(() => {
        if (popup.el && popup.el.cotrArticles) {
            setArt(popup.el.cotrArticles.split(','))
        } else {
            setArt([])
        }
    }, [popup.el])



    const showInput = () => dispatch(changePopupInputShow(products.inputShow));

    function fn(e) {
        setValue(e)
        debouncedSendQuery(e)
    }

    function fn2(v) {
        // dispatch(changeProduct(popup.activeId, 'cotrArticles', value, 'delete'))
        setArt((prev) => {
            return [
                ...prev.filter(i => i !== v)
            ]
        })
    }

    console.log(art)

    return (
        <div className={popup.show ? 'popup-active' : 'popup'}>
            <div className='popup__wrapper'>
                <div className='popup__content'>
                    <div className='popup__add'>
                        <div onClick={showInput} className='popup__icon-add'></div>
                        <p className='notice'>Добавить новый артикул конкурента</p>
                    </div>
                    <input
                        onChange={(e) => fn(e.target.value)}
                        name='addArts'
                        value={value}
                        className={popup.inputShow ? 'popup__input-add small-font' : 'popup__input-add hidden '}
                        type='text'></input>
                    <div className='popup__arts'>
                        {art.map((i, key) => {
                            return <div key={key} className='popup__art-item'>
                                <p className='popup__delete-button small-font'>{i}</p>
                                <div onClick={() => fn2(i)} className='popup__icon-delete'></div>
                            </div>
                        })}
                    </div>
                    <div className='popup__button'>
                        <Button fn={openPopup} value={popup.show} text={'Ок'} classN={'but-start'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;