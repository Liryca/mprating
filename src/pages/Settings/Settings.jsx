import React, { useRef } from 'react';
import './Settings.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


const Settings = () => {

    const textAreaRef = useRef();

    const textAriaInputHandler = (e) => {
        e.target.style.height = '48px';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    return (
        <><Header /><div className='settings'>
            <div className='settings__content'>
                <div className='settings__left-content'>
                    <h1 className='settings__title main-font'>Введите API-ключи:</h1>
                    <div className='settings__wrapp-apikey'>
                        <textarea
                            id='apiKey1'
                            ref={textAreaRef}
                            onChange={textAriaInputHandler}
                            className='settings__apikey' type='text'
                            placeholder='API-ключ'></textarea>
                        <textarea
                            id='apiKey2'
                            ref={textAreaRef}
                            onInput={textAriaInputHandler}
                            className='settings__apikey' type='text'
                            placeholder='API-ключ'></textarea>
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