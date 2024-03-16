import { useState, useEffect } from 'react';

const DesktopNotifications = ({ title }) => {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    const showNotification = () => {
      // eslint-disable-next-line
      new Notification(`Someone is interested in your post: ${title}`, {
        body: 'Check Notification.',
        icon: 'https://gogo-react.coloredstrategies.com/assets/img/profiles/l-1.jpg', 
      });
    };

    const requestNotificationPermission = () => {
      Notification.requestPermission().then((result) => {
        setPermission(result);
        if (result === 'granted') {
          showNotification();
        }
      });
    };

    if (permission === 'granted') {
      showNotification();
    } else if (permission === 'default') {
      requestNotificationPermission();
    }
  }, [permission, title]);

  return null; 
};

export default DesktopNotifications;
