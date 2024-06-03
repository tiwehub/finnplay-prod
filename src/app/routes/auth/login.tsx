import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import AccentButton from '@/components/ui/Button/AccentButton';
import PasswordInput from '@/components/ui/Input/PasswordInput';
import TextInput from '@/components/ui/Input/TextInput';
import Logo from '@/components/ui/Logo';
import { useNotifications } from '@/components/ui/Notification/use-notifications';
import { useLoginMutation } from '@/lib/api-client';
import { setCredentials } from '@/store/auth-slice.ts';

import styles from './login.module.scss';

const schema = z
  .object({
    username: z.string().nonempty('Username is required'),
    password: z.string().nonempty('Password is required'),
  })
  .strict();

type LoginFormInputs = z.infer<typeof schema>;

const Login: React.FC = () => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsSubmitting(true);
    console.log('Login attempt with data:', data);
    try {
      const response = await login(data).unwrap();
      console.log('Login successful, response:', response);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      dispatch(
        setCredentials({ token: response.token, username: data.username }),
      );
      addNotification({
        type: 'success',
        title: 'Success',
        message: 'Login successful',
      });
      navigate('/games');
    } catch (err: any) {
      console.log('Login failed, error:', err);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setError('password', { type: 'manual', message: 'Invalid credentials' });
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message: 'Invalid credentials',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <div className={styles.login__logo}>
          <Logo />
        </div>
        <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.login__inputContainer}>
            <TextInput
              id="username"
              {...register('username')}
              label="Login"
              error={errors.username?.message}
            />
          </div>
          <div className={styles.login__inputContainer}>
            <PasswordInput
              id="password"
              {...register('password')}
              label="Password"
              error={errors.password?.message}
            />
          </div>
          <div>
            <AccentButton
              className={styles.login__button}
              type="submit"
              isLoading={isSubmitting}
            >
              Login
            </AccentButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
