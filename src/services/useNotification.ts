import { ref } from "vue"

export interface Notification {
  id: number;
  message: string;
  type: 'error' | 'success' | 'warning' | 'info';
  isVisible: boolean;
}

const notifications = ref<Notification[]>([]);
let nextId = 0;

const useNotification = () => {
  const showNotification = (notification: Notification) => {

      notification.isVisible = true;


    setTimeout(() => {
      notification.isVisible = false;
      setTimeout(() => {
        const index = notifications.value.findIndex(n => n.id === notification.id);
        if (index > -1) {
          notifications.value.splice(index, 1);
        }
      }, 500);
    }, 3000);
  };

  const message = (message: string, type: 'error' | 'success' | 'warning' | 'info') => {
    const notification: Notification = {
      id: nextId++,
      message,
      type,
      isVisible: false
    };

    notifications.value.push(notification);
    showNotification(notification);
  };

  return {
    message,
    notifications
  };
};

export default useNotification;
