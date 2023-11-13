import React, { useRef, useEffect, useState, } from "react";
import "./Settings.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { sendApiKeysAction } from "../../store/apiKey/action";
import Button from "../../components/Button/Button";
import { Alert, AlertTitle } from "@mui/material";
import { Collapse } from '@mui/material';

const Settings = () => {
    const textAreaRefStatisticsKey = useRef();
    const textAreaRefStandartKey = useRef();
    const apiKeyState = useSelector((state) => state.apiKey);
    const dispatch = useDispatch();
    const [apikeys, setApiKeys] = useState({});
    const [open, setOpen] = useState(false);

    console.log(apiKeyState.errorKeys)


    useEffect(() => {

        setApiKeys((prev) => {
            return {
                ...prev,
                'standardKey': apiKeyState?.standardKey,
                'statisticsKey': apiKeyState?.statisticsKey

            };
        });

        if (apiKeyState.standardKey || apiKeyState.statisticsKey) {

            textAreaRefStandartKey.current.style.height = '89px';
            textAreaRefStatisticsKey.current.style.height = '89px';
            // e.target.style.height = e.target.scrollHeight + 'px';
        }

    }, [apiKeyState]);


    const saveApiKeys = () => {
        dispatch(sendApiKeysAction(apikeys));
        if (!apiKeyState.loadingKey)
            setOpen(true);
        setTimeout(() => setOpen(false), 1500)
    };

    const textAriaInputHandler = (e, key) => {
        setApiKeys((prev) => {
            return {
                ...prev,
                [key]: e.target.value,
            };
        });

        // e.target.style.height = '48px';
        // e.target.style.height = e.target.scrollHeight + 'px';

    };

    return (
        <>
            <Header />
            <div className="settings">
                <div className="settings__content">
                    <div className="settings__left-content">
                        <Collapse in={open}>
                            <Alert severity={apiKeyState.errorKeys !== '' ? 'info' : 'error'} sx={{ mb: 2 }} >

                                <AlertTitle>{apiKeyState.errorKeys !== '' ?
                                    'Api keys успешно сохранен!'
                                    : 'При сохранении ApiKeys произошла непредвиденная ошибка'}</AlertTitle>
                            </Alert>
                        </Collapse>
                        <h2 className="settings__title main-font">Введите API-ключи:</h2>
                        <div className="settings__wrapp-apikey">
                            <p className="small-font" >Api-ключ standart</p>
                            <textarea
                                id="apiKey1"
                                ref={textAreaRefStandartKey}
                                onChange={(e) => textAriaInputHandler(e, "standardKey")}
                                className="settings__apikey"
                                type="text"
                                placeholder="API-ключ"
                                value={apikeys?.standardKey}
                            ></textarea>
                            <p className="small-font">Api-ключ statistic</p>
                            <textarea
                                id="apiKey2"
                                ref={textAreaRefStatisticsKey}
                                onChange={(e) => textAriaInputHandler(e, "statisticsKey")}
                                className="settings__apikey"
                                type="text"
                                placeholder="API-ключ"
                                value={apikeys?.statisticsKey}
                            ></textarea>
                        </div>
                        <Button
                            fn={saveApiKeys}
                            text="Сохранить"
                            classN="but-start settings__btn-keys"
                        ></Button>
                    </div>
                    <div className="settings__line"></div>
                    <div className="">
                        <div className="settings__video">
                            <iframe
                                className="youtube-video"
                                width="708"
                                height="427"
                                src="https://www.youtube.com/embed/F-ioMWkstxU"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <p className="settings__notice notice">
                            * Посмотрите видеоинструкцию на YouTube{" "}
                            <span> по получению API-ключей </span>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Settings;
