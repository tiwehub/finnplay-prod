import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import userIcon from '@/assets/img/icons/user.svg';
import IconButton from '@/components/ui/Button/IconButton';
import Logo from '@/components/ui/Logo';
import { useNotifications } from '@/components/ui/Notification/use-notifications';
import { useLogoutMutation } from '@/lib/api-client';
import { logout as logoutAction } from '@/store/auth-slice.ts';
import { RootState } from '@/store/store';

import styles from './header.module.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [logout] = useLogoutMutation();
  const username = useSelector((state: RootState) => state.auth.username);
  const formattedUsername = username
    ? username.charAt(0).toUpperCase() + username.slice(1)
    : '';

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      addNotification({
        type: 'success',
        title: 'Logged Out',
        message: 'You have been logged out successfully',
      });
      navigate('/');
    } catch (error: any) {
      console.error('Logout failed:', error);
      addNotification({
        type: 'error',
        title: 'Logout Failed',
        message: 'Failed to logout. Please try again.',
      });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__content}>
          <Logo />
          <div className={styles[`header__user-section`]}>
            <span className={styles.header__username}>{formattedUsername}</span>
            <IconButton
              icon={userIcon}
              className={styles.header__button}
              onClick={handleLogout}
            >
              Logout
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
