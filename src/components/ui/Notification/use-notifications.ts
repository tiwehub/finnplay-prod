import { useNotificationContext } from './notification-provider';

export const useNotifications = () => {
  const { addNotification } = useNotificationContext();
  return { addNotification };
};
