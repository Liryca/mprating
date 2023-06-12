import './Popup.scss';
import React, {useRef} from 'react';
import Button from '../Button/Button';
import { data } from '../../data/data';
import { useSelector, useDispatch } from 'react-redux';
import { changePopupShow } from '../../store/popup/action';

const Popup = React.forwardRef((props, ref) => {

    const { popup } = useSelector(state => state);
    const dispatch = useDispatch();
    const buttonRef = useRef();

    function openPopup() {
        dispatch(changePopupShow(popup.show));
    }

    return (
        <div className=''>
            <div className={popup.show ? 'popup-active' : 'popup'}>
                <div style={{ top: props.top }} ref={ref} className='popup__content'>
                    <div className='popup__add'>
                        <div className='popup__icon-add'></div>
                        <input id='newArt' className='popup__input notice' type='text' placeholder='Добавить новый артикул конкурента'></input>
                    </div>
                    <div className='popup__arts'>
                        {data.map(el => <div key={el.art} className='popup__art-item'>
                            <p className='popup__delete-button small-font'>{el.art}</p>
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
});

export default Popup;