import { useEffect, useRef } from 'react'
import { useStore } from '../../store/store'
import { isValidEmail, isValidPass } from '../helper'
import styles from './MyForm.module.css'

export const MyForm = () => {
  const refBtn = useRef(null)
  const { getStore, setStore, resetStore } = useStore()
  const {
    email,
    password,
    passwordRepeat,
    emailErrors,
    passwordErrors,
    passwordRepeatErrors,
    emtyForm
  } = getStore()

  const isValid = email && password && passwordRepeat && password === passwordRepeat &&
    !emailErrors.parseEmail && !emailErrors.minSym && !emailErrors.maxSym &&
    !passwordErrors.parsePass && !passwordErrors.minSym &&
    !passwordErrors.maxSym && !passwordRepeatErrors.passwordsErr

  useEffect(() => {
    if (isValid) {
      refBtn.current.focus();
    }
  }, [isValid])

  const sendFormData = (dataForm) => {
    console.log(dataForm);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      sendFormData({ email, password, passwordRepeat });
      resetStore();
      return;
    }
    setStore('emtyForm', true);
  }

  const onBlurEmailInput = (valueInput) => {
    let errors = {};

    if (!isValidEmail(valueInput)) {
      errors.parseEmail = 'Должен содержать символ @ и домен test.ru';
    }
    if (valueInput.length <= 3) {
      errors.minSym = 'Минимум 4 символа'
    }
    if (valueInput.length >= 30) {
      errors.maxSym = 'Максимум 30 символов'
    }
    setStore('emailErrors', errors)
  }

  const onBlurPasswordInput = (valueInput) => {
    let errors = {};

    if (!isValidPass(valueInput)) {
      errors.parsePass = 'Допустимые символы: Aa-Zz 0-9 @ . _ /'
    }
    if (valueInput.length <= 3) {
      errors.minSym = 'Минимум 4 символа'
    }
    if (valueInput.length >= 30) {
      errors.maxSym = 'Максимум 30 символов'
    }

    setStore('passwordErrors', errors);

    password !== passwordRepeat
      ? setStore('passwordRepeatErrors', { passwordsErr: 'Пароли не совпадают' })
      : setStore('passwordRepeatErrors', {})
  }

  const onBlurPasswordRepeatInput = () => {
    passwordRepeat !== password
      ? setStore('passwordRepeatErrors', { passwordsErr: 'Пароли не совпадают' })
      : setStore('passwordRepeatErrors', {})
  }

  return (
    <form action="" className={styles.myForm} onSubmit={onSubmit}>
      <h2>Обычная форма</h2>

      <input
        type="email"
        placeholder={'Введите email'}
        className={styles.email}
        value={email}
        name={'email'}
        onChange={({ target }) => setStore(target.name, target.value)}
        onBlur={({ target }) => onBlurEmailInput(target.value)}
      />
      {email && emailErrors.parseEmail &&
        <span className={styles.errorSpan}>{emailErrors.parseEmail}</span>}

      {email && emailErrors.minSym &&
        <span className={styles.errorSpan}>{emailErrors.minSym}</span>}

      {email && emailErrors.maxSym &&
        <span className={styles.errorSpan}>{emailErrors.maxSym}</span>}


      <input
        type="password"
        placeholder={'Новый пароль'}
        className={styles.pass}
        value={password}
        name={'password'}
        onChange={({ target }) => setStore(target.name, target.value)}
        onBlur={({ target }) => onBlurPasswordInput(target.value)}
      />
      {password && passwordErrors.parsePass &&
        <span className={styles.errorSpan}>{passwordErrors.parsePass}</span>}

      {password && passwordErrors.minSym &&
        <span className={styles.errorSpan}>{passwordErrors.minSym}</span>}

      {password && passwordErrors.maxSym &&
        <span className={styles.errorSpan}>{passwordErrors.maxSym}</span>}

      <input
        type="password"
        placeholder={'Повторите пароль'}
        className={styles.pass}
        value={passwordRepeat}
        name={'passwordRepeat'}
        onChange={({ target }) => setStore(target.name, target.value)}
        onBlur={onBlurPasswordRepeatInput}
      />
      {passwordRepeat && passwordRepeatErrors.passwordsErr &&
        <span className={styles.errorSpan}>{'Не совпадают пароли'}</span>}

      <button type="submit" ref={refBtn} disabled={!isValid} >Зарегистрироваться</button>
      {emtyForm && <div className={styles.errorForm}>Форма пустая </div>}
    </form>
  )
}
