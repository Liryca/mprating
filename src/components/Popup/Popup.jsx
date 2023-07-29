import './Popup.scss';
import React from 'react';
import Button from '../Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { changePopupShow, changePopupInputShow } from '../../store/popup/action';

const Popup = () => {

    const popup = useSelector(state => state.popup);
    const products= useSelector(state => state.products);
    const dispatch = useDispatch();
    
    const openPopup = () => dispatch(changePopupShow(popup.show));
    const showInput = () => dispatch(changePopupInputShow(products.inputShow));

    return (
        <div className={popup.show ? 'popup-active' : 'popup'}>
            <div className='popup__wrapper'>
                <div className='popup__content'>
                    <div className='popup__add'>
                        <div onClick={showInput} className='popup__icon-add'></div>
                        <p className='notice'>Добавить новый артикул конкурента</p>
                    </div>
                    <input name='addArts' className={popup.inputShow ? 'popup__input-add small-font' : 'popup__input-add hidden '} type='text'></input>
                    <div className='popup__arts'>
                        {products.productList.map((el,i) => <div key={i} className='popup__art-item'>
                            <p className='popup__delete-button small-font'>{el.cotrArticles}</p>
                            <div className='popup__icon-delete'></div>
                        </div>)}
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