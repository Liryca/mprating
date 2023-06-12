import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Form.scss";
import { authLoginAsyncAction } from "../../store/auth/action";
import { useNavigate, useLocation } from "react-router-dom";
import {
  checkValuePassword,
  checkValuePhone,
  checkInputValue,
} from "../../utils/utils";

const Form = () => {
  const [error, setError] = useState(false); // реализовать ошибку - невнрный логин пароль
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const phoneInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const { state } = useLocation();

  function loginUser() {
    if (phone && password) {
      dispatch(authLoginAsyncAction(phone, password));
       navigate("/main");
    } else {
      checkValuePassword(passwordInputRef, password);
      checkValuePhone(phoneInputRef, phone);
    }
   
  }

  const setValuePhone = (e) => {
    setPhone(checkInputValue(e.target.value));
  };

  return (
    <form id="form" className="form">
      <div className="form__auth">
        <h1 className="title form__title">Вход в систему</h1>
        {error && (
          <p className="form__auth-error notice">Неверный логин или пароль</p>
        )}

        <input
          ref={phoneInputRef}
          id="phone"
          value={phone}
          onChange={(e) => setValuePhone(e)}
          onBlur={() => checkValuePhone(phoneInputRef, phone)}
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
