import React, { useRef, useEffect,useState} from 'react';
import { columnsAutomat, columnsSemiAutomat } from './columns';
import Help from '../Help/Help';
import { useDispatch, useSelector } from 'react-redux';
import { data } from '../../data/data'
import { activeAllIdAction } from '../../store/choiceIdProduct/action';
import { promotionAllAction } from '../../store/choicePromotion/action';

const Thead = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { activeStrategy, activeId, promotion } = state;
    const inputRefUse = useRef(null);
    const inputRefPromo = useRef(null);
    
    const [show, setShow] = useState(false);
    const showHelp = () => setShow(true);
    const hiddenHelp = () => setShow(false);


    useEffect(() => {
        if (inputRefUse.current !== null) {
            if (activeId.dataLength !== activeId.checkboxes.length && activeId.checkboxes.length) {
                inputRefUse.current.indeterminate = true;
            } else {
                inputRefUse.current.indeterminate = false;
            }
        }

        if (promotion.dataLength !== promotion.checkboxes.length && promotion.checkboxes.length) {
            inputRefPromo.current.indeterminate = true;
        } else {
            inputRefPromo.current.indeterminate = false;
        }

    }, [promotion.dataLength, activeStrategy.strategy, activeId.dataLength, activeId.checkboxes.length, promotion.checkboxes.length]);

    return (
        <thead>
            <tr className='tbl__line'>
                {activeStrategy.strategy === 'automat' ?
                    columnsAutomat.map((column, i) => {
                        return <th className={`tbl__cell title ${`tbl__cell` + i}`} key={column.id}>
                                <div lang="ru"  className='tbl__cell-title'>{column.title}</div>
                                <Help/>
                                {(column.id === 'use' || column.id === 'promotion') &&
                                    <label className="tbl__container thead-container">
                                        <input
                                            ref={column.id === 'use' ? inputRefUse : inputRefPromo}
                                            id={column.id === 'use' ? 'allUse' : 'allPromo'}
                                            className='thead-input'
                                            onChange={
                                                column.id === 'use' ?
                                                    () => dispatch(activeAllIdAction(data.map(i => i.id), data.length)) :
                                                    () => dispatch(promotionAllAction(data.map(i => i.id), data.length))
                                            }
                                            type="checkbox"
                                            checked={column.id === 'use' ?
                                                (activeId.dataLength === activeId.checkboxes.length) :
                                                (promotion.dataLength === promotion.checkboxes.length)}>
                                        </input>
                                    </label>
                                }
                        </th>
                    }) :
                    columnsSemiAutomat.map((column, i) => {
                        return <th className={`tbl__cell title ${`tbl__cell` + (i + 1)}`} key={column.id}>
                            <div className='tbl__cell-title'> {column.title}</div>
                            <Help />
                            {column.id === 'promotion' &&
                                <label className="tbl__container thead-container">
                                    <input
                                        ref={inputRefPromo}
                                        id={'allPromo'}
                                        onChange={() => dispatch(promotionAllAction(data.map(i => i.id), data.length))}
                                        checked={promotion.dataLength === promotion.checkboxes.length}
                                        className='thead-input'
                                        type="checkbox">
                                    </input>
                                </label>
                            }
                        </th>
                    })
                }
            </tr>
        </thead>
    );
};

export default Thead;