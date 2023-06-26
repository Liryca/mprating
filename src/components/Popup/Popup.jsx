import './Popup.scss';
import React, { useRef, useEffect } from 'react';
import Button from '../Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { changePopupShow, changePopupInputShow } from '../../store/popup/action';

const Popup = React.forwardRef((props, ref) => {

    const { popup, products } = useSelector(state => state);
    const { show, inputShow } = popup
    const dispatch = useDispatch();
    const buttonRef = useRef();
 
    const openPopup = () => dispatch(changePopupShow(show));
    const showInput = () => dispatch(changePopupInputShow(inputShow));

    // useEffect(()=>{
    //     show? document.body.classList.add('no-scroll'): document.body.classList.remove('no-scroll')
    // },[show])

     

    return (
            <div className={show ? 'popup-active' : 'popup'}>
                <div className='popup__wrapper'>
        <div style={{ top: props.top}} ref={ref} className='popup__content'>
                    <div className='popup__add'>
                        <div onClick={showInput} className='popup__icon-add'></div>
                        <p className='notice'>Добавить новый артикул конкурента</p>
                    </div>
                    <input className={inputShow? 'popup__input-add small-font' : 'popup__input-add hidden '} type='text'></input>
                    <div className='popup__arts'>
                        {products.productList.map(el => <div key={el.art} className='popup__art-item'>
                            <p className='popup__delete-button small-font'>{el.art}</p>
                            <div className='popup__icon-delete'></div>
                        </div>)}
                    </div>
                    <div className='popup__button'>
                        <Button fn={openPopup} value={show} text={'Ок'} classN={'but-start'} />
                    </div>
                </div>
                </div>
        
            </div>
    );
});

export default Popup;