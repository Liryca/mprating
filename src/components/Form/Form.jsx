import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import "./Form.scss";
import { authLoginAsyncAction } from "../../store/auth/action";
import {
  checkValuePassword,
  checkValueLogin,
  checkInputValue,
} from "../../utils/utils";

const Form = () => {

  const state = useSelector(state=>state);
  const [error, setError] = useState(false); // реализовать ошибку - невнрный логин пароль
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const loginInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const dispatch = useDispatch();

  function loginUser() {
    if (login && password) {
      dispatch(authLoginAsyncAction(login, password));
    } else {
      checkValuePassword(passwordInputRef, password);
      checkValueLogin(loginInputRef, login);
    }
  }

  return (
    <form id="form" className="form">
      <div className="form__auth">
        <h1 className="title form__title">Вход в систему</h1>
        {state.auth.error!=='' && (
          <p className="form__auth-error notice">Неверный логин или пароль</p>
        )}

        <input
          ref={loginInputRef}
          autoComplete='off'
          id="phone"
          value={login}
          onChange={(e) => setLogin(checkInputValue(e.target.value))}
          onBlur={() => checkValueLogin( loginInputRef, login)}
          className={error ? "form__login-error" : "form__login "}
          placeholder="Логин (телефон)"
        ></input>

        <input
          ref={passwordInputRef}
          id="password"
          onBlur={() => checkValuePassword(passwordInputRef, password)}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className={error ? "form__password-error" : "form__password"}
          placeholder="Пароль"
        ></input>

        <button
          onClick={loginUser}
          className="form__auth-button main-font"
          type="button"
        >
          Войти
        </button>
        <p className="notice form__auth-notice">Забыли пароль</p>
      </div>

      <div className="form__reg">
        <button className="form__reg-button main-font" type="button">
          <a href="https://t.me/MPrating_bot">Зарегестрироваться</a>
        </button>
        <p className="notice form__reg-notice">
          *После регистрации вы получите доступ ко всем возможностям системы
        </p>
      </div>

    </form>
  );
};

export default Form;
