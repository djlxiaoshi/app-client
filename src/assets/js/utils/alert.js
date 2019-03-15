import swal from 'sweetalert';

class Sweetalert {

  info (desc) {
    swal('Info', desc, 'info');
  }
  success (desc) {
    swal({
      title: 'Success',
      text: desc,
      icon: 'success',
      timer: 1000,
      button: false
    });
  }

  warning (desc, options) {
    const defaultConfig = {
      title: 'Warning',
      text: desc,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    };
    return swal(Object.assign(defaultConfig, options));
  }

  error (desc) {
    swal('Error', desc, 'error');
  }

  input ({ title = '请输入', text = '请输入', defaultValue = '' }) {
    return swal({
      title: title,
      content: {
        element: 'input',
        attributes: {
          placeholder: text,
          type: 'text',
          defaultValue: defaultValue
        }
      },
      buttons: {
        cancel: true,
        confirm: 'Confirm'
      }
    });
  }
}

export default new Sweetalert();
