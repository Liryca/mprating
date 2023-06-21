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

    const openPopup=()=>dispatch(changePopupShow(popup.show));
    const showInput=()=>dispatch(changePopupShow(popup.show));

    return (
        <div className=''>
            <div className={popup.show ? 'popup-active' : 'popup'}>
                <div style={{ top: props.top }} ref={ref} className='popup__content'>
                    <div className='popup__add'>
                        <div onClick={showInput} className='popup__icon-add'></div>
                         <p className='notice'>Добавить новый артикул конкурента</p>
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