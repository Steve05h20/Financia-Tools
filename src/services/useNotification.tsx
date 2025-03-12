import { reactive, ref } from "vue"

export interface Notification {
  message: string;
  type: 'error' | 'success' | 'warning' | 'info';
  isVisible?: boolean;
}

const useNotification = () => {
  const notifications = reactive<Notification[]>([]);
  const isVisible = ref<boolean>(false);

  const processNotifications = async () => {
    for (const notification of notifications) {
      notification.isVisible = true;
      isVisible.value = true;
      await new Promise(resolve => setTimeout(resolve, 3000));
      notification.isVisible = false;
      isVisible.value = false;
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    notifications.splice(0, notifications.length);
  };

  const message = (message: string, type: 'error' | 'success' | 'warning' | 'info') => {
    notifications.push({ message, type, isVisible: false });
    processNotifications();
  };

  return { message, notifications, isVisible };
}

export default useNotification;







