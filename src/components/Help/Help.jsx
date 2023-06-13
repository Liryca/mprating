import React, { useState } from 'react';
import vector from './images/vector_help.svg';
import './Help.scss';

const Help = () => {

    const [show, setShow] = useState(false);
    const showHelp = () => setShow(true);
    const hiddenHelp = () => setShow(false);

    return (
        <div className='tbl__wrapp'>
            <div className={!show ? 'tbl__tooltip' : 'tbl__tooltip-active'}>
                <p className='small-font'>Подсказка - элемент графического интерфейса, служит  дополнительным средством обучения пользователя</p>
                <img className='tbl__help-icon' src={vector} alt='arrow'></img>
            </div>
            <div  className={show ? 'tbl__icon-hover' : 'tbl__icon-passive '}
                onMouseOver={showHelp}
                onMouseOut={hiddenHelp}
                >
            </div>
        </div>
    );
};

export default Help;