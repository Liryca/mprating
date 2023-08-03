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
    const [cotrArt, setCotrArt] = useState([]);

    useEffect(() => {
        if (popup.el && popup.el.cotrArticles) {
            setCotrArt(popup.el.cotrArticles.split(','))
        } else {
            setCotrArt([])
        }
    }, [popup.el])

    const openPopup = (e) => {
        dispatch(changePopupShow(popup.show))
        dispatch(changeProduct(popup.activeId, 'cotrArticles', cotrArt.join()))
    }

    const showInput = () => dispatch(changePopupInputShow(products.inputShow));
    const deleteCotrArt = (v) => setCotrArt((prev) => [...prev.filter(i => i !== v)]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setCotrArt((prev) => {
                return [
                    ...prev,
                    ...value.split(',').filter(i => !prev.includes(i))
                ]
            })
            setValue('');
        }
    };


    return (
        <div className={popup.show ? 'popup-active' : 'popup'}>
            <div className='popup__wrapper'>
                <div className='popup__content'>
                    <div className='popup__add'>
                        <div onClick={showInput} className='popup__icon-add'></div>
                        <p className='notice'>Добавить новый артикул конкурента</p>
                    </div>
                    <input
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        name='addArts'
                        value={value}
                        className={popup.inputShow ? 'popup__input-add small-font' : 'popup__input-add hidden '}
                        type='text'></input>
                    <div className='popup__arts'>
                        {cotrArt.map((i, key) => {
                            return <div key={key} className='popup__art-item'>
                                <p className='popup__delete-button small-font'>{i}</p>
                                <div onClick={() => deleteCotrArt(i)} className='popup__icon-delete'></div>
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