import izitoast from 'izitoast';

const COLOR_CONFIG = {
  message: 'blue',
  warning: 'yellow',
  error: 'red',
  success: 'green'
};

const position = 'topRight';

class Notification {
  message (message, title, pos) {
    izitoast.show({
      title: title || 'Message',
      message: message || '',
      position: pos || position,
      color: COLOR_CONFIG.message
    });
  }

  success (message, title, pos) {
    izitoast.success({
      title: title || 'Success',
      message: message || '',
      position: pos || position,
      color: COLOR_CONFIG.success
    });
  }

  warning (message, title, pos) {
    izitoast.warning({
      title: title || 'Warning',
      message: message || '',
      position: pos || position,
      color: COLOR_CONFIG.warning
    });
  }

  error (message, title, pos) {
    izitoast.error({
      title: title || 'Error',
      message: message || '',
      position: pos || position,
      color: COLOR_CONFIG.error
    });
  }
}

const notification = new Notification();

export default notification;
