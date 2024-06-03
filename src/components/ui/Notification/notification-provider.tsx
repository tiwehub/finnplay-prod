import clsx from 'clsx';
import DOMPurify from 'dompurify';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import styles from './notification.module.scss';

interface Notification {
  type: 'error' | 'success' | 'info';
  title: string;
  message: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
    setTimeout(() => {
      removeNotification(notification);
    }, 3000);
  };

  const removeNotification = (notificationToRemove: Notification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification !== notificationToRemove,
      ),
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
      <div className={styles[`notification__container`]}>
        <TransitionGroup>
          {notifications.map((notification, index) => {
            const nodeRef = React.createRef<HTMLDivElement>();
            return (
              <CSSTransition
                key={index}
                timeout={300}
                classNames={{
                  enter: styles[`notification__enter`],
                  enterActive: styles[`notification__enter-active`],
                  exit: styles[`notification__exit`],
                  exitActive: styles[`notification__exit-active`],
                }}
                nodeRef={nodeRef}
              >
                <div
                  ref={nodeRef}
                  className={clsx(
                    styles[`notification__item`],
                    notification.type === 'error' &&
                      styles[`notification--error`],
                    notification.type === 'success' &&
                      styles[`notification--success`],
                    notification.type === 'info' &&
                      styles[`notification--info`],
                  )}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(`
                      <strong>${notification.title}</strong>
                      <p>${notification.message}</p>
                    `),
                  }}
                ></div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotificationContext must be used within a NotificationProvider',
    );
  }
  return context;
};
