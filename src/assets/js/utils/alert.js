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

  warning (desc) {
    return swal({
      title: 'Warning',
      text: desc,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    });
  }

  error (desc) {
    swal('Error', desc, 'error');
  }

}

export default new Sweetalert();
