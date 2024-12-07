import { NotificationManager } from 'components/common/react-notifications';

const ToasterComponent = (type, messages, title = "", duration = 3000) => {
  messages.forEach((message) => {
    switch (type) {
      case "success":
        NotificationManager.success(
          message.message,
          title || message.status,
          duration,
          null,
          null,
          ""
        );
        break;
      case "warning":
        NotificationManager.warning(
          message.message,
          title || "Warning",
          duration,
          null,
          null,
          ""
        );
        break;
      case "error":
        NotificationManager.error(
          message.message,
          title || "Error",
          duration,
          null,
          null,
          ""
        );
        break;
      default:
        NotificationManager.info(
          message.message,
          title || "Info",
          duration,
          null,
          null,
          ""
        );
        break;
    }
  });
};

export default ToasterComponent;
