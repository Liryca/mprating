import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import './Settings.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { sendApiKeys } from '../../api/services/apiKey';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import { apiKeyAction } from '../../store/apiKey/action';



const Settings = () => {

    const textAreaRef = useRef();
    const apiKey = useSelector(state => state.apiKey);
    const [apikeys, setApiKeys] = useState({});

   const sendQuery = useCallback((obj) => {
        const response = sendApiKeys(obj);
        console.log(response)
    }, []);

    const debouncedSendQuery = useMemo(() => {
        return debounce(sendQuery, 1000);
    }, [sendQuery]);


    const textAriaInputHandler = (e, key) => {
        setApiKeys((prev) => {
            return {
                ...prev,
                [key]: e.target.value
            }
        })

        e.target.style.height = '48px';
        e.target.style.height = e.target.scrollHeight + 'px';

        if (e.target.value) {
            if (key === 'statistic_key') {
                debouncedSendQuery({ client_id: '1', [key]: e.target.value, standard_key: apikeys.standard_key ? apikeys.standard_key : '' });
            } else {
                debouncedSendQuery({ client_id: '1', statistic_key: apikeys.statistic_key ? apikeys.statistic_key : '', [key]: e.target.value });
            }
        }
    }

    useEffect(() => {
        setApiKeys((prev) => {
            return {
                ...prev,
                statistic_key: apiKey?.statistic_key,
                standard_key: apiKey?.standard_key
            }
        })


    }, [apiKey.standardKey, apiKey?.standard_key, apiKey.statisticKey, apiKey?.statistic_key])


    return (
        <><Header />
            <div className='settings'>
                <div className='settings__content'>
                    <div className='settings__left-content'>
                        <h1 className='settings__title main-font'>Введите API-ключи:</h1>
                        <div className='settings__wrapp-apikey'>
                            <textarea
                                id='apiKey1'
                                ref={textAreaRef}
                                onChange={(e) => textAriaInputHandler(e, 'standard_key')}
                                className='settings__apikey' type='text'
                                placeholder='API-ключ'
                                value={apikeys?.standard_key} >
                            </textarea>
                            <textarea
                                id='apiKey2'
                                ref={textAreaRef}
                                onChange={(e) => textAriaInputHandler(e, 'statistic_key')}
                                className='settings__apikey' type='text'
                                placeholder='API-ключ'
                                value={apikeys?.statistic_key}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className='settings__line'></div>
                    <div className=''>
                        <div className='settings__video'>
                            <iframe className='youtube-video' width="708" height="427" src="https://www.youtube.com/embed/F-ioMWkstxU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                        <p className='settings__notice notice'>* Посмотрите видеоинструкцию на YouTube <span> по получению API-ключей </span></p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Settings;


