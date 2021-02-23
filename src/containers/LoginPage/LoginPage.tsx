import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import validator from 'validator';

import {Form} from './form';
import {Input} from './input';
import {authenticate} from '../../store/actions/auth';

const LoginPage: React.FC = (props: any) => {
  const { history } = props
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.auth.loading);
  const isLoggedIn = useSelector((state: any) => !!state.auth.sessionKey?.length);
  console.log('loading', loading);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/console');
    }
  }, [isLoggedIn]);

  const onSubmit = (values: any) => {
    dispatch(authenticate(values))
  };

  return (
    <div className="wrapper">
      <img className="logo" src="/icons/logo.svg" alt="logo" />
      <Form onSubmit={onSubmit}>
        {(props: any) => (
          <>
            <div className="login-form__element-block">
              <div className="login-form__label-block">
                <label className="login-form__label">Логин</label>
              </div>
              <Input
                type="text"
                className="login-form__input"
                name="login"
                placeholder="iamyourlogin@domain.xyz"
                validate={(v: string) => !validator.isEmail(v || '') && 'Please Enter a Valid Email!'}
              />
            </div>
            <div className="login-form__element-block">
              <div className="login-form__label-block">
                <label className="login-form__label">Сублогин</label>
                <label className="login-form__label__optional">Опционально</label>
              </div>
              <Input type="text" className="login-form__input" name="subLogin" placeholder="sublogin-could-be-here" />
            </div>
            <div className="login-form__element-block">
              <div className="login-form__label-block">
                <label className="login-form__label">Пароль</label>
              </div>
              <Input type="password" className="login-form__input" name="password" placeholder="********" />
            </div>
            <div>
              <button type="submit" className="buttons">
                Войти
              </button>
            </div>
          </>
        )}
      </Form>
      <p className="login-form__link">@link-to-your-github</p>
    </div>
  );
};

export default withRouter(LoginPage)