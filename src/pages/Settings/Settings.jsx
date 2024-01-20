import React, { useRef, useEffect, useState, } from "react";
import "./Settings.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { sendApiKeyAction } from "../../store/apiKey/action";
import ButtonCustom from "../../components/Button/Button";
import { Alert, AlertTitle, Input } from "@mui/material";
import { Collapse } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { Button } from '@mui/base/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const InputElement = styled('input')(
    ({ theme }) => `
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
  
    &:hover {
   
    }
  
    &:focus {

    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
)


const InputAdornment = styled('div')`
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const IconButton = styled(Button)(
    ({ theme }) => `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: inherit;
    cursor: pointer;
    `,
);


const Settings = () => {
    const apiKeyState = useSelector((state) => state.apiKey);
    const dispatch = useDispatch();
    const [apikey, setApiKey] = useState({});
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    useEffect(() => {

        setApiKey((prev) => {
            return {
                ...prev,
                'token': apiKeyState?.token,
            };
        });

    }, [apiKeyState.token]);



    const saveApiKey = () => {
        dispatch(sendApiKeyAction(apikey));
        setOpen(true);
        setTimeout(() => setOpen(false), 1500)
    };

    const textAriaInputHandler = (e, key) => {
        setApiKey((prev) => {
            return {
                ...prev,
                [key]: e.target.value,
            };

        });
    };

    return (
        <>
            <Header />
            <div className="settings">
                <div className="settings__content">
                    <div className="settings__left-content">
                        {(!apiKeyState.errorApiKey&&!apiKeyState.loadingKey) &&
                            <Collapse in={open}>
                                <Alert severity={'info'} sx={{ mb: 2 }} >
                                    <AlertTitle> Api keys успешно сохранен!</AlertTitle>
                                </Alert>
                            </Collapse>
                        }
                        <h2 className="settings__title main-font">Введите API-ключ:</h2>
                        <div className="settings__wrapp-apikey">
                            <Input
                                className={!apiKeyState.errorApiKey?"settings__apikey":'settings__apikey settings__apikeyError'}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='API-ключ'
                                value={apikey?.token || ''}
                                onChange={(e) => textAriaInputHandler(e, "token")}
                                endAdornment={
                                    <InputAdornment>
                                        <IconButton
                                            size="small"
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword} >
                                            {showPassword ? (
                                                <VisibilityOff fontSize="small" />
                                            ) : (
                                                <Visibility fontSize="small" />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </div>
                        {apiKeyState?.errorApiKey && <p className="small-font small-fontError">{apiKeyState?.errorApiKey}</p>}

                        <ButtonCustom
                            fn={saveApiKey}
                            text="Сохранить"
                            classN="but-start settings__btn-keys"
                        ></ButtonCustom>
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
