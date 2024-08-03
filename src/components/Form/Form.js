import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './Form.module.css';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Должен содержать символ @ и домен test.ru')
    .min(3, 'Минимум 3 символа')
    .max(30, 'Максимум 30 символов')
    .required('Обязательное поле'),
  password: yup
    .string()
    .matches(/^[A-Za-z0-9@._/]+$/, 'Допустимые символы: Aa-Zz 0-9 @ . _ /')
    .min(3, 'Минимум 3 символа')
    .max(30, 'Максимум 30 символов')
    .required('Обязательное поле'),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
    .required('Обязательное поле')
});

export const Form = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordRepeat: ''
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const refBtn = useRef(null);

  const email = watch('email');
  const password = watch('password');
  const passwordRepeat = watch('passwordRepeat');

  const isValid = !errors.email && !errors.password && !errors.passwordRepeat && email &&
    password && passwordRepeat


  useEffect(() => {
    if (isValid) {
      refBtn.current.focus();
    }
  }, [isValid])

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>React hook form and Yup</h2>

      <input
        type="email"
        placeholder="Введите email"
        className={styles.email}
        {...register('email')}
      />
      {errors.email && <span className={styles.errorSpan}>{errors.email.message}</span>}

      <input
        type="password"
        placeholder="Новый пароль"
        className={styles.pass}
        {...register('password')}
      />
      {errors.password && <span className={styles.errorSpan}>{errors.password.message}</span>}

      <input
        type="password"
        placeholder="Повторите пароль"
        className={styles.pass}
        {...register('passwordRepeat')}
      />
      {errors.passwordRepeat && <span className={styles.errorSpan}>{errors.passwordRepeat.message}</span>}

      <button type="submit" disabled={!isValid} ref={refBtn}>Зарегистрироваться</button>
    </form>
  );
};
